# flake8: noqa F401
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import create_pagination
from app import models as m, db
from app import forms as f
from app.logger import log


dealer_blueprint = Blueprint("labels", __name__, url_prefix="/labels")


@dealer_blueprint.route("/active", methods=["GET"])
@login_required
def get_active_labels():
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    return render_template(
        "label/labels_active.html",
        labels=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@dealer_blueprint.route("/archived", methods=["GET"])
@login_required
def get_archived_labels():
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active == False)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active == False)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    labels = db.session.execute(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).scalars()
    return render_template(
        "label/labels_archived.html",
        labels=labels,
        page=pagination,
    )


@dealer_blueprint.route("/deactivate", methods=["GET", "POST"])
@login_required
def deactivate_label():
    form: f.DeactivateLabelForm = f.DeactivateLabelForm()
    if form.validate_on_submit():
        label: m.Label = db.session.scalar(
            sa.select(m.Label).where(m.Label.unique_id == form.unique_id.data)
        )
        if not label:
            log(log.ERROR, "Failed to find label : [%s]", form.unique_id.data)
            flash("Failed to find label", "danger")
            return redirect(
                url_for(
                    "labels.get_active_labels",
                    user_unique_id=current_user.unique_id,
                )
            )
        label.active = False
        label.date_deactivated = datetime.utcnow()
        label.save()
        log(log.INFO, "Deactivated label : [%s]", form.unique_id.data)
    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"Failed to validate form: {form.errors}", "danger")
    return redirect(url_for("labels.get_archived_labels"))


@dealer_blueprint.route("/edit", methods=["GET", "POST"])
@login_required
def label_details():
    form: f.LabelForm = f.LabelForm()
    if form.validate_on_submit():
        label = db.session.scalar(
            sa.select(m.Label).where(m.Label.unique_id == form.unique_id.data)
        )
        if not label:
            log(log.ERROR, "Failed to find label : [%s]", form.unique_id.data)
            flash("Failed to find label", "danger")
            return redirect(
                url_for(
                    "labels.get_active_labels",
                    user_unique_id=current_user.unique_id,
                )
            )
        label.name = form.name.data
        label.make = form.make.data
        label.vehicle_model = form.vehicle_model.data
        label.year = form.year.data
        label.mileage = form.mileage.data
        label.color = form.color.data
        label.trim = form.trim.data
        label.type_of_vehicle = form.type_of_vehicle.data
        label.price = form.price.data
        label.url = form.url.data
        label.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@dealer_blueprint.route("/reporting", methods=["GET", "POST"])
@login_required
def reporting():
    return render_template("label/reporting.html")


@dealer_blueprint.route("/amount/<user_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_set_amount(user_unique_id: str):
    form: f.LabelsAmountForm = f.LabelsAmountForm()
    if form.validate_on_submit():
        labels_amount = int(form.amount.data)
        log(
            log.INFO,
            "Creating [%s] labels for user [%s]",
            labels_amount,
            user_unique_id,
        )
        return redirect(
            url_for(
                "labels.new_label_set_details",
                user_unique_id=user_unique_id,
                amount=labels_amount,
            )
        )
    return render_template(
        "label/new_label.html",
        user_unique_id=user_unique_id,
        form=form,
    )


@dealer_blueprint.route("/details/<user_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_set_details(user_unique_id: str):
    """
    Label fields:
    id
    label_unique_id
    name
    make
    vehicle_model
    year
    mileage
    color
    trim
    type_of_vehicle
    price
    date_received
    url
    views

    """
    amount = request.args.get("amount")
    if request.method == "POST":
        ...

    return render_template(
        "label/new_labels_details.html",
        user_unique_id=user_unique_id,
        amount=amount,
    )


@dealer_blueprint.route("/payment/<label_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_payment(label_unique_id: str):
    ...


@dealer_blueprint.route("/l/<label_unique_id>")
def redirect_to_outer_url(label_unique_id: str):
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.unique_id == label_unique_id)
    )
    label.views += 1
    label.save()
    return redirect(label.url)

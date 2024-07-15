from typing import TYPE_CHECKING

from datetime import datetime
import enum
from flask_login import UserMixin, AnonymousUserMixin
import sqlalchemy as sa
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import orm
from werkzeug.security import generate_password_hash, check_password_hash

from app.database import db
from .utils import ModelMixin, generate_uuid
from app.logger import log
from .label_location import LabelLocation


if TYPE_CHECKING:
    from .dealer_gift_item import DealerGiftItem


class UsersPlan(enum.Enum):
    basic = "Basic Plan"
    advanced = "Advanced Plan"


class UsersRole(enum.Enum):
    admin = "admin"
    dealer = "dealer"
    seller = "seller"
    buyer = "buyer"


class User(db.Model, UserMixin, ModelMixin):
    __tablename__ = "users"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    _seller_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )

    role: orm.Mapped[UsersPlan] = orm.mapped_column(
        sa.Enum(UsersRole), default=UsersRole.dealer
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        unique=True,
        nullable=False,
    )
    password_hash: orm.Mapped[str] = orm.mapped_column(sa.String(255), default="")
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    deleted: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean, default=False, nullable=True
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    reset_password_uid: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        default=generate_uuid,
    )

    first_name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    last_name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    name_of_dealership: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    address_of_dealership: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default=""
    )
    country: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    province: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    city: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    postal_code: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    phone: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    plan: orm.Mapped[UsersPlan] = orm.mapped_column(
        sa.Enum(UsersPlan), default=UsersPlan.basic
    )
    stripe_customer_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(128), unique=True, nullable=True
    )
    extra_emails: orm.Mapped[str] = orm.mapped_column(
        sa.String(255), nullable=True, default=""
    )

    label_locations: orm.Mapped[list["LabelLocation"]] = orm.relationship(
        back_populates="user"
    )

    sellers: orm.Mapped[list["User"]] = orm.relationship(order_by=created_at.desc())

    gift_items: orm.Mapped[list["DealerGiftItem"]] = orm.relationship(
        back_populates="dealer", order_by="DealerGiftItem.created_at.desc()"
    )

    @hybrid_property
    def seller_id(self):
        return self._seller_id

    @seller_id.setter
    def seller_id(self, value):
        user = db.session.scalar(sa.select(User).where(User.id == value))
        if not user or user.role != UsersRole.dealer:
            raise ValueError("Only dealer can be assigned as seller")
        self._seller_id = value

    @property
    def full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}"

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    @classmethod
    def authenticate(cls, user_id, password):
        query = cls.select().where(sa.func.lower(cls.email) == sa.func.lower(user_id))
        user = db.session.scalar(query)
        if not user:
            log(log.WARNING, "user:[%s] not found", user_id)

        if user is not None and check_password_hash(user.password, password):
            return user
        log(log.WARNING, "user:[%s] password is incorrect", user_id)

    def reset_password(self):
        self.password_hash = ""
        self.reset_password_uid = generate_uuid()
        self.save()

    def __repr__(self):
        return f"<{self.id}:{self.email}>"


class AnonymousUser(AnonymousUserMixin):
    pass

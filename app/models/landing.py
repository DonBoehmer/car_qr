from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_wtf.recaptcha import RecaptchaField


class LandingForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    message = StringField("Message", validators=[DataRequired()])
    submit = SubmitField("Submit")
    recaptcha = RecaptchaField()

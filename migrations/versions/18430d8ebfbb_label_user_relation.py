"""label_user_relation

Revision ID: 18430d8ebfbb
Revises: fe83949db228
Create Date: 2023-07-20 13:41:42.997663

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18430d8ebfbb'
down_revision = 'fe83949db228'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('labels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('unique_id', sa.String(length=36), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('make', sa.String(length=64), nullable=False),
    sa.Column('vehicle_model', sa.String(length=64), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('mileage', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=64), nullable=False),
    sa.Column('trim', sa.String(length=64), nullable=False),
    sa.Column('type_of_vehicle', sa.String(length=64), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('date_received', sa.DateTime(), nullable=False),
    sa.Column('url', sa.String(length=64), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_labels_user_id_users'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_labels'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('labels')
    # ### end Alembic commands ###

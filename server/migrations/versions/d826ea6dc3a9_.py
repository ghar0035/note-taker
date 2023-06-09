"""empty message

Revision ID: d826ea6dc3a9
Revises: 
Create Date: 2023-02-12 17:57:36.274719

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd826ea6dc3a9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('dueDate', sa.String(length=200), nullable=True))
        batch_op.drop_index('text')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.create_index('text', ['text'], unique=False)
        batch_op.drop_column('dueDate')

    # ### end Alembic commands ###

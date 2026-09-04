"""Create the Phase 2B persistence schema."""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0bc76a73d6ce"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    user_id = postgresql.UUID(as_uuid=True)
    op.create_table(
        "user",
        sa.Column("id", user_id, primary_key=True),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password_hash", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_user_email", "user", ["email"], unique=True)

    op.create_table(
        "trip",
        sa.Column("id", user_id, primary_key=True),
        sa.Column("user_id", user_id, sa.ForeignKey("user.id", ondelete="CASCADE"), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("destination", sa.String(), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("end_date", sa.Date(), nullable=False),
        sa.Column("travelers", sa.Integer(), nullable=False),
        sa.Column("budget", sa.Float(), nullable=True),
        sa.Column("preferences", postgresql.JSONB(), nullable=False),
        sa.Column("currency", sa.String(), nullable=False),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_trip_user_created_at", "trip", ["user_id", "created_at"])

    op.create_table(
        "itinerary_day",
        sa.Column("id", user_id, primary_key=True),
        sa.Column("trip_id", user_id, sa.ForeignKey("trip.id", ondelete="CASCADE"), nullable=False),
        sa.Column("day_number", sa.Integer(), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("estimated_cost", sa.Float(), nullable=True),
        sa.UniqueConstraint("trip_id", "day_number", name="uq_itinerary_day_trip_number"),
    )
    op.create_index("ix_itinerary_day_trip_id", "itinerary_day", ["trip_id"])

    op.create_table(
        "saved_place",
        sa.Column("id", user_id, primary_key=True),
        sa.Column("user_id", user_id, sa.ForeignKey("user.id", ondelete="CASCADE"), nullable=False),
        sa.Column("place_id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("location", sa.String(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("rating", sa.Float(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "place_id", name="uq_saved_place_user_place"),
    )
    op.create_index("ix_saved_place_place_id", "saved_place", ["place_id"])
    op.create_index("ix_saved_place_user_created_at", "saved_place", ["user_id", "created_at"])


def downgrade() -> None:
    op.drop_table("saved_place")
    op.drop_table("itinerary_day")
    op.drop_table("trip")
    op.drop_index("ix_user_email", table_name="user")
    op.drop_table("user")

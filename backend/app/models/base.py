import re
from typing import Any
from sqlalchemy.orm import declarative_base, declared_attr

class CustomBase:
    # Automatically generate table name from class name (e.g. ItineraryDay -> itinerary_day)
    @declared_attr
    def __tablename__(cls) -> str:
        return re.sub(r'(?<!^)(?=[A-Z])', '_', cls.__name__).lower()

Base = declarative_base(cls=CustomBase)

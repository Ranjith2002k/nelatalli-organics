from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ──────────────────────────── Category ────────────────────────────

class CategoryOut(BaseModel):
    id: int
    slug: str
    name: str
    count_label: str
    image: str
    highlight: bool
    icon: str
    product_count: int

    class Config:
        from_attributes = True


# ──────────────────────────── Product ─────────────────────────────

class ProductOut(BaseModel):
    id: int
    slug: str
    title: str
    price: float
    category: str = ""
    image: str
    rating: float
    reviews: int
    description: str
    is_top_rated: bool
    is_featured: bool
    is_top_selling: bool
    is_recently_added: bool
    asymmetry: bool
    in_stock: bool

    class Config:
        from_attributes = True


class ProductBrief(BaseModel):
    """Compact product for lists like top-selling, featured, etc."""
    id: str  # slug
    title: str
    price: float
    rating: float
    image: str
    category: str = ""

    class Config:
        from_attributes = True


# ──────────────────────────── Blog ────────────────────────────────

class BlogPostOut(BaseModel):
    id: int
    title: str
    category: str
    date: str
    image: str
    excerpt: str
    content: str
    is_featured: bool

    class Config:
        from_attributes = True


# ──────────────────────────── Contact ─────────────────────────────

class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Auth / User ─────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""
    address: str = ""


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    address: str
    avatar: str
    member_since: str

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    avatar: Optional[str] = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ──────────────────────────── Order ───────────────────────────────

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_title: str = ""
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    order_number: str
    total: float
    status: str
    created_at: datetime
    items: list[OrderItemOut] = []

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    """Create order from current cart items."""
    pass


# ──────────────────────────── Wishlist ────────────────────────────

class WishlistAdd(BaseModel):
    product_id: int


class WishlistItemOut(BaseModel):
    id: int
    product: ProductBrief
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Cart ────────────────────────────────

class CartAdd(BaseModel):
    product_id: int
    quantity: int = 1


class CartUpdate(BaseModel):
    quantity: int


class CartItemOut(BaseModel):
    id: int
    product: ProductBrief
    quantity: int

    class Config:
        from_attributes = True

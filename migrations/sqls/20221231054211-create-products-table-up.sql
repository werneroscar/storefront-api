CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(50) NOT NULL,
    price REAL NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id)
);
CREATE UNIQUE INDEX unique_product_name_and_category_id ON products (product_name, category_id);

ALTER TABLE products ADD CONSTRAINT price_greater_than_zero
    CHECK(price > 0);
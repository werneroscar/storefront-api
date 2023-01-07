DROP INDEX IF EXISTS unique_product_name_and_category_id; 

ALTER TABLE products DROP CONSTRAINT IF EXISTS price_greater_than_zero;
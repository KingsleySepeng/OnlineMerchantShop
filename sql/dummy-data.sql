USE
shopdb;

-- Insert users
INSERT INTO users (username, first_name, last_name, email, phone, password, role)
VALUES ('john_doe', 'John', 'Doe', 'john@example.com', '1234567890', 'hashedpassword1', 'customer'),
       ('jane_doe', 'Jane', 'Doe', 'jane@example.com', '0987654321', 'hashedpassword2', 'customer'),
       ('admin_user', 'Admin', 'User', 'admin@example.com', '1122334455', 'hashedpassword3', 'admin');

-- Insert products
INSERT INTO products (name, description, image_url, stock, original_price, discount_price, is_special, is_best_seller)
VALUES ('Product 1', 'Description for Product 1', 'https://example.com/product1.jpg', 100, 19.99, 15.99, false, true),
       ('Product 2', 'Description for Product 2', 'https://example.com/product2.jpg', 50, 29.99, 25.99, true, false),
       ('Product 3', 'Description for Product 3', 'https://example.com/product3.jpg', 150, 9.99, 7.99, false, true);

-- Insert orders
INSERT INTO orders (user_id, total_amount, status)
VALUES (1, 49.98, 'pending'), -- Assuming user_id 1 is John Doe
       (2, 29.99, 'shipped');
-- Assuming user_id 2 is Jane Doe

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (1, 1, 2, 19.99), -- 2 units of Product 1 for order 1
       (2, 3, 1, 9.99);
-- 1 unit of Product 3 for order 2

-- Insert carts
INSERT INTO carts (user_id)
VALUES (1), -- Cart for John Doe
       (2);
-- Cart for Jane Doe

-- Insert cart items
INSERT INTO cart_items (cart_id, product_id, quantity)
VALUES (1, 2, 1), -- 1 unit of Product 2 in John's cart
       (2, 1, 3); -- 3 units of Product 1 in Jane's cart

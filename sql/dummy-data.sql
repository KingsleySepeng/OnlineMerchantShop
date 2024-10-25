USE shopdb;

-- Insert users
INSERT INTO users (first_name,last_name,username,email,phone, password, role) VALUES
('john_doe', 'john@example.com', 'hashedpassword1', 'customer'),
('jane_doe', 'jane@example.com', 'hashedpassword2', 'customer'),
('admin_user', 'admin@example.com', 'hashedpassword3', 'admin');

-- Insert products
INSERT INTO products (name, description, image_url, stock, price) VALUES
('Product 1', 'Description for Product 1', 'https://example.com/product1.jpg', 100, 19.99),
('Product 2', 'Description for Product 2', 'https://example.com/product2.jpg', 50, 29.99),
('Product 3', 'Description for Product 3', 'https://example.com/product3.jpg', 150, 9.99);

-- Insert orders
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 29.99, 'pending'),
(2, 19.99, 'shipped');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 2, 1, 29.99),
(2, 1, 2, 19.99);

-- Insert carts
INSERT INTO carts (user_id) VALUES
(1),
(2);

-- Insert cart items
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 3, 2),
(2, 2, 1);

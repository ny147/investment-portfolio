-- Insert data into the "User" table
INSERT INTO "User" ("Username", "CreatedAt", "UpdatedAt") VALUES
('investor1', NOW(), NOW()),
('investor2', NOW(), NOW());

-- Insert data into the "Asset" table
INSERT INTO "Asset" ("AssetSymbol", "AssetType", "AssetName", "CurrentPrice", "CreatedAt", "UpdatedAt") VALUES
('AAPL', 'Stock', 'Apple Inc.', 200.50, NOW(), NOW()),
('GOOGL', 'Stock', 'Alphabet Inc.', 150.75, NOW(), NOW()),
('BTC', 'Crypto', 'Bitcoin', 65000.00, NOW(), NOW());

-- Insert data into the "Account" table
INSERT INTO "Account" ("UserID", "AccountType", "AccountName", "AccountStatus", "CreatedAt", "UpdatedAt") VALUES
(1, 'Brokerage', 'Main Trading Account', 'Active', NOW(), NOW()),
(1, 'Retirement', '401k Account', 'Active', NOW(), NOW()),
(2, 'Brokerage', 'Personal Brokerage', 'Active', NOW(), NOW());

-- Insert data into the "Transaction" table
INSERT INTO "Transaction" ("AccountID", "AssetID", "TransactionType", "Quantity", "PricePerUnit", "TotalValue", "created_at") VALUES
-- Investor 1's transactions
(1, 1, 'BUY', 5.0, 198.00, 990.00, NOW()),
(1, 2, 'BUY', 10.0, 149.50, 1495.00, NOW()),
(1, 1, 'SELL', 2.0, 201.50, 403.00, NOW()),

-- Investor 2's transactions
(3, 1, 'BUY', 3.0, 200.00, 600.00, NOW()),
(3, 3, 'BUY', 0.5, 64000.00, 32000.00, NOW());

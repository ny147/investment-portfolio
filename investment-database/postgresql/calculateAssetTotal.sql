WITH CalculatedTransactions AS (
    SELECT
        "AssetID",
        "AccountID",
        CASE
            WHEN "TransactionType" = 'BUY' THEN "TotalValue"
            WHEN "TransactionType" = 'SELL' THEN -"TotalValue"
            ELSE 0
        END AS "AdjustedValue"
    FROM "Transaction"
)
SELECT
    CT."AssetID",
    SUM(CT."AdjustedValue") AS "AssetTotalValue"
FROM CalculatedTransactions AS CT
JOIN "Account" AS A
    ON CT."AccountID" = A."AccountID"
WHERE A."UserID" = 1 -- Replace 1 with the specific UserID
GROUP BY CT."AssetID";
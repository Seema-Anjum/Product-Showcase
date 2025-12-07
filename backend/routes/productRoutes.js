import express from "express";
import db from "../db/database.js";

const router = express.Router();

// controller function 
async function getProducts(filters = {}, limit = 10, offset = 0) {
    let sql = 'SELECT * FROM products';
    const params = [];
    const whereClauses = [];

    if (filters.category) {
        whereClauses.push('category = ?');
        params.push(filters.category);
    }
    if (filters.minPrice) {
        whereClauses.push('price >= ?');
        params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
        whereClauses.push('price <= ?');
        params.push(filters.maxPrice);
    }

    if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);


    const stmt = db.prepare(sql);
    const rows = stmt.all(...params);

    return rows;
}
    
// Route
router.get("/", async (req, res) => {
    const { category, minPrice, maxPrice, limit, offset } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);

    const parsedLimit = Number(limit) || 10;
    const parsedOffset = Number(offset) || 0;

    try {
        const products = await getProducts(filters, parsedLimit, parsedOffset);

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// GET /api/products/:id 
router.get("/:id", (req, res) => {
    try{
        const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
        if (!product) return res.status(404).json({success: false, message:"Product not found"});
        res.json({success:true, data:product});
    } catch(err) {
        res.status(500).json({success:false, message: `Failed to fetch product: ${err.message}`});
    }
});

export default router;

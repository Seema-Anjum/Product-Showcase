import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import enquiriesRoutes from "./routes/enquiriesRoutes.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));


// routes 
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiriesRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => 
  console.log(`Server running at http://localhost:${PORT}/`)
);

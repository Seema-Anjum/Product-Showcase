import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// resolve directory paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// path to SQLite DB file
const dbPath = path.join(__dirname, "database.sqlite");

// connect to database
const db = new Database(dbPath);

// sample product seed data
const products = [
  {
    name: "Smartphone X200",
    category: "Electronics",
    short_desc: "Powerful flagship smartphone",
    long_desc: "The Smartphone X200 combines a stunning 6.7-inch AMOLED display with a lightning-fast octa-core processor, offering seamless multitasking and immersive entertainment. With its advanced AI camera system, 5G connectivity, and long-lasting battery, it's engineered for users who demand performance, style, and reliability.",
    price: 24999,
    image_url: "/images/phone.jpg"
  },
  {
    name: "Noise-Cancelling Earbuds Pro",
    category: "Electronics",
    short_desc: "Premium wireless earbuds",
    long_desc: "Experience breathtaking audio clarity with these advanced noise-cancelling earbuds. Designed for comfort and clarity, they feature environmental noise reduction, touch controls, sweat resistance, and up to 28 hours of total playback time with the charging case. Ideal for travel, calls, and daily use.",
    price: 2999,
    image_url: "/images/earbuds.jpeg"
  },
  {
    name: "Book of Wisdom",
    category: "Books",
    short_desc: "Inspirational philosophy book",
    long_desc: "A collection of timeless insights from ancient philosophers and modern thinkers. This book guides readers through practical life lessons, emotional awareness, decision-making, and personal growth. A perfect companion for anyone seeking mental clarity, motivation, and a deeper understanding of life.",
    price: 599,
    image_url: "/images/wisdom-book.jpeg"
  },
  {
    name: "ErgoPro Office Chair",
    category: "Furniture",
    short_desc: "Comfortable ergonomic chair",
    long_desc: "Built for long working hours, the ErgoPro chair features adaptive lumbar support, breathable mesh fabric, and a fully adjustable backrest with tilt lock. The smooth-rolling wheels and cushioned seat ensure comfort even during intense productivity sessions.",
    price: 6499,
    image_url: "/images/office-chair.jpg"
  },
  {
    name: "4K Ultra HD Smart TV 43”",
    category: "Electronics",
    short_desc: "High-definition smart television",
    long_desc: "A vibrant 4K UHD display with Dolby Vision ensures cinematic visuals, while built-in Wi-Fi and voice assistant support make navigation effortless. Stream your favorite shows, connect gaming consoles, and enjoy crisp audio with the enhanced DTS sound engine.",
    price: 26999,
    image_url: "/images/tv.webp"
  },
  {
    name: "Classic Leather Wallet",
    category: "Accessories",
    short_desc: "Handcrafted premium wallet",
    long_desc: "Made from 100% genuine leather, this wallet combines minimal design with durability. It includes RFID protection, multi-card compartments, and a sleek, timeless finish. A perfect blend of elegance and practicality for everyday use.",
    price: 999,
    image_url: "/images/wallet.webp"
  },
  {
    name: "Stainless Steel Water Bottle 1L",
    category: "Lifestyle",
    short_desc: "Insulated metal bottle",
    long_desc: "This double-layer insulated bottle keeps beverages hot for 12 hours and cold for 24 hours. Lightweight, leak-proof, and eco-friendly, it's perfect for students, office-goers, travelers, and gym lovers looking for a sustainable hydration solution.",
    price: 699,
    image_url: "/images/steel-bottle.jpeg"
  },
  {
    name: "Gaming Keyboard RGB Pro",
    category: "Computers",
    short_desc: "Mechanical RGB gaming keyboard",
    long_desc: "Equipped with precision-engineered mechanical switches, programmable RGB lighting, and anti-ghosting technology, this keyboard is built for competitive gaming. The sturdy aluminum frame and comfortable wrist rest provide long-lasting performance.",
    price: 1799,
    image_url: "/images/keyboard.jpg"
  },
  {
    name: "AirMax Sports Shoes",
    category: "Footwear",
    short_desc: "Lightweight breathable shoes",
    long_desc: "Designed with an ultra-flexible sole and breathable mesh upper, AirMax shoes provide exceptional comfort for running, training, and daily wear. The shock-absorbent heel cushioning ensures better grip, stability, and impact protection.",
    price: 2199,
    image_url: "/images/sport-shoes.webp"
  },
  {
    name: "Modern Study Lamp",
    category: "Home Decor",
    short_desc: "LED table lamp",
    long_desc: "A sleek, energy-efficient LED lamp with adjustable brightness levels and a flexible neck. Ideal for study tables, bedside spaces, or work-from-home setups. The anti-glare lighting reduces eye strain, making it perfect for long reading or working sessions.",
    price: 799,
    image_url: "/images/modern-study-lamp.jpg"
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    short_desc: "Noise-cancelling Bluetooth headphones",
    long_desc: "High-quality noise cancellation, long battery life, and rich audio.",
    price: 129.99,
    image_url: "/images/headphone.jpeg"
  },
  
  {
    name: "JavaScript Handbook",
    category: "Books",
    short_desc: "Beginner to advanced JS guide",
    long_desc: "Covers ES6+, async programming, DOM, Node.js, and more.",
    price: 24.99,
    image_url: "/images/javascript.jpg"
  },
  {
    name: "Organic Moisturizer",
    category: "Beauty",
    short_desc: "Natural skin moisturizer",
    long_desc: "Made with organic aloe vera and essential oils.",
    price: 15.00,
    image_url: "/images/organic-moisturizer.jpg"
  }
];

// prepare insert statement
const insert = db.prepare(`
  INSERT INTO products 
  (name, category, short_desc, long_desc, price, image_url) 
  VALUES (?, ?, ?, ?, ?, ?)
`);

// insert all products
db.transaction(() => {
  products.forEach(p => {
    insert.run(p.name, p.category, p.short_desc, p.long_desc, p.price, p.image_url);
  });
})();

console.log("Seed data inserted successfully!");
db.close();

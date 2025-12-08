import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/products");
      setProducts(res.data.data || []);
      setFiltered(res.data.data || []);
    } catch (err) {
      console.log("Failed to fetch products", err);
    }
  };

  const applyFilter = () => {
    let temp = [...products];

    if (search.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      temp = temp.filter((p) => p.category === category);
    }

    setFiltered(temp);
    setCurrentPage(1);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="product-container">
      <h2 className="title">Product Showcase & Enquiry</h2>

      {/* FILTER BAR */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <button className="apply-btn" onClick={applyFilter}>
          Apply Filter
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid">
        {currentItems.map((p) => (
          <div className="card" key={p.id}>
            <img
              src={
                p.image_url ||
              `${import.meta.env.VITE_API_URL}/${p.image_url}`
              }
              alt={p.name}
            />

            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>

            <Link to={`/products/${p.id}`} className="details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No products found.</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

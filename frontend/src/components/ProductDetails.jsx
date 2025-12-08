import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EnquiryForm from "./EnquiryForm";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container product-details">
      <div className="product-image">
        <img
          src={product.image_url ? `${import.meta.env.VITE_API_URL}${product.image_url}` : "https://via.placeholder.com/300"}
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.long_desc}</p>

        <button onClick={() => setShowEnquiry(true)} className="enquire-btn">
          Enquire
        </button>

        {showEnquiry && (
          <EnquiryForm
            productId={product.id}
            onClose={() => setShowEnquiry(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

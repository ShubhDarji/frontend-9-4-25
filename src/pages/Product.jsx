import React, { useEffect, useState } from "react";
import { Container, Button, Form, Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";
import { products as staticProducts } from "../utils/products";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import "./Product.css";

const StarRating = ({ rating = 0 }) => (
  <div className="product-rating">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star-icon ${index < rating ? "active-star" : "inactive-star"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("specifications");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // ✅ NEW loading state
  useWindowScrollToTop();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data: productData } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(productData);

        setCurrentImage(
          productData.primaryImage
            ? `http://localhost:5000/uploads/${productData.primaryImage}`
            : "/default-product.png"
        );

        const { data: relatedAPIProducts } = await axios.get(`http://localhost:5000/api/products`);
        const relatedFromAPI = relatedAPIProducts.filter(
          (item) => item.companyName === productData.companyName && item._id !== productData._id
        );

        setRelatedProducts(relatedFromAPI);
        setIsLoaded(true); // ✅ Finished loading
      } catch (err) {
        console.error("API Error:", err);

        const currentProduct = staticProducts.find((item) => String(item.id) === String(id));

        if (currentProduct) {
          setProduct(currentProduct);
          setCurrentImage(currentProduct.imgUrl || "/default-product.png");

          const relatedFromStatic = staticProducts.filter(
            (item) =>
              item.companyName === currentProduct.companyName && item.id !== currentProduct.id
          );

          setRelatedProducts(relatedFromStatic);
          setIsLoaded(true); // ✅ Finished loading with fallback
        } else {
          setError("Product not found.");
        }
      }
    };

    fetchProductData();
  }, [id]);

  if (error) {
    return (
      <Container className="text-center">
        <h2>{error}</h2>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </Container>
    );
  }

  // ✅ Block render until fully loaded
  if (!isLoaded) {
    return (
      <Container className="text-center" style={{ padding: "100px 0" }}>
        <h2>Loading product...</h2>
      </Container>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor,
      qty: quantity,
    };
    dispatch(addToCart(productToAdd));
    alert("Product added to cart!");
  };

  const ProductDisplay = () => (
    <section className="product-display">
      <Container>
        <div className="breadcrumb">Home &gt; Products &gt; {product.productName}</div>
        <div className="product-layout">
          <div className="product-images">
            <img src={currentImage} alt={product.productName} className="main-img" />
            <div className="thumbnail-container">
              {[
                product.primaryImage || "/default-product.png",
                ...(product.secondaryImages || []),
              ].map((img, index) => (
                <img
                  key={index}
                  src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${currentImage.includes(img) ? "active-thumbnail" : ""}`}
                  onClick={() =>
                    setCurrentImage(img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`)
                  }
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.productName}</h1>
            <StarRating rating={product.rating || 0} />
            <p className="price">
              ₹{product.price}
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </p>
            <p>{product.description}</p>

            <Form.Group>
              <Form.Label>Color</Form.Label>
              <div className="color-options">
                {["Black", "White", "Blue"].map((color) => (
                  <Button
                    key={color}
                    className={`color-btn ${selectedColor === color ? "active" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>

            <Button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="go-to-cart-btn" onClick={() => navigate("/cart")}>
              Go to Cart
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );

const TabSection = () => (
  <section className="product-tabs">
    <Container className="text-center">
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="specifications">Specifications</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="reviews">Reviews</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shipping">Shipping & Returns</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="tab-content mt-3">
      {activeTab === "specifications" && (
  <div className="specs-with-images">
    <div className="specs-text">
      <ul className="custom-list">
        {product.specifications?.split("\n").map((line, idx) => (
          <li key={idx}>{line}</li>
        )) || <li>No specifications provided.</li>}
      </ul>
    </div>

    <div className="specs-images">
      {product.primaryImage && (
        <img
          src={`http://localhost:5000/uploads/${product.primaryImage}`}
          alt="Primary"
          className="spec-img-tall"
        />
      )}
      {product.secondaryImages?.map((img, idx) => (
        <img
          key={idx}
          src={img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`}
          alt={`Secondary ${idx}`}
          className="spec-img-tall"
        />
      ))}
    </div>
  </div>
)}
        {activeTab === "reviews" && (
          <p>Reviews functionality coming soon.</p>
        )}
        {activeTab === "shipping" && (
          <>
            <p><strong>Shipping Policy:</strong> {product.shippingPolicy || "No shipping info."}</p>
            <p><strong>Return Policy:</strong> {product.returnPolicy || "No return policy info."}</p>
          </>
        )}
      </div>
    </Container>
  </section>
);
  return (
    <>
      <ProductDisplay />
      <TabSection />
    </>
  );
};

export default Product;
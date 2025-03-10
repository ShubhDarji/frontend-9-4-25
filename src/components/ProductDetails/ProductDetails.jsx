import { useState } from "react";
import { Col, Container, Row, Accordion, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(selectedProduct?.imgUrl);

  if (!selectedProduct) {
    return <h2 className="text-center">Product not found</h2>;
  }

  const discountPercentage = selectedProduct.originalPrice
    ? Math.round(
        ((selectedProduct.originalPrice - selectedProduct.price) /
          selectedProduct.originalPrice) *
          100
      )
    : 0;

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success(`${selectedProduct.productName} added to cart!`);
  };

  const handleBuyNow = () => {
    toast.info("Proceeding to checkout...");
  };

  const allImages = [selectedProduct.imgUrl, ...(selectedProduct.additionalImages ?? [])];

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          {/* Product Image with Thumbnails */}
          <Col md={6} className="product-image-container">
            <div className="main-image">
              <img
                loading="lazy"
                src={selectedImage}
                alt={selectedProduct.productName}
                className="selected-img"
              />
            </div>
            <div className="image-thumbnails">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={selectedImage === img ? "active-thumbnail" : ""}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </Col>

          {/* Product Details */}
          <Col md={6} className="product-info">
            <h2 className="product-title">{selectedProduct.productName}</h2>

            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa fa-star ${
                      index < Math.round(selectedProduct.avgRating) ? "filled" : ""
                    }`}
                  />
                ))}
              </div>
              <span>{selectedProduct.avgRating} Ratings</span>
            </div>

            <div className="price-section">
              <span className="product-price">₹{selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="product-old-price">₹{selectedProduct.originalPrice}</span>
                  <span className="product-discount">({discountPercentage}% OFF)</span>
                </>
              )}
            </div>

            <p className="product-desc">{selectedProduct.shortDesc}</p>

            {/* Quantity & Cart Controls */}
            <div className="cart-controls">
              <div className="qty-container">
                <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                <input className="qty-input" type="text" value={quantity} readOnly />
                <button className="qty-btn" onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add To Cart
              </Button>
              <Button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Additional Information */}
            <Accordion defaultActiveKey="0" className="product-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>{selectedProduct.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Specifications</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {selectedProduct.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Return Policy</Accordion.Header>
                <Accordion.Body>{selectedProduct.returnPolicy}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;

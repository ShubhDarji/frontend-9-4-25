import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

// ✅ Utility to Get Image URL with Fallback
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/default-product.png';

  const isAbsoluteUrl = /^https?:\/\//.test(imagePath);
  return isAbsoluteUrl
    ? imagePath
    : `http://localhost:5000/uploads/${encodeURIComponent(imagePath)}`;
};

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // ✅ Handle Missing Product
  if (!selectedProduct) {
    return <h2 className="text-center">Product not found</h2>;
  }

  // ✅ Determine if Product is Dynamic or Static
  const isDynamicProduct = !!selectedProduct._id;
  const inStock = selectedProduct.stock > 0;
  const isActive = selectedProduct.status === "Active";

  // ✅ Primary and Additional Images Handling
  const primaryImage = isDynamicProduct
    ? getImageUrl(selectedProduct.primaryImage)
    : getImageUrl(selectedProduct.imgUrl);

  const additionalImages = isDynamicProduct
    ? (selectedProduct.secondaryImages || []).map(getImageUrl)
    : (selectedProduct.additionalImages || []).map(getImageUrl);

  const allImages = [primaryImage, ...additionalImages];
  const [selectedImage, setSelectedImage] = useState(primaryImage);

  // ✅ Calculate Discount
  const discountPercentage =
    selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price
      ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
      : 0;

  // ✅ Handle Quantity Changes with Stock Validation
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQuantity = Math.max(1, prev + amount);
      return selectedProduct.stock ? Math.min(newQuantity, selectedProduct.stock) : newQuantity;
    });
  };

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!inStock) {
      toast.error("This product is out of stock!");
      return;
    }
    dispatch(addToCart({ ...selectedProduct, qty: quantity }));
    toast.success(`${selectedProduct.productName} added to cart!`);
    setQuantity(1); // Reset quantity
  };

  // ✅ Buy Now
  const handleBuyNow = () => {
    if (!inStock) {
      toast.error("Cannot proceed to checkout. Product is out of stock!");
      return;
    }
    toast.info("Proceeding to checkout...");
  };

  return (
    <section className="product-page">
      <Container>
        <Row>
          {/* ✅ Product Images */}
          <Col md={6}>
            <div className="main-image">
              <img
                src={selectedImage}
                alt={selectedProduct.productName || "Product Image"}
                className="selected-img"
                onError={(e) => {
                  console.error("Failed to load main image:", e.target.src);
                  e.target.src = '/assets/default-product.png';
                }}
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
                  onError={(e) => {
                    console.error(`Failed to load thumbnail ${index + 1}:`, e.target.src);
                    e.target.src = '/assets/default-product.png';
                  }}
                />
              ))}
            </div>
          </Col>

          {/* ✅ Product Details */}
          <Col md={6}>
            <h2>{selectedProduct.productName}</h2>
            <p className="product-price">₹{selectedProduct.price}</p>

            {/* ✅ Show Discount Only When Applicable */}
            {discountPercentage > 0 && (
              <span className="product-old-price">
                ₹{selectedProduct.originalPrice} ({discountPercentage}% OFF)
              </span>
            )}

            <p>{selectedProduct.shortDesc || selectedProduct.description}</p>

            {/* ✅ Stock Status */}
            {!inStock && <p className="out-of-stock">Out of Stock</p>}
            {isActive ? (
              <p className="stock-status">In Stock: {selectedProduct.stock || "Unlimited"}</p>
            ) : (
              <p className="inactive-status">This product is currently inactive.</p>
            )}

            {/* ✅ Quantity Controls */}
            <div className="quantity-controls">
              <Button variant="outline-primary" onClick={() => handleQuantityChange(-1)}>-</Button>
              <span>{quantity}</span>
              <Button variant="outline-primary" onClick={() => handleQuantityChange(1)}>+</Button>
            </div>

            {/* ✅ Action Buttons */}
            <div className="cart-controls">
              <Button onClick={handleAddToCart} disabled={!inStock || !isActive}>Add To Cart</Button>
              <Button onClick={handleBuyNow} disabled={!inStock || !isActive}>Buy Now</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;

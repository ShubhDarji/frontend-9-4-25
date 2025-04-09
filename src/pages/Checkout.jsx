import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../app/features/cart/cartSlice";
import { message, Card, Typography, Button, Input, Select, Divider } from "antd";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  // ✅ Load User Data
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setPhoneNumber(savedUser.phone || "");
      setAddress(savedUser.address || "");
    }

    const productsFromState = location?.state?.products || cartItems;
    if (productsFromState?.length > 0) {
      setSelectedProducts(productsFromState);
    } else {
      message.warning("Your cart is empty or data not found!");
      navigate("/");
    }
  }, [location, cartItems, navigate]);

  // ✅ Calculate Charges
  const totalPrice = selectedProducts.reduce((total, item) => total + item.qty * item.price, 0);
  const platformCharge = 0.01 * totalPrice;
  const deliveryCharge = 0.005 * totalPrice;
  const finalTotal = totalPrice + platformCharge + deliveryCharge;

  // ✅ Validate Inputs
  const validateInputs = () => {
    if (!phoneNumber.trim() || !address.trim()) {
      message.error("Please provide your phone number and address.");
      return false;
    }
    return true;
  };

  // ✅ Handle Order Submission
  // ✅ Handle Order Submission
  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || !user._id || !user.token) {
      message.error("User not authenticated. Please log in.");
      return;
    }
  
    // Validate Inputs
    if (!validateInputs()) return;
    const formattedPaymentMethod = paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
    // Format Data Correctly
    const orderData = {
      userId: user._id,
      items: selectedProducts.map((item) => ({
        productId: item._id || item.productId,
        sellerId: item.sellerId,
        productName: item.productName,
        price: item.price,
        qty: item.qty,
        image: item.primaryImage || item.imgUrl,
      })),
      totalAmount: finalTotal,
      phoneNumber,
      address,
      paymentMethod: formattedPaymentMethod,
    };
  
    console.log("Submitting Order:", orderData);
  
    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      message.success(response.data.message || "Order placed successfully!");
      dispatch(clearCart());
      navigate("/order-success");
    } catch (error) {
      console.error("Order Error:", error);
      message.error(error?.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="checkout-section" style={{ padding: "40px" }}>
      
      {/* ✅ Order Summary */}
      <Card className="summary-card" style={{ marginBottom: "24px" }}>
        <Title level={3}>Order Summary</Title>
        {selectedProducts.map((product, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "16px", alignItems: "center" }}>
            <img
              src={product.primaryImage || product.imgUrl || "/default-product.png"}
              alt={product.productName}
              style={{ width: "80px", height: "80px", marginRight: "16px", borderRadius: "8px", objectFit: "cover" }}
            />
            <div>
              <Text>{product.productName}</Text>
              <br />
              <Text strong>₹{product.price.toFixed(2)} x {product.qty} = ₹{(product.price * product.qty).toFixed(2)}</Text>
            </div>
          </div>
        ))}

        <Divider />
        <p>Platform Charge: <Text strong>₹{platformCharge.toFixed(2)}</Text></p>
        <p>Delivery Charge: <Text strong>₹{deliveryCharge.toFixed(2)}</Text></p>
        <h4>Total: ₹{finalTotal.toFixed(2)}</h4>
      </Card>

      {/* ✅ User Details */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Contact Details</Title>
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
          style={{ marginBottom: "16px" }}
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Delivery Address"
          style={{ marginBottom: "16px" }}
        />

        {/* ✅ Payment Method */}
        <Title level={4}>Select Payment Method</Title>
        <Select value={paymentMethod} onChange={setPaymentMethod} style={{ width: "100%", marginBottom: "16px" }}>
  <Option value="Cash on Delivery">Cash on Delivery</Option>
  <Option value="Online Payment">Online Payment</Option>
</Select>
      </Card>

      {/* ✅ Confirm Order Button */}
      <Button type="primary" onClick={handleOrder} loading={loading} block>
        {loading ? "Placing Order..." : "Confirm Order"}
      </Button>
    </div>
  );
};

export default Checkout;
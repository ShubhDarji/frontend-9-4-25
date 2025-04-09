import { useState, Fragment, useEffect } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { products as staticProducts } from "../utils/products";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import "./shop.css";

const Shop = () => {
  const [filterList, setFilterList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    priceRange: "All",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useWindowScrollToTop();

  // ✅ Generate Image URL with Fallback
 // ✅ Generate Image URL with Fallback
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    console.warn("Image missing, using fallback.");
    return "/assets/default-product.png"; // Fallback for missing images
  }
  
  const isAbsoluteUrl = /^https?:\/\//.test(imagePath);
  return isAbsoluteUrl 
    ? imagePath 
    : `http://localhost:5000/uploads/${encodeURIComponent(imagePath)}`;
};

// ✅ Fetch and Merge Products with Image URLs
const fetchProducts = async () => {
  setLoading(true);
  setError("");

  try {
    const { data: apiProducts } = await axios.get("http://localhost:5000/api/products");

    // ✅ Ensure Product Image URLs are Available
    const formattedAPIProducts = apiProducts
      .filter((product) => product.status === "Active")
      .map((product) => ({
        ...product,
        id: product._id,
        primaryImageUrl: product.primaryImage || "/assets/default-product.png", // Use default if missing
      }));

    // ✅ Format Static Products (Fallback)
    const formattedStaticProducts = staticProducts.map((product) => ({
      ...product,
      primaryImageUrl: product.primaryImage || "/assets/default-product.png",
    }));

    // ✅ Remove Duplicates
    const allProducts = [...formattedAPIProducts, ...formattedStaticProducts];
    const uniqueProducts = Array.from(
      new Map(allProducts.map((product) => [product.id || product.productName, product])).values()
    );

    setFilterList(uniqueProducts);
  } catch (error) {
    setError(error.response?.data?.message || "Failed to load products. Please try again.");
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};



  // ✅ Apply Filters and Search
  const applyFilters = () => {
    let filtered = [...filterList];

    if (searchWord.trim()) {
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(searchWord.toLowerCase().trim())
      );
    }

    if (filters.category !== "All") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.brand !== "All") {
      filtered = filtered.filter((item) => item.companyName === filters.brand);
    }

    if (filters.priceRange !== "All") {
      const priceMap = {
        "Under ₹5,000": [0, 5000],
        "₹5,000 - ₹10,000": [5000, 10000],
        "₹10,000 - ₹20,000": [10000, 20000],
        "₹20,000 - ₹50,000": [20000, 50000],
        "₹50,000 - ₹1,00,000": [50000, 100000],
        "Above ₹1,00,000": [100000, Infinity],
      };
      const [minPrice, maxPrice] = priceMap[filters.priceRange];
      filtered = filtered.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    }

    return filtered;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayedProducts = applyFilters();

  // ✅ Error and Loading UI
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container fluid className="shop-layout">
        <Row>
          {/* ✅ Filters Section */}
          <Col md={3} className="filter-sidebar">
            <h3>Filters</h3>
            <SearchBar setSearchWord={setSearchWord} />
            <FilterSelect filters={filters} setFilters={setFilters} products={filterList} />
          </Col>

          {/* ✅ Products Section */}
          <Col md={9} className="product-section">
            <h2>All Products - {filters.brand !== "All" ? filters.brand : "All"}</h2>
            {displayedProducts.length > 0 ? (
              <ShopList productItems={displayedProducts} />
            ) : (
              <Alert variant="info">No products found matching your criteria.</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Shop;

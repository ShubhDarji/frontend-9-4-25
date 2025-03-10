import { useState, Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { products } from "../utils/products"; // Product data
import ShopList from "../components/ShopList"; // Component to display products
import useWindowScrollToTop from "../hooks/useWindowScrollToTop"; // Custom hook
import FilterSelect from "../components/FilterSelect"; // Updated filter component
import SearchBar from "../components/SeachBar/SearchBar";
import "./shop.css";

const Shop = () => {
  const [filterList, setFilterList] = useState(products);
  const [searchWord, setSearchWord] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    priceRange: "All",
  });

  useWindowScrollToTop(); // Scrolls to top when the component mounts

  // Function to filter products dynamically
  const applyFilters = () => {
    let filtered = products;

    // Apply search filter
    if (searchWord) {
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== "All") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand !== "All") {
      filtered = filtered.filter((item) => item.companyName === filters.brand);
    }

    // Apply price range filter
    if (filters.priceRange !== "All") {
      const getPriceRangeValues = (range) => {
        const priceMap = {
          "Under ₹5,000": [0, 5000],
          "₹5,000 - ₹10,000": [5000, 10000],
          "₹10,000 - ₹20,000": [10000, 20000],
          "₹20,000 - ₹50,000": [20000, 50000],
          "₹50,000 - ₹1,00,000": [50000, 100000],
          "Above ₹1,00,000": [100000, Infinity],
        };
        return priceMap[range] || [0, Infinity];
      };

      const [minPrice, maxPrice] = getPriceRangeValues(filters.priceRange);
      filtered = filtered.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    }

    setFilterList(filtered);
  };

  // Apply filters whenever search or filters change
  useEffect(() => {
    applyFilters();
  }, [searchWord, filters]);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          {/* Sidebar Filters (Left) */}
          <Col md={3} className="filter-sidebar">
            <div className="filter-section">
              <h3>Filters</h3>
              <SearchBar setSearchWord={setSearchWord} />
              <FilterSelect filters={filters} setFilters={setFilters} products={products} />
            </div>
          </Col>

          {/* Product Listing (Right) */}
          <Col md={9} className="product-section">
            <h2>All Products - {filters.brand !== "All" ? filters.brand : "All"}</h2>
            <ShopList productItems={filterList} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Shop;

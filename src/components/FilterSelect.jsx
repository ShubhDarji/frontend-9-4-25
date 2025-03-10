import React from "react";
import "./filter.css";

const FilterSelect = ({ products, filters, setFilters }) => {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.companyName))];

  const priceRanges = [
    "All",
    "Under ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹20,000",
    "₹20,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "Above ₹1,00,000",
  ];

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Category</label>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Brand</label>
        <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <select value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}>
          {priceRanges.map((range, index) => (
            <option key={index} value={range}>{range}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelect;

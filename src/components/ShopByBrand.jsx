import React from "react";
import { useParams } from "react-router-dom"; // Import useParams for dynamic routing
import { products } from '../../src/utils/products' // Import products data
import { Container, Row, Col } from "react-bootstrap";

const ShopByBrand = () => {
  // Get the brand name from the URL params
  const { brandName } = useParams();

  // Filter products for the selected brand
  const filteredProducts = products.filter(
    (product) => product.companyName.toLowerCase() === brandName
  );

  return (
    <Container>
      <h2>Products by {brandName.charAt(0).toUpperCase() + brandName.slice(1)}</h2>
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4}>
              <div className="product">
                <img src={product.imgUrl} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>{product.shortDesc}</p>
                <p>Price: ₹{product.price}</p>
              </div>
            </Col>
          ))
        ) : (
          <p>No products found for this brand.</p>
        )}
      </Row>
    </Container>
  );
};

export default ShopByBrand;

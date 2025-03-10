import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "../components/Banner/Banner";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Brand = () => {
  const { brandName } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (brandName) {
      const filteredProducts = products.filter(
        (product) => product.companyName.toLowerCase() === brandName.toLowerCase()
      );
      setBrandProducts(filteredProducts);
    }
  }, [brandName]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={`${brandName} Products`} />
      <section className="brand-products">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="text-center mb-4">
              <h2>{brandProducts.length ? `Explore ${brandName} Products` : "No Products Available"}</h2>
            </Col>
          </Row>
          {brandProducts.length > 0 ? (
            <ShopList productItems={brandProducts} />
          ) : (
            <p className="text-center">No products found for {brandName}.</p>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Brand;

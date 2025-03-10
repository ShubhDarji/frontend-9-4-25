import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import FilterSelect from "../components/FilterSelect";
import "./Product.css"
const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [filterList, setFilterList] = useState(products);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    const currentProduct = products.find(
      (item) => String(item.id) === String(id) // Ensure ID comparison works
    );
  
    if (currentProduct) {
      setSelectedProduct(currentProduct);
      setRelatedProducts(
        products.filter(
          (item) =>
            item.companyName === currentProduct.companyName && item.id !== currentProduct.id
        )
      );
    } else {
      setSelectedProduct(null);
    }
  }, [id]);
  

  useWindowScrollToTop();

  if (!selectedProduct) {
    return (
      <Container className="text-center">
        <h2>Product not found</h2>
      </Container>
    );
  }

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
     
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
          <ShopList productItems={relatedProducts.length ? relatedProducts : filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Product;

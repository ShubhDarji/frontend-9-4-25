import React, { useState } from "react";
import { Card, Button, message } from "antd";
import { dummyProducts } from "../../data/dummyData";

const ProductCard = () => {
  const [products, setProducts] = useState(dummyProducts);

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("Product deleted successfully!");
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          cover={<img src={product.image} alt={product.name} style={{ height: 150, objectFit: "cover" }} />}
          actions={[
            <Button type="primary">Edit</Button>,
            <Button danger onClick={() => deleteProduct(product.id)}>Delete</Button>,
          ]}
        >
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;

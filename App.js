import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchProducts } from "./src/api/products";
import ProductItem from "./src/components/ProductItem";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [lastR, setLastR] = useState(0);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    const fetchedProducts = await fetchProducts(page, limit);
    setPage(page + 1);
    const tempProducts = products.concat(fetchedProducts);
    setProducts(tempProducts);
  };

  const ProductView = (product, index) => {
    var r = Math.floor(Math.random() * 1000);
    if (r === lastR) {
      r = Math.floor(Math.random() * 1000);
    }

    return <ProductItem index={index} product={product} r={r} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        key={(item) => item.id}
        // horizontal={true}
        style={{
          width: 300,
        }}
        onEndReached={refreshProducts}
        renderItem={({ item, index }) => ProductView(item, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

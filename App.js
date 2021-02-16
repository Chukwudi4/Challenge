import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { formatPrice, formatTime } from "./src/api/formatter";
import { fetchProducts } from "./src/api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    const fetchedProducts = await fetchProducts(page, limit);
    setProducts(fetchedProducts);
  };

  const ProductView = (product) => {
    return (
      <View>
        <Text style={{ fontSize: product.size }}>{product.face}</Text>
        <View>
          <Text>${formatPrice(product.price)}</Text>
          <Text>{formatTime(product.date)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        key={(item) => item.id}
        horizontal={true}
        renderItem={({ item }) => ProductView(item)}
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

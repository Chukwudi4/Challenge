import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fetchProducts } from "./src/api/products";
import LoadingComponent from "./src/components/LoadingComponent";
import ProductItem from "./src/components/ProductItem";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [lastR, setLastR] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("price");

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async (sort = "price") => {
    setLoading(true);
    const fetchedProducts = await fetchProducts(page, limit, sort);
    setPage(page + 1);
    const tempProducts = products.concat(fetchedProducts);
    setProducts(tempProducts);
    setLoading(false);
  };

  const ProductView = (product, index) => {
    var r = Math.floor(Math.random() * 1000);
    if (r === lastR) {
      r = Math.floor(Math.random() * 1000);
    }

    return <ProductItem index={index} product={product} r={r} />;
  };

  return (
    <>
      <Picker
        selectedValue={selectedSort}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => {
          setProducts([]);
          refreshProducts(itemValue);
          setSelectedSort(itemValue);
        }}
      >
        <Picker.Item label="Price" value="price" />
        <Picker.Item label="ID" value="id" />
        <Picker.Item label="Size" value="size" />
      </Picker>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}
          >
            {products.map((item, index) => (
              <View style={{ width: "50%", marginVertical: 50 }} key={index}>
                {ProductView(item, index)}
              </View>
            ))}
          </View>

          {isLoading && <LoadingComponent />}
        </View>
      </ScrollView>
    </>
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

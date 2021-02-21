import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { fetchProducts } from "./src/api/products";
import LoadingComponent from "./src/components/LoadingComponent";
import ProductItem from "./src/components/ProductItem";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cache, updateCache] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [lastR, setLastR] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("price");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    onMount();
  }, []);

  const onMount = () => {
    fetchProducts(page, limit, selectedSort).then((newProducts) => {
      setPage(page + 1);
      setProducts(newProducts);
      fetchAndCacheProducts();
    });
  };

  const fetchAndCacheProducts = async () => {
    setLoading(true);
    updateCache([]);
    fetchProducts(page, limit, selectedSort)
      .then((newProducts) => {
        setPage(page + 1);
        updateCache(newProducts);
        setFinished(newProducts.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Network error");
      });
  };

  const refreshProducts = () => {
    const tempProducts = products.concat(cache);
    setProducts(tempProducts);
    fetchAndCacheProducts();
  };

  const ProductView = (product, index) => {
    var r = Math.floor(Math.random() * 1000);
    if (r === lastR) {
      r = Math.floor(Math.random() * 1000);
    }

    return (
      <ProductItem index={index} product={product} r={r} updateR={setLastR} />
    );
  };

  return (
    <>
      <Picker
        selectedValue={selectedSort}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => {
          setSelectedSort(itemValue);
          onMount();
        }}
      >
        <Picker.Item label="Price" value="price" />
        <Picker.Item label="ID" value="id" />
        <Picker.Item label="Size" value="size" />
      </Picker>
      <FlatList
        data={products}
        key={(item) => item.id}
        numColumns={2}
        style={{
          width: 300,
        }}
        onEndReached={refreshProducts}
        renderItem={({ item, index }) => ProductView(item, index)}
      />
      {/* <ScrollView onResponderEnd>
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
        </View>
      </ScrollView> */}
      {isLoading && <LoadingComponent />}
      {finished && <Text>~ end of catalogue ~</Text>}
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

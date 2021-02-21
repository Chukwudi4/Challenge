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
  const [limit] = useState(50);
  const [lastR, setLastR] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("price");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    onMount();
  }, []);

  const onMount = () => {
    setPage(1);
    fetchAndCacheProducts();
  };

  const fetchAndCacheProducts = async () => {
    setLoading(true);
    updateCache([]);
    fetchProducts(page, limit, selectedSort)
      .then((newProducts) => {
        setPage(page + 1);

        if (products.length === 0) {
          setProducts(newProducts);
        } else {
          updateCache(newProducts);
        }
        setFinished(newProducts.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Network error");
      });
  };

  const refreshProducts = () => {
    if (!isLoading) {
      const tempProducts = products.concat(cache);
      setProducts(tempProducts);
      fetchAndCacheProducts();
    }
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
          setProducts([]);
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
        contentContainerStyle={styles.flatListCOntainerStyle}
        numColumns={2}
        style={{
          width: "100%",
        }}
        onEndReached={() => {
          if (!finished) {
            refreshProducts();
          }
        }}
        renderItem={({ item, index }) => ProductView(item, index)}
      />
      {isLoading && <LoadingComponent />}
      {finished && !isLoading && <Text>~ end of catalogue ~</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  flatListCOntainerStyle: {
    // alignItems: "stretch",
  },
});

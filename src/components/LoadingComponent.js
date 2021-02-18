import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const LoadingComponent = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const x = setInterval(() => {
      dots.length < 5 ? setDots(`${dots}.`) : setDots(".");
    }, 1000);
    return () => {
      clearInterval(x);
    };
  });

  return <Text>Loading{dots}</Text>;
};

export default LoadingComponent;

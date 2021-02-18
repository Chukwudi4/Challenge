import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { formatPrice, formatTime } from "../api/formatter";

export default class ProductItem extends React.PureComponent {
  render() {
    const { index, product, r } = this.props;
    return (
      <>
        {index % 20 === 0 && index !== 0 && (
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: `http://192.168.0.156:3000/ads?r=${r}`,
            }}
          />
        )}
        <View>
          <Text style={{ fontSize: product.size }}>{product.face}</Text>
          <View>
            <Text>${formatPrice(product.price)}</Text>
            <Text>{formatTime(product.date)}</Text>
          </View>
        </View>
      </>
    );
  }
}

ProductItem.propTypes = {
  index: PropTypes.number,
  product: PropTypes.object,
};

import React from "react";
import { View, Text } from "react-native";
import Image from "react-native-fast-image";
import PropTypes from "prop-types";
import { formatPrice, formatTime } from "../api/formatter";
import { BASE_URL } from "../api/helper";

export default class ProductItem extends React.Component {
  componentDidMount() {
    const { r, updateR, index } = this.props;
    if (index & (20 === 0)) {
      updateR(r);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.product === this.props.product;
  }

  render() {
    const { index, product, r } = this.props;
    return (
      <>
        {index % 20 === 0 && index !== 0 && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `${BASE_URL}ads?r=${r}`,
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

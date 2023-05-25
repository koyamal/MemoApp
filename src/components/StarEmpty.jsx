import React, { useContext } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
// import { bool } from 'prop-types';

import Loading from './Loading';
import CircleStarButton from './CircleStarButton';
import { StarContext } from './provider/StarProvider';

export default function StarEmpty(/* props */) {
  const { isLoading } = useContext(StarContext);
  // const { isLoading } = props;
  return (
    <View style={starEmptyStyles.container}>
      <Loading isLoading={isLoading} />
      <View style={starEmptyStyles.inner}>
        <Text style={starEmptyStyles.title}>
          お気に入りのメモは0件です
        </Text>
        <Text style={starEmptyStyles.title}>
          お気に入りフィルタを解除してください
        </Text>
      </View>
      <CircleStarButton />
    </View>
  );
}

// StarEmpty.propTypes = {
//   isLoading: bool.isRequired,
// };

const starEmptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yello',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    alignSelf: 'center',
  },
});

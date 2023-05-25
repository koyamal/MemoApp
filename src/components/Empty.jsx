import React, { useContext } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { bool } from 'prop-types';

import Button from './Button';
import Loading from './Loading';
import { StarContext } from './provider/StarProvider';

export default function Empty(/* props */) {
  const { isLoading } = useContext(StarContext);
  // const { isLoading } = props;
  const navigation = useNavigation();
  return (
    <View style={emptyStyles.container}>
      <Loading isLoading={isLoading} />
      <View style={emptyStyles.inner}>
        <Text style={emptyStyles.title}>
          メモを作成しよう!
        </Text>
        <Button
          label="作成する"
          onPress={() => { navigation.navigate('MemoCreate'); }}
          style={emptyStyles.button}
        />
      </View>
    </View>
  );
}

// Empty.propTypes = {
//   isLoading: bool.isRequired,
// };

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});

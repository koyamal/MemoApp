import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { bool, func } from 'prop-types';

import Loading from './Loading';
import Star from './Star';

export default function StarEmpty(props) {
  const { isLoading, setOnlyStar, onlyStar } = props;
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
      <TouchableOpacity style={starStyles.button} onPress={() => { setOnlyStar(!onlyStar); }}>
        <Star
          isStar={onlyStar}
          name={['star', 'star']}
          size={40}
          color={['#FFCC00', '#ffffff']}
        />
      </TouchableOpacity>
    </View>
  );
}

StarEmpty.propTypes = {
  isLoading: bool.isRequired,
  setOnlyStar: func.isRequired,
  onlyStar: bool.isRequired,
};

const starStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 40,
    bottom: 40,
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});

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

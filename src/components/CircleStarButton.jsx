import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Star from './Star';
import { StarContext } from './provider/StarProvider';

export default function CircleStarButton() {
  console.log('CircleStarButton');
  const { setOnlyStar, onlyStar } = useContext(StarContext);

  return (
    <TouchableOpacity style={starStyles.button} onPress={() => { setOnlyStar(!onlyStar); }}>
      <Star
        isStar={onlyStar}
        name={['star', 'star']}
        size={40}
        color={['#FFCC00', '#ffffff']}
      />
    </TouchableOpacity>
  );
}

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

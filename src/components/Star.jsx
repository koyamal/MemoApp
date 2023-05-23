import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
  bool, string, arrayOf, number,
} from 'prop-types';

export default function Star(props) {
  const {
    isStar, size, color, name,
  } = props;
  return (
    <View>
      {
        isStar
          ? (<Entypo name={name[0]} size={size} color={color[0]} />)
          : (<Entypo name={name[1]} size={size} color={color[1]} />)
      }
    </View>
  );
}

Star.propTypes = {
  isStar: bool.isRequired,
  size: number.isRequired,
  color: arrayOf(string).isRequired,
  name: arrayOf(string).isRequired,
};

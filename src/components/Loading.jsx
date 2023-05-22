import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <View>
      <View>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    </View>
  );
}

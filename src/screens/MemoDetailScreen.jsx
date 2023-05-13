import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen() {
  return (
    <View style={styles.container}>
      <AppBar />

      <View>
        <Text>買い物リスト1</Text>
        <Text>2023年05月12日 10:00</Text>
      </View>

      <View>
        <Text>
          買い物リスト1
          testtesttesttesttesttesttest
          testtesttest
        </Text>
      </View>

      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

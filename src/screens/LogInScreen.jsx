import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';

import AppBar from '../components/AppBar';

export default function LogInScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View>
        <Text>Log In</Text>
        <TextInput value="Email Address" />
        <TextInput value="Password" />
        <View>
          <Text>Submit</Text>
        </View>
        <View>
          <Text>Not registered?</Text>
          <Text>Sign up here!</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'red',
  },
});

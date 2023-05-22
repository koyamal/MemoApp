import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, Text,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log(doc.id, data);
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
        },
        (error) => {
          console.log(error);
          Alert.alert('Load Data failed.');
        },
      );
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
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

  return (
    <View style={styles.container}>
      <Loading />
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

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

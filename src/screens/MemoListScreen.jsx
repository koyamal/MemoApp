import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, Text, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Loading from '../components/Loading';
import Star from '../components/Star';
import Empty from '../components/Empty';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onlyStar, setOnlyStar] = useState(false);

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
      setIsLoading(true);
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (onlyStar) {
              if (data.isStar) {
                console.log(doc.id, data);
                userMemos.push({
                  id: doc.id,
                  bodyText: data.bodyText,
                  updatedAt: data.updatedAt.toDate(),
                  isStar: data.isStar,
                });
              }
            } else {
              console.log(doc.id, data);
              userMemos.push({
                id: doc.id,
                bodyText: data.bodyText,
                updatedAt: data.updatedAt.toDate(),
                isStar: data.isStar,
              });
            }
          });
          setMemos(userMemos);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          console.log(error);
          Alert.alert('Load Data failed.');
        },
      );
    }
    return unsubscribe;
  }, [onlyStar]);

  if (memos.length === 0 && onlyStar) {
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

  if (memos.length === 0 && !onlyStar) {
    return (
      <Empty isLoading={isLoading} />
    );
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
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

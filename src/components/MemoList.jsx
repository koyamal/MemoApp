import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';
import firebase from 'firebase';

import { dateToString } from '../utils';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            ref.delete()
              .catch(() => {
                Alert.alert('削除に失敗しました');
              });
          },
        },
      ]);
    }
  }
  function toggleStar(item) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(item.id);
      ref.set({
        isStar: !item.isStar,
      }, { merge: true })
        .then(() => {
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  }
  function renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
      >
        <View style={styles.memoLeft}>
          <View style={styles.memoStar}>
            {
              item.isStar
                ? (
                  <TouchableOpacity onPress={() => { toggleStar(item); }}>
                    <Entypo name="star" size={24} color="#FFCC00" />
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity onPress={() => { toggleStar(item); }}>
                    <Entypo name="star-outlined" size={24} color="#B0B0B0" />
                  </TouchableOpacity>
                )
            }
          </View>
          <View>
            <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
            <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { deleteMemo(item.id); }}
        >
          <Feather
            name="x"
            size={16}
            color="#B0B0B0"
          />
        </TouchableOpacity>

      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memoDelete: {
    paddingRight: 27,
  },
  memoStar: {
    padding: 8,
  },
});

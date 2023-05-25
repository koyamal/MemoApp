import React, { memo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, SectionList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';
import firebase from 'firebase';

import { dateToString, toggleStar } from '../utils';
import Star from './Star';

function MemoList(props) {
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
  function renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
      >
        <View style={styles.memoLeft}>
          <View style={styles.memoStar}>
            <TouchableOpacity onPress={() => { toggleStar(item); }}>
              <Star
                isStar={item.isStar}
                name={['star', 'star-outlined']}
                size={24}
                color={['#FFCC00', '#B0B0B0']}
              />
            </TouchableOpacity>
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
  function renderHeader(section) {
    if (section.data.length === 0) {
      return null;
    }
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {
            title: 'Star',
            data: memos.filter((item) => item.isStar),
          },
          {
            title: 'Nomal',
            data: memos.filter((item) => !item.isStar),
          },
        ]}
        renderItem={({ item }) => renderItem(item)}
        renderSectionHeader={({ section }) => renderHeader(section)}
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

export default memo(MemoList);

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default ({text, onPress}) => {
  return (
    <View onPress={onPress} style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
    lineHeight: 40,
  },
  box: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginVertical: 4,
    marginHorizontal: 8,
  },
});

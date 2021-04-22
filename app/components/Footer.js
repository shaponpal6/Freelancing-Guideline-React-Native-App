import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  column: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 100,
  },
});

export default ({children}) => <View style={styles.column}>{children}</View>;

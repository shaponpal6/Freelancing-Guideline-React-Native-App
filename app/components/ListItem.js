import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

function ListItem({data, onPress, index}) {
  const doPageView = () => {
    return onPress('contentPage', data);
  };
  return (
    <TouchableOpacity onPress={doPageView}>
      <View style={styles.list}>
        <View style={styles.box}>
          <TouchableHighlight style={styles.circle} underlayColor="#ccc">
            <Text style={styles.circleText}>{index + 1}</Text>
          </TouchableHighlight>
          <Text style={styles.text}>{data.title ?? 'No Title'}</Text>
        </View>
        <Text style={styles.line}></Text>
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(26, 115, 232, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    color: '#fff',
    fontSize: 18,
  },

  text: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'left',
    color: '#333',
    margin: 0,
  },
  line: {
    height: 1,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#333',
  },
});

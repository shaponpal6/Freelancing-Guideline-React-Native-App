import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

export default class Navigator extends Component {
  render() {
    const title = this.props.title ?? '';
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.props.onBack.bind(this)}>
          <Image
            style={styles.icon}
            source={require('../../src/assets/icons8-left-50.png')}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          {title.length > 22 ? title.substring(0, 21) + '...' : title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  header: {
    elevation: 8,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#4285f4',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 4,
  },
  info: {},
});

import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';

const Content = ({text}) => {
  return (
    <View>
      <Text style={styles.description}>{text}</Text>
    </View>
  );
};

export default Content;

export const Title = ({text}) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};
export const List = ({text}) => {
  const str = text.split('|');
  return (
    <>
      {str && str.length && (
        <View style={styles.listBox}>
          {str.map((item, index) => {
            return (
              <View key={'k' + index} style={styles.list}>
                <Text style={styles.listItemSymbal}>&#10146;</Text>
                <Text style={styles.listItem}>{item.trim()}</Text>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

export const H1 = ({text}) => {
  return (
    <View>
      <Text style={styles.h1}>{text}</Text>
    </View>
  );
};
export const H2 = ({text}) => {
  return (
    <View>
      <Text style={styles.h2}>{text}</Text>
    </View>
  );
};
export const H4 = ({text}) => {
  return (
    <View>
      <Text style={styles.h4}>{text}</Text>
    </View>
  );
};

export const Photo = ({url}) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />
    </View>
  );
};
export const Loading = ({url}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={{fontSize: 24}}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
  h1: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  h2: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  h4: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  listBox: {
    marginTop: 8,
  },
  list: {
    width: '100%',
    marginTop: 2,
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  listItemSymbal: {
    width: 14,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    width: '100%',
    height: '100%',
  },
});

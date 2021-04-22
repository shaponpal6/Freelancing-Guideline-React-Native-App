import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import Content, {
  Title,
  Photo,
  H1,
  H2,
  H4,
  List,
  Loading,
} from '../components/Content';
import Footer from '../components/Footer';

export default function PageScreen({content}) {
  const [state, setState] = useState({loading: true});
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const cat = content.cat ?? '';
    const id = content.id ?? '';
    getListFromApiAsync(cat, id);
    return () => setIsMounted(false);
  }, []);

  const getListFromApiAsync = (cat, id) =>
    fetch(
      'https://raw.githubusercontent.com/shaponpal6/freelancing-guideline-api/main/data/' +
        cat +
        '/' +
        id +
        '.json',
    )
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((responseJson) => {
        let data = {};
        try {
          data = JSON.parse(responseJson);
        } catch (err) {
          data['error'] = JSON.stringify(err);
        }
        if (isMounted) setState({result: data, loading: false});
      })
      .catch((error) => {
        if (isMounted) setState({result: [], loading: false});
      });

  if (state.loading) {
    return <Loading />;
  }

  const randerContent = (content) => {
    if (content && content.length) {
      return content.map((item, index) => {
        if (item.type === 'title')
          return <Title key={'fg-' + index} text={item.text} />;
        if (item.type === 'content')
          return <Content key={'fg-' + index} text={item.text} />;
        if (item.type === 'h1')
          return <H1 key={'fg-' + index} text={item.text} />;
        if (item.type === 'h2')
          return <H2 key={'fg-' + index} text={item.text} />;
        if (item.type === 'h4')
          return <H4 key={'fg-' + index} text={item.text} />;
        if (item.type === 'image')
          return <Photo key={'fg-' + index} url={item.text} />;
        if (item.type === 'list')
          return <List key={'fg-' + index} text={item.text} />;
        if (item.type === 'one')
          return <Content key={'fg-' + index} text={item.text} />;
      });
    }
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <ActivityIndicator />
        <View style={styles.body}>
          {state.result && state.result.content ? (
            randerContent(state.result.content)
          ) : (
            <Text>No Content</Text>
          )}
        </View>
        <Footer></Footer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
});

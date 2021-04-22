import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

import Footer from '../components/Footer';

import ListItem from '../components/ListItem';
import AppCard from '../components/AppCard';

import {Loading} from '../components/Content';

const onPageContentHandeler = (item, doNavigation) => {
  doNavigation('contentPage', {content: item}, item.title);
};

const Item = ({item, doNavigation, index}) => (
  <ListItem
    onPress={() => onPageContentHandeler(item, doNavigation)}
    data={item}
    index={index}
  />
);

function ListScreen({listPage, doNavigation}) {
  const [state, setState] = useState({loading: true});
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const cat = listPage.id ?? '';
    getListFromApiAsync(cat);
    return () => setIsMounted(false);
  }, []);

  const getListFromApiAsync = (cat) =>
    fetch(
      'https://raw.githubusercontent.com/shaponpal6/freelancing-guideline-api/main/data/' +
        cat +
        '/posts.json',
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

  const renderItem = ({item, index}) => (
    <Item index={index} item={item} doNavigation={doNavigation} />
  );

  const getHeader = () => {
    return <AppCard text={listPage.title ?? ''} />;
  };

  const getFooter = () => {
    return <Footer></Footer>;
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={state.result && state.result.length ? state.result : []}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={getHeader}
      ListFooterComponent={getFooter}
    />
  );
}

export default ListScreen;

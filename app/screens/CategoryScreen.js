import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {Loading} from '../components/Content';

import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import Footer from '../components/Footer';

// import menus from '../../src/store/menus';

const onCategoryClickHandler = (item, doNavigation) => {
  doNavigation('listPage', {listPage: item}, item.title);
};

const Item = ({item, doNavigation}) => (
  <AppButton
    onPress={() => onCategoryClickHandler(item, doNavigation)}
    text={item.title}
  />
);

function CategoryScreen({doNavigation}) {
  const [state, setState] = useState({
    result: [],
    loading: true,
  });
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    getListFromApiAsync();
    return () => setIsMounted(false);
  }, []);

  const getListFromApiAsync = () =>
    fetch(
      'https://raw.githubusercontent.com/shaponpal6/freelancing-guideline-api/main/data/category.json',
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

  const renderItem = ({item}) => (
    <Item title={item.title} item={item} doNavigation={doNavigation} />
  );

  const getHeader = () => {
    return <AppCard text="FREELANCING GUIDELINE" />;
  };

  const getFooter = () => {
    return <Footer></Footer>;
  };

  return (
    <>
      <FlatList
        data={state.result}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
      />
    </>
  );
}

export default CategoryScreen;

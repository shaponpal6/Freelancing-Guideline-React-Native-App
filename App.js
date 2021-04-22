import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import CategoryScreen from './app/screens/CategoryScreen';
import Navigator from './app/screens/Navigator';
import ContentPageScreen from './app/screens/ContentPageScreen';
import ListScreen from './app/screens/ListScreen';
import HomeScreen from './app/screens/HomeScreen';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'home',
      title: 'Freelancing Categories',
      catPage: {},
      listPage: {},
      content: {},
      pageContext: {},
      isConnected: true,
      unsubscribe: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.state.unsubscribe = NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.state.unsubscribe();
    // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({isConnected: isConnected});
  };

  handleBackButtonClick(e) {
    this.onBackButtonClick();
    return true;
  }
  doNavigation(page, data = {}, content = '') {
    if (!!this.state.isConnected) {
      this.setState((previousState, currentProps) => {
        return {
          ...previousState,
          page: page,
          pageContext: data,
          ...data,
          title: content,
        };
      });
    } else {
      Alert.alert(
        'You have disconnected. Please check your internet connection and try again.',
      );
    }
  }
  onBackButtonClick() {
    if (!!this.state.isConnected) {
      this.setState((previousState, currentProps) => {
        // condition here
        let targetPage,
          targetPageTitle = '';
        switch (previousState.page) {
          case 'home':
            targetPage = 'category';
            BackHandler.exitApp();
            break;
          case 'category':
            targetPage = 'home';
            targetPageTitle = 'Home';
            break;
          case 'listPage':
            targetPage = 'category';
            targetPageTitle = 'Freelancing Categories';
            break;
          case 'contentPage':
            targetPage = 'listPage';
            targetPageTitle = previousState.listPage.title ?? '';
            break;
          default:
            targetPage = '';
        }
        if (targetPage !== '') {
          return {
            ...previousState,
            page: targetPage,
            title: targetPageTitle,
          };
        }
      });
    } else {
      Alert.alert(
        'You have disconnected. Please check your internet connection and try again.',
      );
    }
  }

  render() {
    const image = {
      uri:
        'https://raw.githubusercontent.com/shaponpal6/freelancing-guideline-api/main/assets/bg11.jpg',
    };

    return (
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#4285f4a6"
          networkActivityIndicatorVisible={true}
        />
        <SafeAreaView>
          {this.state.page !== 'home' && (
            <Navigator
              onBack={this.onBackButtonClick.bind(this)}
              title={this.state.title}
            />
          )}

          <ImageBackground source={image} style={styles.image}>
            {this.state.page === 'home' && (
              <HomeScreen doNavigation={this.doNavigation.bind(this)} />
            )}

            {this.state.page === 'category' && (
              <CategoryScreen
                catPage={this.state.catPage}
                doNavigation={this.doNavigation.bind(this)}
              />
            )}
            {this.state.page === 'listPage' && (
              <ListScreen
                doNavigation={this.doNavigation.bind(this)}
                listPage={this.state.listPage}
                pageContext={this.state.pageContext}
              />
            )}
            {this.state.page === 'contentPage' && (
              <ContentPageScreen
                doNavigation={this.doNavigation.bind(this)}
                content={this.state.content}
                pageContext={this.state.pageContext}
              />
            )}
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

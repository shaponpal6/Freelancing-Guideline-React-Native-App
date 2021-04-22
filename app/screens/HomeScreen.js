import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

const HomeScreen = ({doNavigation}) => {
  const image = {
    uri:
      'https://raw.githubusercontent.com/shaponpal6/freelancing-guideline-api/main/assets/bg1.jpg',
  };
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.body}>
            <View style={styles.center}>
              <View style={styles.banner}>
                <Image
                  style={styles.icon}
                  source={require('../../src/assets/two.png')}
                />
              </View>
              <Text style={styles.title}>
                ULTIMATE GUIDELINE TO BECOME A BETTER FREELANCER AND EARN MORE
              </Text>
              <Text style={styles.subTitle}>
                Get Ultimate Guide to launch your independent career, become a
                better freelancer, and get more freelance jobs
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableHighlight
                style={{
                  // height: 40,
                  width: 160,
                  borderRadius: 10,
                  backgroundColor: 'yellow',
                  color: '#111',
                  marginLeft: 50,
                  marginRight: 50,
                  marginTop: 20,
                }}>
                <Button
                  style={styles.btn}
                  color="orange"
                  accessibilityLabel="Click Here To Start"
                  onPress={() =>
                    doNavigation('category', '', 'Freelancing Categories')
                  }
                  title="START NOW"
                />
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  body: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    width: 300,
    height: 220,
    marginBottom: 30,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  header: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    textAlign: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f1f1f1',
  },
  footer: {
    marginBottom: '10%',
  },
  btn: {
    fontSize: 32,
    padding: 20,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: '#09E55A',
  },
});

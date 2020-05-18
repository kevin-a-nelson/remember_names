import React from 'react';
import { Container, Text, Footer, FooterTab, Button, Icon, View, Spinner } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppTabs from './components/AppTabs'
import { ADD_SOMEONE, MY_LISTS, SIGN_IN } from './globals'

import Signin from './components/Signin'
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      activeTab: ADD_SOMEONE,
      signedin: false,
      userId: -1,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    const userId = await AsyncStorage.getItem('userId')
    console.log(userId)
    this.setState({ userId })
    this.setState({ isReady: true });
  }


  setActiveTab(activeTab) {
    this.setState({ activeTab })
  }

  setSignedin(signedin) {
    this.setState({ signedin })
  }

  setUserId(userId) {
    this.setState({ userId })
  }

  setIsReady(isReady) {
    this.setState({ isReady })
  }

  render() {


    if (!this.state.isReady) {
      return (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Spinner color='blue' />
        </View>
      )
    }

    if (!this.state.signedin && this.state.userId === -1) {
      return <Signin
        setSignedin={this.setSignedin.bind(this)}
        setUserId={this.setUserId.bind(this)}
        setIsReady={this.setIsReady.bind(this)}
      />;
    }

    return (
      <Container>
        <Container style={{ paddingTop: 40 }}>
          <AppTabs
            activeTab={this.state.activeTab}
            setActiveTab={this.setActiveTab.bind(this)}
            userId={this.state.userId}
          ></AppTabs>
        </Container>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.setActiveTab(ADD_SOMEONE)} >
              <Icon name="search" />
              <Text>Add Someone</Text>
            </Button>
            <Button onPress={() => this.setActiveTab(MY_LISTS)} >
              <Icon name="apps" />
              <Text>My Lists</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container >
    );
  }
}

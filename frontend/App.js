import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppTabs from './components/AppTabs'
import { ADD_SOMEONE, MY_LISTS, SIGN_IN } from './globals'

import Signin from './components/Signin'

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

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    if (!this.state.signedin) {
      return <Signin
        setSignedin={this.setSignedin.bind(this)}
        setUserId={this.setUserId.bind(this)}
      />;
    }

    return (
      <Container>
        <Text>{this.state.userId}</Text>
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

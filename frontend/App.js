import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppTabs from './components/AppTabs'
import { ADD_SOMEONE, MY_LISTS } from './globals'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      activeTab: ADD_SOMEONE,
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

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Container style={{ paddingTop: 40 }}>
          <AppTabs
            activeTab={this.state.activeTab}
            setActiveTab={this.setActiveTab.bind(this)}
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

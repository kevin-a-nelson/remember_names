import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppTabs from './components/AppTabs'
import { FIND_SOMEONE, MY_LISTS } from './globals'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      activeTab: FIND_SOMEONE,
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

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Container style={{ paddingTop: 40 }}>
          <AppTabs
            activeTab={this.state.activeTab}
          ></AppTabs>
        </Container>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.setState({ activeTab: FIND_SOMEONE })} >
              <Icon name="search" />
              <Text>Add Someone</Text>
            </Button>
            <Button onPress={() => this.setState({ activeTab: MY_LISTS })} >
              <Icon name="apps" />
              <Text>My Lists</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container >
    );
  }
}

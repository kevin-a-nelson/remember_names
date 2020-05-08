import React, { Component } from 'react';
import { Text, Button, View, Container, Item, Content, Input, Grid, Col } from 'native-base'

import { MY_LISTS } from '../globals'

import { postData } from '../services'

export default class NewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newListTitle: ""
        }
    }

    async onEnter() {
        await postData(`http://10.42.214.208:3000/groups`, {
            user_id: 10,
            title: this.state.newListTitle
        })
        await this.props.fetchGroups()
        this.props.setActiveTab(MY_LISTS)
    }

    render() {

        return (
            <Container>
                <Content>
                    <View style={{ paddingBottom: 15, paddingHorizontal: 20 }}>
                        <Item regular>
                            <Input placeholder="Enter Text Here"
                                onChangeText={newListTitle => this.setState({ newListTitle })}
                            />
                        </Item>
                        <Button
                            style={{ width: 85, marginTop: 15 }}
                            onPress={this.onEnter.bind(this)}>
                            <Text>Enter</Text>
                        </Button>
                        <Button
                            warning
                            style={{ width: 91, marginTop: 15 }}
                            onPress={() => this.props.setActiveTab(MY_LISTS)}>
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}
import React, { Component } from 'react';
import { Text, Button, View, Container, Item, Content, Input, Grid, Col } from 'native-base'

import { MY_LISTS, BASE_URL } from '../globals'

import { putData, deleteData } from '../services'

export default class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newListTitle: ""
        }
    }

    async onEnter() {
        await putData(`${BASE_URL}/groups/${this.props.list.id}`, {
            user_id: this.props.userId,
            title: this.state.newListTitle
        })
        await this.props.fetchGroups()
        this.props.setActiveTab(MY_LISTS)
    }

    async onDelete() {
        await deleteData(`${BASE_URL}/groups/${this.props.list.id}`)
        await this.props.fetchGroups()
        this.props.setActiveTab(MY_LISTS)
    }

    render() {

        const { list } = this.props

        return (
            <Container>
                <Content>
                    <View style={{ paddingBottom: 15, paddingHorizontal: 20 }}>
                        <Item regular>
                            <Input placeholder={list.title}
                                onChangeText={newListTitle => this.setState({ newListTitle })}
                            />
                        </Item>
                        <Button
                            style={{ width: 91, marginTop: 15 }}
                            onPress={this.onEnter.bind(this)}>
                            <Text>  Save</Text>
                        </Button>
                        <Button
                            warning
                            style={{ width: 91, marginTop: 15 }}
                            onPress={() => this.props.setActiveTab(MY_LISTS)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button
                            danger
                            style={{ width: 91, marginTop: 15 }}
                            onPress={this.onDelete.bind(this)}>
                            <Text>DELETE</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}
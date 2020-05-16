import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, ActionSheet } from 'native-base';
import { deleteData } from '../services'

import { BASE_URL } from '../globals'

export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async removePersonFromList() {
        await deleteData(`${BASE_URL}/people-groups`, {
            person_id: this.props.person.id,
            group_id: this.props.groupId
        })
        this.props.removePerson(this.props.person)
    }

    render() {

        const { person } = this.props
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail
                        square
                        source={{ uri: person.thumbnail }}
                    />
                </Left>
                <Body>
                    <Text>
                        {person.title}
                    </Text>
                    <Text
                        note
                    >
                        {person.email}
                    </Text>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={this.removePersonFromList.bind(this)}
                    >
                        <Text>Remove</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}

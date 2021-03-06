import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, ActionSheet } from 'native-base';

import { postData } from '../services'

import { BASE_URL, PERSON_DETAIL } from '../globals'

export default class PersonWithAddBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showActionSheet() {
        ActionSheet.show(
            {
                options: this.props.buttons,
                cancelButtonIndex: this.props.buttons.length - 1,
                title: "Add Person to list"
            },
            buttonIndex => {
                const person_id = this.props.person.id
                const group_id = this.props.buttons[buttonIndex].id
                postData(`${BASE_URL}/people-groups`, { person_id, group_id })
            }
        )
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
                        onPress={this.showActionSheet.bind(this)}
                    >
                        <Text>Add</Text>
                    </Button>
                </Right>
            </ListItem>

        );
    }
}

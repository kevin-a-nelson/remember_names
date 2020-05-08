import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, ActionSheet } from 'native-base';

import { postData } from '../services'

export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // console.log(this.props.buttons)
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
                postData(`http://10.42.214.208:3000/people-groups`, { person_id, group_id })
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

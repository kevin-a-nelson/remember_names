import React, { Component } from 'react';
import { Text, Container, Header, Content, List, ListItem } from 'native-base'
import EditList from './EditList'

export default class EditListsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    lists() {

        return this.props.groups.map(group => {
            return (
                <EditList
                    key={group.id}
                    group={group}
                />
            )
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.lists()}
                    </List>
                </Content>
            </Container>
        )
    }
}
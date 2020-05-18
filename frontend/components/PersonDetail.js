

import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Container, Header, Content, List, ListItem, Text } from 'native-base'

export default class PersonDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { person } = this.props

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Text>{person.title}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{person.class_year}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{person.majior}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{person.country} {person.state}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{person.email}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({

})
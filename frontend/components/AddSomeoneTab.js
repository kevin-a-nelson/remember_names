import React, { Component } from 'react';
import { Container, Content, Item, Input, Text, List, Button, View, ActionSheet, Root } from 'native-base';
import PersonWithAddBtn from './PersonWithAddBtn'
import TestComponent from './TestComponent'
import { TextComponent } from 'react-native';


var BUTTONS = [
    { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
    { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
    // { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class MyLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tempSearch: "",
        }
    }
    people() {

        if (this.props.people == []) {
            return []
        }

        if (this.state.search == "") {
            return []
        }

        const filteredPeople = this.props.people.filter(person => person.title.includes(this.state.search))

        return filteredPeople.map(person => (
            <PersonWithAddBtn
                person={person}
                key={person.id}
                buttons={this.props.buttons}
            >
            </PersonWithAddBtn>
        ))
    }

    render() {
        return (
            <Root>
                <Container>
                    <Content>
                        <View style={{ paddingBottom: 15, paddingHorizontal: 20 }}>
                            <Item regular>
                                <Input placeholder="Find Someone By Name"
                                    onChangeText={tempSearch => this.setState({ tempSearch })}
                                />
                            </Item>
                            <View style={{ marginTop: 15 }}>
                                <Button
                                    style={{ width: 85 }}
                                    primary
                                    onPress={() => this.setState({ search: this.state.tempSearch })}>
                                    <Text>Enter</Text>
                                </Button>
                            </View>
                        </View>
                        <List>
                            {this.people()}
                        </List>
                    </Content>
                </Container>
            </Root>
        )
    }
}
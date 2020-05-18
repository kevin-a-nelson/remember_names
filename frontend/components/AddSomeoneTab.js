import React, { Component } from 'react';
import { Container, Content, Item, Input, Text, List, Button, View, Root, Spinner } from 'native-base';
import PersonWithAddBtn from './PersonWithAddBtn'
import People from './People'

export default class MyLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tempSearch: "",
            searching: false,
            filteredPeople: []
        }
    }
    getNewPeople() {

        if (this.props.people == []) {
            return []
        }

        if (this.state.search == "") {
            return []
        }

        const filteredPeople = this.props.people.filter(person => person.title.toLowerCase().includes(this.state.search.toLowerCase()))

        this.setState({ filteredPeople })
    }

    onEnter() {
        this.getNewPeople()
    }

    render() {
        return (
            <Root>
                <Container>
                    <Content>
                        <View style={{ paddingBottom: 15, paddingHorizontal: 20 }}>
                            <Item regular>
                                <Input placeholder="Find Someone By Name"
                                    onChangeText={search => this.setState({ search })}
                                    value={this.state.search}
                                />
                            </Item>
                            <View style={{ marginTop: 15 }}>
                                <Button
                                    style={{ width: 85 }}
                                    primary
                                    onPress={this.onEnter.bind(this)}>
                                    <Text>Enter</Text>
                                </Button>
                            </View>
                        </View>
                        <People
                            people={this.state.filteredPeople}
                            buttons={this.props.buttons}
                        />
                    </Content>
                </Container>
            </Root>
        )
    }
}
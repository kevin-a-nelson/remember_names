import React, { Component } from 'react';
import { Container, Content, Item, Input, Text, List, Button, View, Root, Spinner } from 'native-base';
import PersonWithAddBtn from './PersonWithAddBtn'


export default class MyLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tempSearch: "",
            searching: false,
        }
    }
    people() {

        if (this.props.people == []) {
            return []
        }

        if (this.state.search == "") {
            return []

        }
        const filteredPeople = this.props.people.filter(person => person.title.toLowerCase().includes(this.state.search.toLowerCase()))

        return filteredPeople.map(person => (
            <PersonWithAddBtn
                person={person}
                key={person.id}
                buttons={this.props.buttons}
            >
            </PersonWithAddBtn>
        ))
    }

    onEnter() {
        this.setState({ searching: true })
        this.setState({ search: this.state.tempSearch })
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
                                    value={this.state.tempSearch}
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

                        {
                            this.state.searching ?
                                <Spinner />
                                :
                                null
                        }

                        {

                            this.state.searching ?
                                <Spinner />
                                :
                                <List>
                                    {this.people()}
                                </List>
                        }
                    </Content>
                </Container>
            </Root>
        )
    }
}
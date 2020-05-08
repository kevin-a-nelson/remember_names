import React, { Component } from "react";
import { Container, Content, Icon, Picker, Form, View, Button, Text, List } from "native-base";
import PersonWithRemoveBtn from './PersonWithRemoveBtn'

export default class PickerTextAndItemStyleExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            people: []
        };
    }

    componentDidMount() {
    }

    fetchPeople(groupId) {
        fetch(`http://10.42.214.208:3000/groups/${groupId}/people`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    people: responseJson,
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    onValueChange(value) {
        console.log(value)
        this.setState({ selected: value })
        this.fetchPeople(value)
    }

    people() {

        return this.state.people.map(person => (
            <PersonWithRemoveBtn
                person={person}
                key={person.id}
                groupId={this.state.selected}
                fetchPeople={this.fetchPeople.bind(this)}
            >
            </PersonWithRemoveBtn>
        ))
    }


    pickerItems() {
        return this.props.groups.map(group => (
            <Picker.Item label={group.title} value={group.id} key={group.id} />
        ))
    }
    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginHorizontal: 20, marginBottom: 15 }}>
                        <View style={{ borderWidth: 1, borderColor: '#eee' }}>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select your SIM"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Select your SIM"
                                    textStyle={{ color: "#5cb85c" }}
                                    itemStyle={{
                                        backgroundColor: "#d3d3d3",
                                        marginLeft: 0,
                                        paddingLeft: 10
                                    }}
                                    itemTextStyle={{ color: '#788ad2' }}
                                    style={{ width: undefined }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    {this.pickerItems()}
                                </Picker>
                            </Form>
                        </View>
                        <Button style={{ width: 115, marginTop: 15 }}>
                            <Text>Edit Lists</Text>
                        </Button>
                    </View>
                    <List>
                        {this.people()}
                    </List>
                </Content>
            </Container >
        );
    }
}
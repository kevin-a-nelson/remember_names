import React, { Component } from "react";
import { Container, Content, Icon, Picker, Form, View, Button, Text, List, Grid, Col } from "native-base";
import PersonWithRemoveBtn from './PersonWithRemoveBtn'
import { EDIT_LIST, NEW_LIST } from '../globals'

export default class PickerTextAndItemStyleExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        };
    }



    componentDidMount() {
        this.props.setSelectedListId(undefined)
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

    async onValueChange(value) {
        await this.props.setSelectedListId(value)
        this.fetchPeople(value)
    }

    people() {

        if (!this.props.selectedListId) {
            return
        }

        return this.state.people.map(person => (
            <PersonWithRemoveBtn
                person={person}
                key={person.id}
                groupId={this.props.selectedListId}
                fetchPeople={this.fetchPeople.bind(this)}
            >
            </PersonWithRemoveBtn>
        ))
    }


    pickerItems() {

        let pickerItems = this.props.groups.map(group => (
            <Picker.Item label={group.title} value={group.id} key={group.id} />
        ))

        pickerItems.unshift(
            <Picker.Item label="-- Select a List -- " value={undefined} key={-1} />
        )

        return pickerItems
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
                                    selectedValue={this.props.selectedListId}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    {this.pickerItems()}
                                </Picker>
                            </Form>
                        </View>
                        <Grid style={{ width: 180 }}>
                            <Col>
                                <Button
                                    disabled={this.props.selectedListId == undefined}
                                    style={{ width: 70, marginTop: 15 }}
                                    onPress={() => this.props.setActiveTab(EDIT_LIST)}
                                >
                                    <Text>Edit</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    success
                                    style={{ width: 70, marginTop: 15 }}
                                    onPress={() => this.props.setActiveTab(NEW_LIST)}
                                >
                                    <Text>New</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                    <List>
                        {this.people()}
                    </List>
                </Content>
            </Container >
        );
    }
}
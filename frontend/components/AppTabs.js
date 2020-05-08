import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Text, List, Button, View, Grid, Col, Row, Footer, FooterTab, Icon } from 'native-base';
import Person from './PersonWithRemoveBtn'
import MyListsTab from './MyListsTab'
import { FIND_SOMEONE, MY_LISTS } from '../globals'
import AddSomeoneTab from './AddSomeoneTab'

export default class MyTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            search: "",
            tempSearch: "",
            activeTab: FIND_SOMEONE,
            groups: [],
        };
    }

    fetchPeople() {
        fetch('http://10.42.214.208:3000/people', {
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

    fetchGroups() {
        fetch('http://10.42.214.208:3000/groups', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    groups: responseJson,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount = () => {
        this.fetchPeople()
        this.fetchGroups()
    }

    buttons() {

        let buttons = this.state.groups.map(group => {
            return {
                text: group.title, id: group.id
            }
        })

        buttons.push({
            text: "Cancel", icon: "close", iconColor: "#25de5b"
        })

        console.log(buttons)

        return buttons
    }

    render() {


        switch (this.props.activeTab) {
            case FIND_SOMEONE: return (
                <AddSomeoneTab
                    people={this.state.people}
                    buttons={this.buttons()}
                />
            )
            case MY_LISTS: return (
                <MyListsTab
                    groups={this.state.groups}
                />
            )
        }

        return (
            <Text> ERROR</Text >
        );
    }
}
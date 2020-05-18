import React, { Component } from 'react';
import { Text } from 'native-base';
import Person from './PersonWithRemoveBtn'
import MyListsTab from './MyListsTab'
import { ADD_SOMEONE, MY_LISTS, EDIT_LIST, NEW_LIST, BASE_URL, SIGN_IN, PERSON_DETAIL } from '../globals'
import AddSomeoneTab from './AddSomeoneTab'
import EditList from './EditList'
import NewList from './NewList'
import PersonDetail from './PersonDetail'
import Signin from './Signin'
import { AsyncStorage } from 'react-native';
import { getData } from '../services'

export default class MyTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            search: "",
            tempSearch: "",
            activeTab: ADD_SOMEONE,
            groups: [],
            selectedListId: undefined,
            selectedList: undefined,
            selectedPerson: {}
        };
    }


    fetchPeople() {
        fetch(`${BASE_URL}/people`, {
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
        fetch(`${BASE_URL}/groups/user-id/${this.props.userId}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    groups: responseJson,
                    // selectedListId: responseJson[0].id
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount = () => {
        AsyncStorage.setItem('userId', this.props.userId.toString())
        this.fetchPeople()
        this.fetchGroups()
    }

    buttons() {

        let buttons = []

        if (this.state.groups.length >= 1) {
            buttons = this.state.groups.map(group => {
                return {
                    text: group.title, id: group.id
                }
            })
        }

        buttons.push({
            text: "Cancel", icon: "close", iconColor: "#25de5b"
        })

        return buttons
    }

    setSelectedListId(selectedListId) {
        this.setState({ selectedListId })
    }

    setSelectedPerson(selectedPerson) {

        this.setState({ selectedPerson })
    }

    render() {

        let list = []
        if (this.state.groups.length >= 1) {

            list = this.state.groups.filter(group => (
                group.id == this.state.selectedListId
            ))
        }

        switch (this.props.activeTab) {

            case SIGN_IN: return (
                <Text>Hello WOrld</Text>
            )

            case ADD_SOMEONE: return (
                <AddSomeoneTab
                    people={this.state.people}
                    buttons={this.buttons()}
                />
            )

            case MY_LISTS: return (
                <MyListsTab
                    groups={this.state.groups}
                    setActiveTab={this.props.setActiveTab.bind(this)}
                    setSelectedListId={this.setSelectedListId.bind(this)}
                    selectedListId={this.state.selectedListId}
                    setSelectedPerson={this.setSelectedPerson.bind(this)}
                />
            )

            case EDIT_LIST: return (
                <EditList
                    setActiveTab={this.props.setActiveTab.bind(this)}
                    list={list[0]}
                    userId={this.props.userId}
                    fetchGroups={this.fetchGroups.bind(this)}
                />
            )

            case NEW_LIST: return (
                <NewList
                    setActiveTab={this.props.setActiveTab.bind(this)}
                    fetchGroups={this.fetchGroups.bind(this)}
                    userId={this.props.userId}
                />
            )

            case PERSON_DETAIL: return (
                <PersonDetail
                    person={this.state.selectedPerson}
                />
            )
        }

        return (
            <Text> ERROR</Text >
        );
    }
}
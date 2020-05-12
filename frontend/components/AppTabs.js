import React, { Component } from 'react';
import { Text } from 'native-base';
import Person from './PersonWithRemoveBtn'
import MyListsTab from './MyListsTab'
import { ADD_SOMEONE, MY_LISTS, EDIT_LIST, NEW_LIST, BASE_URL } from '../globals'
import AddSomeoneTab from './AddSomeoneTab'
import EditList from './EditList'
import NewList from './NewList'

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
            selectedList: undefined
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
        fetch(`${BASE_URL}/groups`, {
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

        return buttons
    }

    setSelectedListId(selectedListId) {
        this.setState({ selectedListId })
    }


    render() {

        const list = this.state.groups.filter(group => (
            group.id == this.state.selectedListId
        ))

        switch (this.props.activeTab) {

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
                />
            )

            case EDIT_LIST: return (
                <EditList
                    setActiveTab={this.props.setActiveTab.bind(this)}
                    list={list[0]}
                    fetchGroups={this.fetchGroups.bind(this)}
                />
            )

            case NEW_LIST: return (
                <NewList
                    setActiveTab={this.props.setActiveTab.bind(this)}
                    fetchGroups={this.fetchGroups.bind(this)}
                />
            )
        }

        return (
            <Text> ERROR</Text >
        );
    }
}
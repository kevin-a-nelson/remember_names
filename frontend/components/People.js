

import React, { Component } from 'react'
import { View, Text, Spinner } from 'native-base'
import PersonWithAddBtn from './PersonWithAddBtn'


export default class People extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                {
                    this.props.people.map(person => (
                        <PersonWithAddBtn
                            person={person}
                            key={person.id}
                            buttons={this.props.buttons}
                        >
                        </PersonWithAddBtn>
                    ))
                }
            </View>
        )

    }
} 
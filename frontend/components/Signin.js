import React, { Component } from "react";
import { Text, Button, View, Container } from "native-base"
import * as Google from 'expo-google-app-auth';
import Expo from 'expo'
import { androidClientId } from '../keys'

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedin: false,
            name: "George"
        }
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: androidClientId,
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });

            console.log(result.user)

            if (result.type === 'success') {
                this.setState({
                    signedin: true,
                    name: result.user.name,

                })
                return result.accessToken;
            } else {
                console.log('cancelled')
            }
        } catch (e) {
            console.log('error')
        }
    }

    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <Button onPress={this.signInWithGoogleAsync.bind(this)}>
                    <Text>Signin</Text>
                </Button>
                <Text>{this.state.name}</Text>
                <Text>
                    {this.state.signedin ? "Signed In" : "Logged Out"}
                </Text>
            </Container>
        )
    }
}
import React, { Component } from "react";
import { Text, Button, View, Container } from "native-base"
import * as Google from 'expo-google-app-auth';
import Expo from 'expo'
import { androidClientId } from '../keys'
import { getData, postData } from '../services'
import { BASE_URL } from '../globals'

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedin: false,
            name: "George"
        }
    }

    async signInWithGoogleAsync() {
        // try {
        const result = await Google.logInAsync({
            androidClientId: androidClientId,
            // iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
        });

        console.log("1")

        if (result.type === 'success') {
            this.props.setSignedin(true)
            let user = await getData(`${BASE_URL}/users/google_id/${result.user.id}`)
            console.log(user)
            console.log("User", user)
            if (!user.id) {
                const data = {
                    title: result.user.name,
                    google_id: result.user.id
                }
                console.log(data)
                await postData(`${BASE_URL}/users`, data)
                user = await getData(`${BASE_URL}/users/google_id/${result.user.id}`)
            }
            this.props.setUserId(user.id)
            return result.accessToken;
        } else {
            console.log('cancelled')
        }
        // } catch (e) {
        //     console.log('error')
        // }
    }

    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <Button onPress={this.signInWithGoogleAsync.bind(this)}>
                    <Text>Sign in with Google</Text>
                </Button>
            </Container>
        )
    }
}
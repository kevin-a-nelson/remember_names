import React, { Component } from "react";
import { Text, Button, View, Container, Icon } from "native-base"
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


        if (result.type === 'success') {

            let user = await getData(`${BASE_URL}/users/google_id/${result.user.id}`)
            if (!user.id) {
                const data = {
                    title: result.user.name,
                    google_id: result.user.id
                }

                await postData(`${BASE_URL}/users`, data)
                user = await getData(`${BASE_URL}/users/google_id/${result.user.id}`)
            }
            await this.props.setUserId(user.id)
            this.props.setSignedin(true)
            return result.accessToken;
        } else {
            console.log('cancelled')
        }
    }

    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <View style={{ marginVertical: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={this.signInWithGoogleAsync.bind(this)} iconLeft style={{ width: 250, paddingRight: 10 }}>
                        <Icon name='logo-google' />
                        <Text>Sign in with Google</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export class SignIn extends Component {
  state = {
    visibel: true,
    email: '',
    password: '',
    loading: false,
  };
  SignIn = () => {
    const {email, password} = this.state;
    const url = 'https://api-shop1.herokuapp.com/api/login';
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        const {token} = resjson;
        if (token) {
          AsyncStorage.setItem('token', token);
          console.log(token);
          this.setState({loading: false});
          this.props.navigation.replace('Home');
        } else if (resjson.error) {
          alert(resjson.error);
          this.setState({loading: false});
        } else {
          console.log(error);
          this.setState({loading: false});
        }
      });
  };
  pindah = () => {
    this.props.navigation.navigate('Register');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#087cbf',
              width: '100%',
              height: 250,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                borderRadius: 50,
                alignSelf: 'center',
                top: 50,
              }}>
              <Image
                style={{width: 70, height: 70, alignSelf: 'center', padding: 5}}
                source={require('../../Assets/ApaAja.png')}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              height: 380,
              borderRadius: 35,
              bottom: 70,
              alignSelf: 'center',
              elevation: 3,
            }}>
            <View>
              <View
                style={{
                  marginTop: 40,
                  marginLeft: 30,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: '90%',
                    borderRadius: 30,
                    paddingHorizontal: 5,
                  }}>
                  <TextInput
                    keyboardType="email-address"
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 7,
                  marginBottom: 30,
                  marginLeft: 30,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: '90%',
                    borderRadius: 30,
                    paddingHorizontal: 5,
                  }}>
                  <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    secureTextEntry={this.state.visibel}
                    onChangeText={(text) => this.setState({password: text})}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#2f83f9',
                borderRadius: 25,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
                height: 40,
              }}
              onPress={() => this.SignIn()}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="red" />
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#fcf8f8',
                  }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                alignSelf: 'center',
              }}>
              <Text>New User?</Text>
              <Text
                style={{color: '#65a3fb', marginLeft: 5}}
                onPress={() => this.pindah()}>
                Sign Up
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SignIn;

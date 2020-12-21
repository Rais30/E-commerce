import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

class Splas extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log('tidak ada token');
      }
    });
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.state.token != '') {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Splash');
      }
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4b91e7',
        }}>
        <View>
          <Image
            source={require('../../Assets/ApaAja.png')}
            style={{width: 200, height: 200}}
          />
        </View>
        <View>
          <Text style={{fontSize: 30}}> siSinjang </Text>
        </View>
      </View>
    );
  }
}

export default Splas;

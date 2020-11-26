import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TextInput} from 'react-native';

export class CheckOut extends Component {
  constructor() {
    super();
    this.state = {
      alamt: '',
      nomer: '',
      token: '',
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View>
        <View style={styles.boxTampildata}>
          <View>
            <View style={styles.boksProduk}>
              <View style={styles.viewImage}>
                <Image
                  source={require('../../Assets/baju.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.viewTeks}>
                <Text>Baju baru Batik</Text>
                <Text>Rp 123.000</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  boxTampildata: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boksProduk: {
    width: 170,
    height: 270,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    paddingTop: 5,
    paddingTop: 5,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
  },
  viewImage: {
    alignItems: 'center',
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
});

export default CheckOut;

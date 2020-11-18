import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxProfil';

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      photo: '',
      data: '',
    };
  }

  Profil() {
    const url = 'https://api-shop1.herokuapp.com/api/member';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson.user[0]);
        this.setState({data: resJson.user[0]});
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.Profil();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  LogOut() {
    AsyncStorage.clear();
    this.props.navigation.replace('Home');
  }
  render() {
    return (
      <View style={styles.viewUtama}>
        <View style={styles.viewHeader}>
          <Text style={{fontSize: 20}}> Akun Profil </Text>
        </View>
        <View style={styles.viewScroll}>
          {this.state.token == '' ? (
            <View style={styles.loginRegister}>
              <View style={styles.BoxImage}>
                <Image
                  source={require('../../Assets/Image.png')}
                  style={{width: 70, height: 70}}
                />
              </View>
              <View style={styles.posisenLogin}>
                <View style={styles.boxLoginRegister}>
                  <Button
                    title="MASUK"
                    onPress={() => this.props.navigation.navigate('Login')}
                  />
                </View>
                <View style={styles.boxLoginRegister}>
                  <Button
                    title="DAFTAR"
                    onPress={() => this.props.navigation.navigate('Register')}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.viewUtama}>
              <View style={styles.backView1}>
                <View style={styles.fotoProfile}>
                  <Image
                    source={{uri: this.state.data.foto}}
                    style={styles.Image}
                  />
                </View>
                <View>
                  <View style={styles.dataDiri}>
                    <Text style={{fontSize: 20}}>{this.state.data.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.backView2}>
                <View style={styles.dataMember}>
                  <Icon name="email" size={35} />
                  <View style={styles.dataText}>
                    <Text>{this.state.data.email} </Text>
                  </View>
                </View>
                <View style={styles.dataMember}>
                  <Icon name="call" size={35} />
                  <View style={styles.dataText}>
                    <Text>{this.state.data.nomer} </Text>
                  </View>
                </View>
                <View style={styles.dataMember}>
                  <Icon name="location-on" size={35} />
                  <View style={styles.dataText}>
                    <Text>{this.state.data.alamat} </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.dataMember}
                  onPress={() => this.props.navigation.navigate('AddProduct')}>
                  <Icon name="control-point" size={35} />
                  <View style={styles.dataText}>
                    <Text>Tambah Barang </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.LogOut()}
                  style={{
                    ...styles.dataMember,
                    width: 90,
                    justifyContent: 'center',
                    backgroundColor: 'red',
                  }}>
                  <View style={styles.dataText}>
                    <Text>LogOut </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Profil;

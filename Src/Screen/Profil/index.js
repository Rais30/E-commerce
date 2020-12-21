import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxProfil';

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      photo: '',
      data: '',
      produk: [],
      loading: false,
    };
  }

  Profil() {
    const url = 'https://api-shop1.herokuapp.com/api/member';
    this.setState({loading: true});
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
        this.setState({data: resJson.user[0]});
        this.setState({produk: resJson.data, loading: false});
        console.log(this.state.produk);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
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
    this.props.navigation.replace('Home', {screen: 'Profil'});
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
                  source={require('../../Assets/ApaAja.png')}
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
            <ScrollView>
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
                  <View style={styles.dataMember}>
                    <Icon
                      name="portrait"
                      size={35}
                      onPress={() =>
                        this.props.navigation.navigate('EditProfil', {
                          item: this.state.data,
                        })
                      }
                    />
                    <View style={styles.dataText}>
                      <Text>Edit Profils</Text>
                    </View>
                  </View>
                  <View style={styles.dataMember}>
                    <Icon
                      name="portrait"
                      size={35}
                      onPress={() => this.props.navigation.navigate('Konfir')}
                    />
                    <View style={styles.dataText}>
                      <Text>Konfirmasi Pembelian </Text>
                    </View>
                  </View>
                  <View style={styles.dataProduk}>
                    <Icon
                      name="store"
                      size={35}
                      onPress={() =>
                        this.props.navigation.navigate('AddProduct')
                      }
                    />
                    <View style={styles.dataText}>
                      <Text>Toko Saya</Text>
                    </View>
                    <ScrollView horizontal>
                      {this.state.data == '' ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text>Tidak Ada Barang Yang Anda Jual</Text>
                        </View>
                      ) : (
                        <View style={styles.boxTampildata}>
                          {this.state.produk.map((val, key) => {
                            return (
                              <View key={key}>
                                <TouchableOpacity
                                  style={styles.boksProduk}
                                  onPress={() =>
                                    this.props.navigation.navigate('Edit', {
                                      item: val,
                                    })
                                  }>
                                  <View style={styles.viewImage}>
                                    <Image
                                      source={{uri: val.gambar}}
                                      style={styles.image}
                                    />
                                  </View>
                                  <View style={styles.viewTeks}>
                                    <Text>{val.nama}</Text>
                                    <Text>{'Rp ' + val.harga}</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </ScrollView>
                  </View>
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
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

export default Profil;

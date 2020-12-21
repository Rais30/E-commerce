import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxKeranjang';

class Keranjang extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
    };
  }
  keranjang = () => {
    const url = 'https://api-shop1.herokuapp.com/api/keranjang';
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
        console.log(resJson.pesanan_detail);
        this.setState({data: resJson.pesanan_detail});
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  Delete = () => {
    const url = `https://api-shop1.herokuapp.com/api/keranjang/${this.state.data[0].id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        this.keranjang();
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          this.keranjang();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={styles.viewUtama}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Keranjang </Text>
        </View>

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
          <View style={{flex: 1}}>
            {this.state.data == null ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text> Data Tidak Tersedia </Text>
                <Text> Harap Periksa Internet Anda </Text>
              </View>
            ) : (
              <>
                <ScrollView style={{flex: 1}}>
                  <View style={styles.boxTampildata}>
                    {this.state.data.map((val, key) => (
                      <View key={key} style={styles.boksProduk}>
                        <TouchableOpacity>
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
                          <View style={styles.viewTeks}>
                            <Text>Jumlah : {val.jumlah_produk}</Text>
                            <Text>Harga : Rp {val.jumlah_harga_produk}</Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.Delete()}>
                              <Icon name="delete" size={45} />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: '#38ACEC',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 0,
                    position: 'absolute',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'CheckOut',

                      this.keranjang(),
                    )
                  }>
                  <Text> Buat Pesanan </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Keranjang;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxKeranjang';

class Keranjang extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
    };
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
        console.log(this.state.data[0].id);
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

  render() {
    return (
      <View style={styles.viewUtama}>
        <ScrollView>
          {this.state.data == null ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text> Data Tidak Tersedia </Text>
              <Text> Harap Periksa Internet Anda </Text>
            </View>
          ) : (
            <View style={styles.boxTampildata}>
              {this.state.data.map((val, key) => {
                return (
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
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('CheckOut', {
                              item: val,
                            })
                          }>
                          <Icon name="home" size={45} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Keranjang;

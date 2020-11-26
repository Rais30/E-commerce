import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';

export class CheckOut extends Component {
  constructor() {
    super();
    this.state = {
      produk: [],
      alamat: '',
      nomer: '',
      token: '',
      loading: false,
    };
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('token ada');
        this.tambpilData();
      } else {
        console.log('token tidak ada');
      }
    });
  }

  tambpilData() {
    const url = 'https://api-shop1.herokuapp.com/api/checkout';
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
        this.setState({produk: resJson.pesanan_detail});
        console.log(this.state.produk);
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }

  NewPesanan() {
    const {alamat, nomer} = this.state;
    if (alamat && nomer != '') {
      const Data = {
        alamat: alamat,
        nomer: nomer,
      };
      fetch('https://api-shop1.herokuapp.com/api/checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`,
        },
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log(response);
          alert('Data diambahkan!');
          this.props.navigation.replace('History');
        })
        .catch((error) => {
          console.log('Erro ', error);
          alert('Gagal Membuat Pesanan');
        });
    } else {
      alert('Monhon Pertiksa Kemabali Data yang anda Isi');
    }
  }

  render() {
    return (
      <View>
        {this.state.produk == '' ? (
          <View>
            <ActivityIndicator color="red" size={30} />
          </View>
        ) : (
          <View style={styles.boxTampildata}>
            <View style={styles.boksProduk}>
              {this.state.produk.map((val, key) => {
                return (
                  <View key={key}>
                    <View style={styles.viewImage}>
                      <Image source={{uri: val.gambar}} style={styles.image} />
                    </View>
                    <View style={styles.viewTeks}>
                      <Text>{val.nama}</Text>
                      <Text>{'Rp ' + val.harga}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View>
              <View style={{backgroundColor: 'white'}}>
                <TextInput
                  placeholder="Alamat"
                  onChangeText={(text) => this.setState({alamat: text})}
                />
              </View>
              <View style={{backgroundColor: 'white'}}>
                <TextInput
                  placeholder="nomer"
                  keyboardType="number-pad"
                  onChangeText={(text) => this.setState({nomer: text})}
                />
              </View>
            </View>
            <View>
              <Button title="buat pesanan" onPress={() => this.NewPesanan()} />
            </View>
          </View>
        )}
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
    flexWrap: 'wrap',
  },
  boksProduk: {
    width: '100%',
    height: 270,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 5,
    paddingTop: 5,
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

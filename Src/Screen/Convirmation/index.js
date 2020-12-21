import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export class Convirmation extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
    };
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log(token);
        this.getKonfir();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  getKonfir = () => {
    const url = 'https://api-shop1.herokuapp.com/api/konfirmasi';
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
        console.log(resJson.pesanan_detail);
        this.setState({
          data: resJson.pesanan_detail,
          loading: false,
        });
        console.log(this.state.data[0].id);
      })
      .catch((error) => {
        console.log(resJson);
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };
  konfir = (id) => {
    const idh = id;
    const url = `https://api-shop1.herokuapp.com/api/konfirmasi/${idh}`;
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
        console.log(resJson);
        this.getKonfir();
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };
  statusBarang(status, id) {
    if (status == '1') {
      return (
        <View style={styles.textKonfrim}>
          <View>
            <Text> Alamat = {this.state.data[0].alamat}</Text>
          </View>
          <View>
            <Text>Nomer = {this.state.data[0].nomer} </Text>
          </View>
          <Text style={styles.konfir}> Menunggu Konfirmasi </Text>
          <Button title="Konfirmasi" onPress={() => this.konfir(id)} />
        </View>
      );
    } else if (status == '2') {
      return (
        <View style={styles.textKonfrim}>
          <View>
            <Text> Alamat = {this.state.data[0].alamat}</Text>
          </View>
          <View>
            <Text>Nomer = {this.state.data[0].nomer} </Text>
          </View>
          <Text style={{color: 'blue'}}> Pesanan Dalam Pengiriman </Text>
        </View>
      );
    } else if (status == '3') {
      return (
        <View style={styles.textKonfrim}>
          <Text style={{color: 'green'}}>
            Pesanan Telah Diterima Oleh Pembeli
          </Text>
        </View>
      );
    }
  }
  Alamat() {
    if (this.state.data[0].status == '1') {
      return (
        <View>
          <View>
            <Text>{this.state.data[0].harga}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Konfirmasi </Text>
        </View>
        <ScrollView>
          {this.state.data == '' ? (
            <View>
              <ActivityIndicator color="red" size={30} />
              <Text>belum ada Barang yang di Beli</Text>
            </View>
          ) : (
            <View
              style={{
                // flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key}>
                    <View style={styles.boksProduk}>
                      <View style={styles.viewImage}>
                        <Image
                          source={{uri: val.gambar}}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.viewTeks}>
                        <Text>{val.nama}</Text>
                        <Text>{'Rp ' + val.jumlah_harga}</Text>
                      </View>
                      <View>{this.statusBarang(val.status, val.id)}</View>
                    </View>
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

const styles = StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  boksProduk: {
    width: 370,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    // alignItems: 'center',
    // paddingTop: 5,
    marginLeft: 7,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 130,
  },
  viewImage: {
    alignItems: 'center',
    borderRadius: 5,
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1589FF',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  textKonfrim: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  konfir: {
    color: 'red',
  },
});
export default Convirmation;

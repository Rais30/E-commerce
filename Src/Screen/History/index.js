import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';

export class History extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
      statusBarang: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log(token);
        this.history();
      } else {
        console.log('token tidak ada');
      }
    });
  }

  history() {
    console.log('mulai historys');
    const url = 'https://api-shop1.herokuapp.com/api/history';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({
          data: resJson.pesanan_detail,
        });
        console.log(this.state.data[0].id);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  konfir = (id) => {
    const idH = id;
    const url = `https://api-shop1.herokuapp.com/api/konfirmasiPembeli/${id}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        console.log(this.state.data.status);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };

  statusBarang(status, id) {
    if (status == '1') {
      return (
        <View>
          <Text> Pesanan Anda Sedang DIkemas </Text>
        </View>
      );
    } else if (status == '2') {
      return (
        <View>
          <Text>Sedang Dalam Pengiriman</Text>
          <Button title="Diterima" onPress={() => this.konfir(id)} />
        </View>
      );
    } else if (status == '3') {
      return (
        <View>
          <Text> Pesanan Telah Diterima </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.Box}>
        <View style={styles.header}>
          <Text style={styles.Tittel}>History</Text>
        </View>
        <ScrollView contentContainerStyle={styles.viewUtama}>
          <View>
            {this.state.token == '' ? (
              <View>
                <Text> Harap LogIn terlebih Dahulu</Text>
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
                        onPress={() =>
                          this.props.navigation.navigate('Register')
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <>
                {this.state.data == '' ? (
                  <View>
                    <ActivityIndicator color="red" size={30} />
                  </View>
                ) : (
                  <View style={styles.viewUtama}>
                    {this.state.data.map((val, key) => {
                      return (
                        <View key={key}>
                          <TouchableOpacity
                            style={styles.boksProduk}
                            onPress={() =>
                              this.props.navigation.navigate('Detail', {
                                item: val.pesanan_id,
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
                            <View>{this.statusBarang(val.status, val.id)}</View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Box: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1589FF',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  viewUtama: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  boxTampildata: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
  },
  boksProduk: {
    width: 170,
    height: 270,
    backgroundColor: 'white',
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
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
  loginRegister: {
    width: '90%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 90,
    marginLeft: 18,
    elevation: 10,
  },
  BoxImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    top: 50,
    borderWidth: 7,
    borderColor: '#3462f9',
    marginTop: -95,
    borderWidth: 7,
    margin: 5,
  },
  posisenLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  boxLoginRegister: {
    width: '40%',
    height: 50,
    margin: 5,
    borderRadius: 20,
  },
});
export default History;

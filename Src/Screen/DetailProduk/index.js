import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxDetail';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      jumlah_produk: 0,
      modal: false,
      loading: false,
      token: '',
    };
  }

  produk = () => {
    const url =
      `https://api-shop1.herokuapp.com/api/produk/` +
      this.props.route.params.item;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({data: resJson.data, loading: false});
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };

  keranjang = () => {
    const {jumlah_produk} = this.state;
    const url = `https://api-shop1.herokuapp.com/api/keranjang/${this.props.route.params.item}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({jumlah_produk: jumlah_produk}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        const {status} = resjson;
        if (status == 'success') {
          this.setState({modal: false});
          this.props.navigation.replace('Home', {screen: 'Keranjang'});
        } else {
          console.log('error');
          this.setState({loading: false});
        }
      })
      .catch((err) => {
        console.log('Terjadi kesalahan. ' + err);
      });
  };
  jumlah_produk = () => {
    this.setState({jumlah_produk: this.state.jumlah_produk + 1});
  };
  kurang = () => {
    this.setState({jumlah_produk: this.state.jumlah_produk - 1});
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != '') {
        this.setState({token: value, data: this.props.route.params.item});
        this.produk();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  login() {
    this.setState({modal: false});
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.viewUtama}>
        <ScrollView style={styles.viewUtama}>
          {this.state.data == null ? (
            <View>
              <Text>memuat</Text>
            </View>
          ) : (
            <View>
              <View>
                <Image
                  source={{uri: this.state.data.gambar}}
                  style={styles.gamabrProduk}
                />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textHarga}>Rp {this.state.data.harga}</Text>
              </View>
              <View style={styles.viewText}>
                <Text style={{textAlign: 'right'}}>
                  Jumlah Barang :{this.state.data.stok}
                </Text>
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textNama}>{this.state.data.nama}</Text>
              </View>
              <View style={styles.viewtextDetail}>
                <View style={{marginBottom: 10}}>
                  <Text style={styles.textDetail}> Deskripsi </Text>
                </View>
                <View>
                  <Text>{this.state.data.descripsi}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <Modal
          style={{flex: 1}}
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}>
          <View style={styles.viewModal}>
            <View style={styles.isiModal}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.viewText}>
                  <Text style={styles.textModal}>
                    Rp {this.state.data.harga}
                  </Text>
                </View>
                <View>
                  <View style={{marginTop: 10}}>
                    <Icon
                      name="add"
                      size={25}
                      onPress={() => this.jumlah_produk()}
                    />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text>{this.state.jumlah_produk}</Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Icon
                      name="remove"
                      size={25}
                      onPress={() => this.kurang()}
                    />
                  </View>
                </View>
              </View>
              <View>
                {this.state.token == null ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.login()}>
                    <Icon name="add-shopping-cart" size={30} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.keranjang()}>
                    <Icon name="add-shopping-cart" size={30} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{marginLeft: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.setState({modal: true})}>
              <Icon name="add-shopping-cart" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                this.props.navigation.navigate('Message', {
                  item: this.state.data.user_id,
                })
              }>
              <Icon name="message" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;

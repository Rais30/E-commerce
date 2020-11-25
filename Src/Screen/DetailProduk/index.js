import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxDetail';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      jumlah_produk: 0,
      modal: false,
      loading: false,
    };
    AsyncStorage.getItem('token').then((value) => {
      if (value != '') {
        this.setState({token: value, data: this.props.route.params.item});
        console.log(this.state.data.id);
      } else {
        console.log('token tidak ada');
      }
    });
  }
  keranjang = () => {
    const {jumlah_produk} = this.state;
    const url = `https://api-shop1.herokuapp.com/api/keranjang/${this.state.data.id}`;
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
          this.setState({loading: false});
          this.props.navigation.replace('Home', {screen: 'Keranjang'});
        } else {
          console.log('error');
          this.setState({loading: false});
        }
      })
      .catch((err) => console.log('Terjadi kesalahan. ' + err));
  };
  jumlah_produk = () => {
    this.setState({jumlah_produk: this.state.jumlah_produk + 1});
  };
  kurang = () => {
    this.setState({jumlah_produk: this.state.jumlah_produk - 1});
  };

  render() {
    return (
      <View style={styles.viewUtama}>
        <ScrollView style={styles.viewUtama}>
          <View>
            <Image
              source={{uri: this.props.route.params.item.gambar}}
              style={styles.gamabrProduk}
            />
          </View>
          <View style={styles.viewText}>
            <Text style={styles.textHarga}>
              Rp {this.props.route.params.item.harga}
            </Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{textAlign: 'right'}}>
              Jumlah Barang :{this.props.route.params.item.stok}
            </Text>
          </View>
          <View style={styles.viewText}>
            <Text style={styles.textNama}>
              {this.props.route.params.item.nama}
            </Text>
          </View>
          <View style={styles.viewtextDetail}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.textDetail}> Deskripsi </Text>
            </View>
            <View>
              <Text>{this.props.route.params.item.descripsi}</Text>
            </View>
          </View>
          <View></View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 350,
                backgroundColor: 'white',
                borderRadius: 5,
                height: 150,
                // flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.viewText}>
                  <Text style={{fontSize: 17, color: 'red'}}>
                    Rp {this.props.route.params.item.harga}
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
              </View>
            </View>
          </View>
        </Modal>

        <View>
          <View>
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
        </View>
      </View>
    );
  }
}

export default Detail;

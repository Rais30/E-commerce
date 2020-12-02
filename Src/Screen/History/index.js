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
  history = () => {
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
        console.log(resJson);
        this.setState({
          data: resJson.pesanan_detail,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };
  konfir = (id) => {
    const idH = id;
    const url = `https://api-shop1.herokuapp.com/api/konfirmasiPembeli/${idH}`;
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
      <ScrollView contentContainerStyle={styles.viewUtama}>
        {this.state.data == null ? (
          <View>
            <ActivityIndicator color="red" size={30} />
          </View>
        ) : (
          <>
            {this.state.data.map((val, key) => {
              return (
                <View key={key}>
                  <TouchableOpacity
                    style={styles.boksProduk}
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {item: val})
                    }>
                    <View style={styles.viewImage}>
                      <Image source={{uri: val.gambar}} style={styles.image} />
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
          </>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
});
export default History;

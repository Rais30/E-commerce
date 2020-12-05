import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxBelanja';

class Pencarian extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: '',
      datahasilInput: [],
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.mencari();
  }
  mencari = () => {
    const url = 'https://api-shop1.herokuapp.com/api/produk';
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

  belanja = () => {
    const url = `https://api-shop1.herokuapp.com/api/produk/${this.state.dataInput}/cari`;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        const {status} = resJson;
        if (status == 'success') {
          this.setState({datahasilInput: resJson.data, loading: false});
          console.log(this.state.data);
        } else if (status == 'failed') {
          ToastAndroid.show(
            ' Produk Tidak Tersedia',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log('data tidak ada '),
          );
        }
      })
      .catch((error) => {
        console.log('error Apa ? ' + error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewUtama}>
          <View style={styles.input}>
            <TextInput
              placeholder="Pencarian"
              onChangeText={(text) => this.setState({dataInput: text})}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <Icon name="search" size={40} onPress={() => this.belanja()} />
          </View>
        </View>
        <ScrollView>
          {this.state.datahasilInput == '' ? (
            <View>
              {this.state.data == '' ? (
                <View>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              ) : (
                <View style={styles.boxTampildata}>
                  {this.state.data.map((val, key) => {
                    return (
                      <View key={key}>
                        <TouchableOpacity
                          style={styles.boksProduk}
                          onPress={() =>
                            this.props.navigation.navigate('Detail', {
                              item: val.id,
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
            </View>
          ) : (
            <View style={styles.boxTampildata}>
              {this.state.datahasilInput.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={styles.boksProduk}
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {
                          item: val.id,
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
    );
  }
}

export default Pencarian;

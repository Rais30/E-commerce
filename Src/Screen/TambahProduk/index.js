import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      nama: '',
      harga: '',
      ukuran: '',
      stok: '',
      berat: '',
      foto: '',
      descripsi: '',
      tag_id: '',
      token: '',
      loading: false,
    };
  }
  TambahBarang = () => {
    const {
      nama,
      harga,
      ukuran,
      stok,
      berat,
      foto,
      descripsi,
      tag_id,
    } = this.state;
    const url = 'https://api-shop1.herokuapp.com/api/member';
    const data = {
      nama: nama,
      harga: harga,
      ukuran: ukuran,
      stok: stok,
      berat: berat,
      descripsi: descripsi,
      tag_id: tag_id,
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(foto, data),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.token) {
          ToastAndroid.show(
            ' Berasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson.token),
          );
          this.setState({loading: false});
          this.props.navigation.navigate('Login');
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error is' + error);
      });
  };
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('foto', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({foto: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.TambahBarang();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            top: 50,
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.foto !== '' ? (
              <Image
                source={{uri: this.state.foto.uri}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginVertical: 15,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Upload an Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text> Barang Baru </Text>
        <TextInput
          placeholder="Nama Barang"
          value={this.state.namaBarang}
          onChangeText={(teks) => this.setState({nama: teks})}
        />
        <TextInput
          placeholder="Harga"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({harga: teks})}
        />
        <TextInput
          placeholder="Ukuran"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({ukuran: teks})}
        />
        <TextInput
          placeholder="Stok"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({stok: teks})}
        />
        <TextInput
          placeholder="Berat"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({berat: teks})}
        />
        <TextInput
          placeholder="Descripsi"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({descripsi: teks})}
        />
        <TextInput
          placeholder="Kategori"
          value={this.state.barang}
          onChangeText={(teks) => this.setState({tag_id: teks})}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2f83f9',
            borderRadius: 25,
            width: '50%',
            alignSelf: 'center',
            marginTop: 40,
            height: 40,
          }}
          onPress={() => this.TambahBarang()}>
          {this.state.loading ? (
            <ActivityIndicator size={25} color="red" />
          ) : (
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fcf8f8'}}>
              Tambah Produk
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddProduct;

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
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import styles from '../../Components/BoxTambahProduk';

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
          this.props.navigation.navigate('Home');
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
      <View style={styles.viewUtama}>
        <View style={styles.viewHeader}>
          <Text style={styles.taksHeader}> Tambah Barang </Text>
        </View>
        <ScrollView style={{flex: 1, width: '100%', height: 800}}>
          <View style={styles.viewText}>
            <View style={styles.viewFoto}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.handleChoosePhoto()}>
                {this.state.foto !== '' ? (
                  <Image
                    source={{uri: this.state.foto.uri}}
                    style={styles.Image}
                  />
                ) : (
                  <View style={styles.textImage}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Upload an Image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.viewInput}>
              <Text> Nama Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Barang"
                  value={this.state.namaBarang}
                  onChangeText={(teks) => this.setState({nama: teks})}
                />
              </View>
              <Text> Harga Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Harga"
                  keyboardType="number-pad"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({harga: teks})}
                />
              </View>
              <Text> Ukuran Barang " Cm " : </Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Ukuran"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({ukuran: teks})}
                />
              </View>
              <Text> Stok Brang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Stok"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({stok: teks})}
                />
              </View>
              <Text> Berat Barang " Kg ":</Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Berat"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({berat: teks})}
                />
              </View>
              <Text> Descripsi Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Descripsi"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({descripsi: teks})}
                />
              </View>
              <Text> Kategori Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Kategori"
                  value={this.state.barang}
                  onChangeText={(teks) => this.setState({tag_id: teks})}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.klikTambah}
                onPress={() => this.TambahBarang()}>
                {this.state.loading ? (
                  <ActivityIndicator size={25} color="red" />
                ) : (
                  <Text style={styles.textTambah}>Tambah Produk</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AddProduct;

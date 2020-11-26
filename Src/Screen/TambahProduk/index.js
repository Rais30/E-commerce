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
      photo: '',
      descripsi: '',
      tag_id: '',
      token: '',
      loading: false,
    };
  }

  NewProduct() {
    const {
      nama,
      harga,
      ukuran,
      stok,
      photo,
      descripsi,
      tag_id,
      berat,
    } = this.state;
    if (nama && harga && ukuran && stok && photo && descripsi && tag_id != '') {
      const todo = {
        nama: nama,
        harga: harga,
        ukuran: ukuran,
        stok: stok,
        descripsi: descripsi,
        tag_id: tag_id,
        berat: berat,
      };
      fetch('https://api-shop1.herokuapp.com/api/member', {
        method: 'POST',
        body: this.createFormData(photo, todo),
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('Upload succes.', response);
          alert('Data ditambahkan!');
          this.props.navigation.replace('Home', {screen: 'Profil'});
        })
        .catch((error) => {
          console.log('Upload error', error);
          alert('Gagal ditambahkan');
        });
    } else {
      alert('Isi dengan benar');
    }
  }

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
        this.setState({photo: response});
        console.log(this.state.photo);
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('token ada');
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
                {this.state.photo !== '' ? (
                  <Image
                    source={{uri: this.state.photo.uri}}
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
                  onChangeText={(teks) => this.setState({nama: teks})}
                />
              </View>
              <Text> Harga Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Harga"
                  keyboardType="number-pad"
                  onChangeText={(teks) => this.setState({harga: teks})}
                />
              </View>
              <Text> Ukuran Barang " Cm " : </Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Ukuran"
                  onChangeText={(teks) => this.setState({ukuran: teks})}
                />
              </View>
              <Text> Stok Brang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Stok"
                  onChangeText={(teks) => this.setState({stok: teks})}
                />
              </View>
              <Text> Berat Barang " Kg ":</Text>
              <View style={styles.boxInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Berat"
                  onChangeText={(teks) => this.setState({berat: teks})}
                />
              </View>
              <Text> Descripsi Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Descripsi"
                  onChangeText={(teks) => this.setState({descripsi: teks})}
                />
              </View>
              <Text> Kategori Barang :</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Kategori"
                  onChangeText={(teks) => this.setState({tag_id: teks})}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.klikTambah}
                onPress={() => this.NewProduct()}>
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

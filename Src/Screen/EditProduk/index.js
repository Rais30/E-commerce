import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxDetail';
import styles1 from '../../Components/BoxTambahProduk';
import ImagePicker from 'react-native-image-picker';

class EditProduk extends Component {
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
      data: {},
      token: '',
      jumlah: 0,
      modal: false,
    };
  }

  Edit = () => {
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
    const url =
      'https://api-shop1.herokuapp.com/api/member/' +
      this.props.route.params.item.id;
    const data = {
      nama: nama,
      harga: harga,
      ukuran: ukuran,
      stok: stok,
      berat: berat,
      descripsi: descripsi,
      tag_id: tag_id,
      _method: 'PUT',
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
        if (resJson.status == 'success') {
          console.log(resJson.message);
          this.setState({loading: false});
          this.props.navigation.navigate('Home');
        } else {
          this.setState({loading: false});
          console.log('Update error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error is' + error);
      });
  };

  Delet() {
    const url =
      'https://api-shop1.herokuapp.com/api/member/' +
      this.props.route.params.item.id;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        const {status} = resJson;
        if (status == 'success') {
          console.log(resJson.message);
          this.props.navigation.replace('Home');
        } else {
          console.log('tidak berasil mengahapus');
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
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
        this.setState({foto: response});
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != '') {
        this.setState({token: value, data: this.props.route.params.item});
        console.log(this.state.data);
      } else {
        console.log('token tidak ada');
      }
    });
  }

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
          <ScrollView style={{flex: 1, width: '100%', height: 800}}>
            <View style={styles1.viewText}>
              <View style={{...styles1.viewFoto, width: 300, height: 130}}>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => this.handleChoosePhoto()}>
                  {this.state.foto !== '' ? (
                    <Image
                      source={{uri: this.state.foto.uri}}
                      style={{...styles1.Image, width: 280, height: 110}}
                    />
                  ) : (
                    <View
                      style={{...styles1.textImage, width: 280, height: 110}}>
                      <Image
                        source={{uri: this.props.route.params.item.gambar}}
                        style={{
                          ...styles.gamabrProduk,
                          width: 280,
                          height: 110,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles1.viewInput}>
                <Text> Nama Barang :</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    value={this.state.namaBarang}
                    onChangeText={(teks) => this.setState({nama: teks})}
                  />
                </View>
                <Text> Harga Barang :</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({harga: teks})}
                  />
                </View>
                <Text> Ukuran Barang " Cm " : </Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({ukuran: teks})}
                  />
                </View>
                <Text> Stok Brang :</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({stok: teks})}
                  />
                </View>
                <Text> Berat Barang " Kg ":</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({berat: teks})}
                  />
                </View>
                <Text> Descripsi Barang :</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({descripsi: teks})}
                  />
                </View>
                <Text> Kategori Barang :</Text>
                <View style={styles1.boxInput}>
                  <TextInput
                    value={this.state.barang}
                    onChangeText={(teks) => this.setState({tag_id: teks})}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles1.klikTambah}
                  onPress={() => this.Edit()}>
                  {this.state.loading ? (
                    <ActivityIndicator size={25} color="red" />
                  ) : (
                    <Text style={styles1.textTambah}>Edit Barang</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: '50%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.Delet()}>
            <Icon name="delete" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#4CC417',
              width: '50%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.setState({modal: true})}>
            <Icon name="create" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default EditProduk;

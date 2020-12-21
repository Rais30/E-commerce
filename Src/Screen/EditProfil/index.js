import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../../Components/BoxSignUp';
import ImagePicker from 'react-native-image-picker';

export class EditProfil extends Component {
  constructor() {
    super();
    this.state = {
      visibel: true,
      password: '',
      password_confirmation: '',
      alamat: '',
      nomer: '',
      foto: '',
      loading: false,
      dataUser: '',
      token: '',
    };
  }

  EditProfil = () => {
    const {password, password_confirmation, alamat, nomer, foto} = this.state;
    const url = 'https://api-shop1.herokuapp.com/api/update';
    const data = {
      password: password,
      password_confirmation: password_confirmation,
      alamat: alamat,
      nomer: nomer,
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
        const {status} = resJson;
        if (status == 'success') {
          ToastAndroid.show(
            ' Berasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('Home', {screan: 'Profil'}),
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
        <ScrollView>
          <View style={styles.viewHeader}>
            <View style={styles.boxImage}>
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
                      backgroundColor: '',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginVertical: 15,
                    }}>
                    <Image
                      style={{...styles.Image, width: 60, height: 60}}
                      source={require('../../Assets/ApaAja.png')}
                    />
                    <Text style={{fontSize: 10}}> masukan Foto </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{...styles.boxDaftar, height: 310}}>
            <View>
              <View style={styles.boxInput}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="Sandi"
                    value={this.state.password}
                    secureTextEntry={this.state.visibel}
                    onChangeText={(text) => this.setState({password: text})}
                  />
                </View>
              </View>
              <View style={styles.boxInput}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="Ulang Sandi"
                    value={this.state.password_confirmation}
                    secureTextEntry={this.state.visibel}
                    onChangeText={(text) =>
                      this.setState({password_confirmation: text})
                    }
                  />
                </View>
              </View>
              <View style={styles.boxInput}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="No Telefon"
                    value={this.state.nomer}
                    keyboardType="number-pad"
                    onChangeText={(text) => this.setState({nomer: text})}
                  />
                </View>
              </View>
              <View style={styles.boxInput}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="Alamat"
                    value={this.state.alamat}
                    onChangeText={(text) => this.setState({alamat: text})}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.boxSignUp}
              onPress={() => this.EditProfil()}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="red" />
              ) : (
                <Text style={styles.taks}> Ubah Profil</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfil;

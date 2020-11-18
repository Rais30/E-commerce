import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../Components/BoxSignUp';
import ImagePicker from 'react-native-image-picker';

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      visibel: true,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      alamat: '',
      nomer: '',
      foto: '',
      loading: false,
    };
  }

  SignUp = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
      alamat,
      nomer,
      foto,
    } = this.state;
    const url = 'https://api-shop1.herokuapp.com/api/register';
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      alamat: alamat,
      nomer: nomer,
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(foto, data),
      headers: {
        Accept: 'application/json',
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
                      source={require('../../Assets/Image.png')}
                    />
                    <Text style={{fontSize: 10}}> masukan Foto </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxDaftar}>
            <View>
              <View style={{...styles.boxInput, marginTop: 30}}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="Nama"
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text})}
                  />
                </View>
              </View>
              <View style={styles.boxInput}>
                <View style={styles.Input}>
                  <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                  />
                </View>
              </View>
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
              onPress={() => this.SignUp()}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="red" />
              ) : (
                <Text style={styles.taks}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;

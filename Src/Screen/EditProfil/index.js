import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class EditProfil extends Component {
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

  EditProfil = () => {
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

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default EditProfil;

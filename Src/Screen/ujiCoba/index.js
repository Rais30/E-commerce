import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from '../../Components/BoxProfil';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      photo: '',
    };
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };
  render() {
    return (
      <View style={styles.viewUtama}>
        <View style={styles.viewHeader}>
          <Text style={{fontSize: 20}}> Akun Profil </Text>
        </View>
        <View style={styles.viewUtama}>
          <View style={styles.backView1}>
            <View style={styles.fotoProfile}>
              <Image
                source={require('../../Assets/icons8-fashion-trend-48.png')}
                style={styles.Image}
              />
            </View>
            <View>
              <View style={styles.dataDiri}>
                <Text style={{fontSize: 20}}>Rais Azaria Aryaguna</Text>
                <Text style={{fontSize: 20}}> Kediri </Text>
              </View>
            </View>
          </View>
          <View style={styles.backView2}>
            <View style={styles.dataMember}>
              <Icon name="email" size={35} />
              <View style={styles.dataText}>
                <Text>Email </Text>
              </View>
            </View>
            <View style={styles.dataMember}>
              <Icon name="call" size={35} />
              <View style={styles.dataText}>
                <Text>Nomer </Text>
              </View>
            </View>
            <View style={styles.dataMember}>
              <Icon name="location-on" size={35} />
              <View style={styles.dataText}>
                <Text>Alamat </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.dataMember}>
              <Icon name="control-point" size={35} />
              <View style={styles.dataText}>
                <Text>Tambah Barang </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                ...styles.dataMember,
                width: 90,
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <View style={styles.dataText}>
                <Text>LogOut </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this.handleChoosePhoto()}>
          {this.state.photo !== '' ? (
            <Image
              source={{uri: this.state.photo.uri}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 25,
                marginVertical: 10,
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
        </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

export default Profil;

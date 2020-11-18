import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import styles from '../../Components/BoxBelanja';
import {ActivityIndicator} from 'react-native-paper';

export class Belanja extends Component {
  state = {
    data: [],
    input: '',
    loading: false,
  };

  componentDidMount() {
    this.belanja();
  }
  belanja = () => {
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
        console.log(resJson.data);
        this.setState({data: resJson.data, loading: false});
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewUtama}>
          <View style={styles.header}>
            <Image
              source={require('../../Assets/Image.png')}
              style={{width: 35, height: 35, alignSelf: 'center'}}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder=" Search "
              value={this.state.input}
              onChangeText={(text) => this.setState({input: text})}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <Icon
              name="chat"
              size={30}
              onPress={() => this.props.navigation.navigate('Message')}
            />
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <Swiper height={250} showsButtons={false} autoplay={true}>
            <View>
              <Image
                source={require('../../Assets/Elektronik2.jpg')}
                style={styles.imageSwiper}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/Elektronik1.jpg')}
                style={styles.imageSwiper}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/HpGeming.jpg')}
                style={styles.imageSwiper}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/Laptop!@.png')}
                style={styles.imageSwiper}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/perlengkapan-memasak-image.jpg')}
                style={styles.imageSwiper}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/baju.png')}
                style={styles.imageSwiper}
              />
            </View>
          </Swiper>
          <ScrollView horizontal>
            <View style={styles.boksKategore}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/icons8-book-48.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Buku</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/personal-care-512.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Perawatan</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/icons8-refreshments-48.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Makanan</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/icons8-desk-48.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Perabot</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/icons8-tv-on-48.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Elektronik</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.kategari}>
                    <Image
                      source={require('../../Assets/icons8-fashion-trend-48.png')}
                      style={styles.imageKatagori}
                    />
                  </TouchableOpacity>
                  <View style={styles.boksTeks}>
                    <Text style={styles.textKategori}>Fashion</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {this.state.loading ? (
            <View>
              <ActivityIndicator color="red" size={30} />
            </View>
          ) : (
            <View style={styles.boxTampildata}>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity style={styles.boksProduk}>
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

export default Belanja;

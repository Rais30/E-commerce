import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxBelanja';

export class Kategori extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.mencari();
  }
  mencari = () => {
    const url = `https://api-shop1.herokuapp.com/api/produk/${this.props.route.params.item}/tag`;
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
  render() {
    return (
      <View>
        <View style={styles.viewUtama}>
          <View style={styles.header}>
            <Image
              source={require('../../Assets/ApaAja.png')}
              style={{width: 35, height: 35, alignSelf: 'center'}}
            />
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => this.props.navigation.navigate('Pencarian')}>
            <Text>mencarian</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <Icon
              name="chat"
              size={30}
              onPress={() => this.props.navigation.navigate('Kontak')}
            />
          </View>
        </View>

        <ScrollView>
          {this.state.data == '' ? (
            <View>
              <ActivityIndicator color="red" size={30} />
            </View>
          ) : (
            <View style={styles.boxTampildata}>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={styles.boksProduk}
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {item: val.id})
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

export default Kategori;

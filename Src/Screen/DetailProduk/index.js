import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../../Components/BoxDetail';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
    };
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
          <View>
            <View>
              <Text>{this.props.route.params.item.alamat}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Detail;

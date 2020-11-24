import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/BoxDetail';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      jumlah: 0,
      modal: false,
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
  jumlah = () => {
    this.setState({jumlah: this.state.jumlah + 1});
  };
  kurang = () => {
    this.setState({jumlah: this.state.jumlah - 1});
  };

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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 350,
                backgroundColor: 'white',
                borderRadius: 5,
                height: 150,
                // flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.viewText}>
                  <Text style={{fontSize: 17, color: 'red'}}>
                    Rp {this.props.route.params.item.harga}
                  </Text>
                </View>
                <View>
                  <View style={{marginTop: 10}}>
                    <Icon name="add" size={25} onPress={() => this.jumlah()} />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text>{this.state.jumlah}</Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Icon
                      name="remove"
                      size={25}
                      onPress={() => this.kurang()}
                    />
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate()}>
                  <Icon name="add-shopping-cart" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.setState({modal: true})}>
              <Icon name="add-shopping-cart" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;

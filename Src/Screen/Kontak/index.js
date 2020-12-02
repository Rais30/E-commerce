import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'

class Kontak extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      loading: false,
    };
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('token ada');
        this.AddKontak();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  AddKontak = () => {
    const url = 'https://api-shop1.herokuapp.com/api/message';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        this.setState({data: resJson.kontak, loading: false});
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.viewUtama}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Kontak </Text>
        </View>
        <ScrollView style={styles.viewUtama}>
          {this.state.data == null ? (
            <View>
              <ActivityIndicator color="red" size={30} />
            </View>
          ) : (
            <>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={styles.boxPesan}
                      onPress={() =>
                        this.props.navigation.navigate('Message', {
                          item: val.id,
                        })
                      }>
                      <>
                        <View>
                          {val.foto !== '' ? (
                            <Image
                              source={{uri: val.foto}}
                              style={styles.viewImage}
                            />
                          ) : (
                            <View
                              style={{
                                ...styles.viewImage,
                                backgroundColor: '#C0C0C0',
                              }}>
                              <Icon nama="user" size={25} />
                            </View>
                          )}
                        </View>
                      </>
                      <View style={styles.viewTeks}>
                        <Text>{val.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
  },

  viewImage: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  boxPesan: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    marginTop: 5,
  },
});
export default Kontak;

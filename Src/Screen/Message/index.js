import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export class Home extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: [],
      input: '',
      input2: '',
      token: '',
      data2: '',
      id: '',
      token: '',
      loading: false,
    }),
      AsyncStorage.getItem('token').then((token) => {
        if (token != null) {
          this.setState({token: token});
          console.log('token ada');
          this.add();
        } else {
          console.log('token tidak ada');
        }
      });
  }

  message = () => {
    const {input} = this.state;
    const url = `https://api-shop1.herokuapp.com/api/message/${this.props.route.params.item}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({message: input}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        const {status} = resjson;
        if (status == 'success') {
          this.setState({loading: false});
          this.add();
        } else {
          console.log('error');
          this.setState({loading: false});
        }
      })
      .catch((err) => console.log('Terjadi kesalahan. ' + err));
  };

  add = () => {
    // console.log(this.props.route.params.item);
    const url = `https://api-shop1.herokuapp.com/api/message/${this.props.route.params.item}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({
          data: resJson.message,
          id: resJson.user.id,
          loading: false,
        });
        console.log(this.state.data[0].from);
      })
      .catch((error) => {
        console.log('error is ' + error);
        this.setState({loading: false});
      });
  };
  // addUser = () => {
  //   // console.log(this.props.route.params.item);
  //   const url = `https://api-shop1.herokuapp.com/api/member`;
  //   this.setState({loading: true});
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((respon) => respon.json())
  //     .then((resJson) => {
  //       this.setState({
  //         data2: resJson.data[0].id,
  //         loading: false,
  //       });
  //       console.log(this.state.data2);
  //       this.add();
  //     })
  //     .catch((error) => {
  //       console.log('error is ' + error);
  //       this.setState({loading: false});
  //     });
  // };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Pesan </Text>
        </View>

        <ScrollView>
          {this.state.data.length == 0 ? (
            <View>
              <ActivityIndicator color="red" size={30} />
            </View>
          ) : (
            <View>
              {this.state.data.map((value, key) => {
                return (
                  <View key={key}>
                    {value.from == this.props.route.params.item ? (
                      <View style={styles.getText}>
                        <Text>{value.message}</Text>
                      </View>
                    ) : (
                      <View style={styles.textSend}>
                        <Text>{value.message}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        <View style={styles.boxSend}>
          <View style={styles.textMasuk}>
            <TextInput
              style={{width: '75%'}}
              placeholder=" Pesan "
              value={this.state.input}
              onChangeText={(text) => this.setState({input: text})}
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="send" size={35} onPress={() => this.message()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Box: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1589FF',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  boxPesan: {},
  textSend: {
    width: '82%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    margin: 5,
    alignSelf: 'flex-end',
  },
  boxSend: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#82CAFA',
    justifyContent: 'center',
  },
  textMasuk: {
    width: '85%',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  getText: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    margin: 5,
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
  },
});

export default Home;

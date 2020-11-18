import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  viewHeader: {
    backgroundColor: '#087cbf',
    width: '100%',
    height: 250,
  },
  boxImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    top: 50,
  },
  Image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    padding: 5,
  },
  boxDaftar: {
    backgroundColor: 'white',
    width: '90%',
    height: 480,
    borderRadius: 35,
    bottom: 70,
    alignSelf: 'center',
    elevation: 5,
  },
  boxInput: {
    marginTop: 4,
    marginLeft: 30,
  },
  Input: {
    borderBottomWidth: 1,
    width: '90%',
    borderRadius: 30,
    paddingLeft: 20,
  },
  boxSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f83f9',
    borderRadius: 25,
    width: '50%',
    alignSelf: 'center',
    marginTop: 40,
    height: 40,
  },
  taks: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fcf8f8',
  },
});

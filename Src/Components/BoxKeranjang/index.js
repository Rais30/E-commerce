import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  boxTampildata: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  boksProduk: {
    width: 350,
    height: 100,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  viewImage: {
    justifyContent: 'center',
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
});

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewUtama: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffff',
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginLeft: 10,
  },
  input: {
    marginHorizontal: 10,
    // backgroundColor: '#babdcf',
    marginVertical: 10,
    width: '55%',
    // borderRadius: 30,
  },
  boksKategore: {
    width: 400,
    height: 100,
    backgroundColor: '#1e90ff',
  },
  kategari: {
    backgroundColor: 'white',
    width: 65,
    height: 65,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boksTeks: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKategori: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  boxTampildata: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  imageSwiper: {
    width: '100%',
    height: '100%',
  },
  imageKatagori: {
    width: 55,
    height: 55,
  },
  boksProduk: {
    width: 170,
    height: 270,
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    paddingTop: 5,
    paddingTop: 5,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
  },
  viewImage: {
    alignItems: 'center',
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
});

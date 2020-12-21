import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  gamabrProduk: {
    width: '100%',
    height: 400,
  },
  viewText: {
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  textHarga: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'red',
  },
  textNama: {
    fontSize: 29,
    fontWeight: 'bold',
  },
  viewtextDetail: {
    marginTop: 10,
    paddingLeft: 6,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  textDetail: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewModal: {
    position: 'absolute',
    flexDirection: 'row',
    top: 200,
    left: 20,
  },
  isiModal: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 150,
  },
  textModal: {fontSize: 17, color: 'red'},
  viewImage: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },
});

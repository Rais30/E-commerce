import React from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

class Splash extends React.Component {
  render() {
    return (
      <Onboarding
        onDone={() => this.props.navigation.replace('Home')}
        onSkip={() => this.props.navigation.replace('Home')}
        pages={[
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/37141-shopping-checlist-app.json')}
                autoPlay={true}
              />
            ),
            title: 'Terjaga',
            subtitle: 'Kualitas terjamin oleh kami',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/36215-shopping-cart-animation.json')}
                autoPlay={true}
              />
            ),
            title: 'Pasar',
            subtitle: 'Semua ada di tangan anda',
          },
          {
            backgroundColor: '#fff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/27519-shipping-complete-page-animation.json')}
                autoPlay={true}
              />
            ),
            title: 'Pengiriman',
            subtitle: 'Barang di Kirim ke Rumah Anda',
          },
        ]}
      />
    );
  }
}
export default Splash;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {getCatImages, voteCat} from './repository';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [data, setData] = useState({
    loading: true,
    error: false,
    response: [],
  });

  const onSuccess = response => {
    setData({
      loading: false,
      error: false,
      response: data.response.concat(response),
    });
  };

  const onFailure = () => {
    setData({loading: false, error: false, response: data.response});
  };

  useEffect(() => {
    getCatImages({onSuccess, onFailure});
  }, []);

  if (data.loading) {
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  }

  if (data.error || data.response.length <= 0) {
    return (
      <SafeAreaView>
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  const sliceCat = () => {
    setData({
      loading: data.loading,
      error: data.error,
      response: data.response.slice(1),
    });
    if (data.response.length < 10) {
      getCatImages({onSuccess, onFailure});
    }
  };

  const onSuccessVoteCat = response => {
    console.log('Sucess to vote');
  };

  const onFailureVoteCat = () => {
    console.log('Failure to vote');
  };

  const loveCat = () => {
    voteCat(data.response[0].id, onSuccessVoteCat, onFailureVoteCat);
    sliceCat();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: data.response[0].url,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={sliceCat}>
          <View style={styles.xWrapper}>
            <Image style={styles.x} source={require('./img/x.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={loveCat}>
          <View style={styles.heartWrapper}>
            <Image style={styles.heart} source={require('./img/Vector.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
  },
  image: {
    height: SCREEN_WIDTH * 1.28,
    width: SCREEN_WIDTH - 32,
    borderRadius: 16,
  },
  imageWrapper: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 64,
    margin: 24,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  heart: {
    height: 20,
    width: 20,
  },
  xWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 64,
    margin: 24,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  x: {
    height: 24,
    width: 24,
  },
});

export default App;

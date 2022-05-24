import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const { width: SCREE_WIDTH } = Dimensions.get('window');

const icons = {
  Sunny: 'day-sunny',
};

export default function App() {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.temp}>27</Text>
            <Fontisto name={icons.Sunny} size={67} color="white" />
          </View>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.temp}>27</Text>
            <Fontisto name={icons.Sunny} size={67} color="white" />
          </View>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.temp}>27</Text>
            <Fontisto name={icons.Sunny} size={67} color="white" />
          </View>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    color: 'black',
    fontSize: 58,
    fontWeight: '500',
    color: 'ivory',
  },
  weather: {},
  day: {
    width: SCREE_WIDTH,
    padding: 25,
  },
  temp: {
    marginTop: 50,
    fontSize: 168,
    color: 'ivory',
  },
  description: {
    marginTop: -30,
    fontSize: 50,
    color: 'ivory',
  },
});

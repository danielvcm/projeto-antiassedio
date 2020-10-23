import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PushNotifications from './src/services/PushNotifications'
import GeoLocation from './src/services/GeoLocation'
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import ApiKeys from './constants/ApiKeys'
import Report from './src/services/Report'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) { 
      firebase.initializeApp(ApiKeys);
    }
  }
  componentDidMount = async()=>{
    PushNotifications.registerForPushNotifications()
    GeoLocation.registerForGeoLocation()
    await Location.startLocationUpdatesAsync('getLocationTask',{'accuracy': Location.Accuracy.Highest})
  }

  render() {
  return (
    <View style={styles.container}>
      <Text>Projeto Antiassédio{"\n"}</Text>
      <Button
        title="Reportar Assédio"
        color="#DC143C"
        onPress={() => Report.reportHarassment()}
      />
      <StatusBar style="auto" />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TaskManager.defineTask('getLocationTask',({data, error}) => {
  if (error){
    return;
  }
  if (data){
    const { locations } = data;
    GeoLocation.saveLocation(locations)
  }
})
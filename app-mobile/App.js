import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import PushNotifications from './src/services/PushNotifications'
import * as firebase from 'firebase'
import ApiKeys from './constants/ApiKeys'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) { 
      firebase.initializeApp(ApiKeys);
    }
    PushNotifications.registerForPushNotifications()
  }
  render() {
  return (
    <View style={styles.container}>
      <Text>Projeto Antiassédio{"\n"}</Text>
      <Button
        title="Reportar Assédio"
        color="#DC143C"
        onPress={() => Alert.alert("Pronto","Assédio Reportado")}
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

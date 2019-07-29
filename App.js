/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
// import { BleManager } from "react-native-ble-plx";
// import {device} from "react-native-bluetooth-serial-next"
import BluetoothSerial from "react-native-bluetooth-serial-next";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      peripheralsPaired: []
    };
    this.startScan();
  }
  componentDidMount() {
    console.log(this.state.peripheralsPaired)
  }
  startScan = async () => {
    const peripheralsPaired = await BluetoothSerial.list();
    console.log(peripheralsPaired);
    this.setState({ peripheralsPaired: peripheralsPaired });
  };
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Paired Bluetooth Devices</Text>
        {this.state.peripheralsPaired.length >0 ? (
          <FlatList
          data={this.state.peripheralsPaired}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
        ) : <Text/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
   
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  item:{
    fontSize:20
  },
  heading: {
    fontSize:25,
    fontWeight:"bold"
  }
});

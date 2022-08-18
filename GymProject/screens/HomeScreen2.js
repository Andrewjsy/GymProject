import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView} from 'react-native';

const HomeScreen2 = () =>{
    return(
        <View style={styles.baseview}>
            <Text style={styles.text}>현재 이용가능한 기구가 없습니다</Text>
            <View style={{flex:0.4}}/>
        </View>
    );}

const styles = StyleSheet.create({
  baseview: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'},
  text: {fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
});

export default HomeScreen2;
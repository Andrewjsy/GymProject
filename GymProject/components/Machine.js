import React from 'react';
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // add this 8/8

//현재는 기구명, 대기인원만 표시되지만, 이미지도 추후 추가할것
const reserve = id => {
  //석우꺼
  /*예약하기버튼, 서버에 회원id랑 예약하고자 하는 머신id주고 성공 or 실패 여부 리턴받기*/
  //인자로 받은 machine id전달받음 -> id 변수
  console.log(id);
  const getuserid = async () => {
    try {
      const id1 = await AsyncStorage.getItem('@storage_userid');
      console.log(id1);
      if (id1 !== null) {
        fetch(
          'https://so6wenvyg8.execute-api.ap-northeast-2.amazonaws.com/dev/reservation',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: id1,
              machineid: String(id),
            }),
          },
        )
          .then(response => response.json())
          .then(json => {
            if (json==0){
              console.log("대기순위:"+String(json+1));
              Alert.alert("대기순위:"+String(json+1));
              return String(json+1); //대기성공이면 대기번호 리턴
            }
            else{
                 console.log("예약에 실패했습니다.");
                 return -1;  //대기 실패면 -1 리턴 (-1은 이미 대기목록에 있는 경우, -2는 그 이외에 에러 났을 경우 리턴할건데 서버에다가 대기 성공이면 대기번호  
            }                // 리턴해주고 대기리스트에 있으면 -1리턴해주고, 다른 이유로 예약실패하면 -2리턴해달라고 그랬음. 지금은 if(json==0)으로 했는데
                             // 서버 업데이트 되면 if(json==-1) else if(json==-2) else 이런식으로해서 else에다가 대기성공인 경우 로직 짜야할 듯
          })
          .catch(error => {
            console.error(error);
          });
        // value previously stored
      }
    } catch (e) {
      console.log('error'); 
      return -1; 
      // error reading value
    }
  }; // add this 8/8
  return getuserid(); // add this 8/8
   // return getuserid() 이런 식으로 하고 getuserid()의 리턴 값을 대기순위로 주도록 바꿔야할 듯. 에러면 -1 리턴
};

const onReserve = id => {
  const waitnum = reserve(id);
  if (waitnum >= 0) {
    const formatted = `${waitnum}번재로 예약성공`;
    Alert.alert(formatted);
  } else {
    Alert.alert('예약실패');
  }
};

const Machine = ({name, id, waitnum}) => {
  const formatted = `기구명 : ${name}\n\n현재 대기인원 : ${waitnum}명`;
  return (
    <View style={styles.machine}>
      <Image
        source={require('../images/default_image.png')}
        style={{width: 70, height: 70}}></Image>
      <Text>{formatted}</Text>
      <Button title="예약하기" onPress={() => onReserve(id)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  machine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
export default Machine;

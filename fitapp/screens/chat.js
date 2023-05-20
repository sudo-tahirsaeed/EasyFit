import { StatusBar } from 'expo-status-bar';

import { AntDesign } from '@expo/vector-icons';
import React, { Component ,useState, useEffect} from "react";
import {
    
  Modal,Alert,
  TextInput, 
  StyleSheet,BackHandler,
  View,
  Text,ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,Button,AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Message from '../components/mesage';
import Chatcard from '../components/chatcards';
import axios from 'axios';
import e from 'cors';
// import MaterialIconTextButtonsFooter from "/src/components/MaterialIconTextButtonsFooter";
var chats;
var nochats=0;
var chatheads=[];
var chatheadsfinal=[];
var alldata;

export default function Chatbox(){
  const [isLoading, setIsLoading] = useState(true);
//PASS USERNAME USING PROPS AND SAVE INMYUSERNAME
    var myusername="tahir7"
    myusername=myusername.toLocaleLowerCase();

   const userdata={uid: myusername}
    useEffect(() => {
      axios.post('http://192.168.18.102:3000/loadchats',{userdata})
      
    .then(response => {
      if(response.data=='0')
      {
        nochats=1;
        console.log("NO CHAT RECORD FOUND");
      }
      else{
      chats = [response.data];
      alldata=response.data;
// console.log(JSON.stringify(chats));
chats=chats[0]
// console.log("CHATS: "+ chats[0].sender);
// console.log(chats.length);
for (let i = 0; i < chats.length; i++) {
  // console.log(chats[i]);
  if(chats[i].sender == userdata.uid)
    {
      chatheads.push(chats[i].receiver)
      // console.log(JSON.stringify(chatheads));
    }
   else if(chats[i].receiver == userdata.uid)
    {
      chatheads.push(chats[i].sender)
      
      // console.log(JSON.stringify(chatheads));
    }


}

// console.log(chatheads);
//   
// })

 chatheadsfinal = [...new Set(chatheads)];
// console.log(chatheadsfinal);

      //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
      
        setIsLoading(false);
      }
         
    })
    .catch(error => {
      alert(" Here "+error)
      setIsLoading(false);
    
    });
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
else{
  
    return(

        <View style={{flex:1 , backgroundColor:'#161416'}}>
        
            <View style={{  backgroundColor:'#161416',height:80,borderBottomColor:'gray',borderBottomWidth:2}}>
                <Text  style={{color: 'white', fontSize:19,textAlign:'left',marginLeft:13,marginTop:40,textShadowColor:'black',fontWeight:'500'}}>Messages</Text>
            </View>

    <ScrollView>
      
    {chatheadsfinal.map( item =>(

      <Chatcard key={item.time} data={item}  alld={alldata} myuser={myusername}/>
    )
    
    )}
    </ScrollView>
     

        </View>
    )
}
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 0,
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 20,
       
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderBottomColor:'gray',
        borderBottomWidth:3,
        elevation: 5,
        
        marginVertical:30

      },
      button: {
        borderRadius: 20,
        padding: 0,
        elevation: 2,
        marginTop:10,
        flexDirection:'row'
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      
      buttonsend: {
        backgroundColor: 'white',
        color:'black',
        width: 70,
        height:30,
        marginLeft:0,
        justifyContent:'center',
        alignSelf:'center'
      },
      buttonClose: {
        backgroundColor: 'white',
        color:'black',
        width: 45,
        height:30,
        alignSelf:'center'
      },
      textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:3,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:25,
        fontWeight:'700',
        color:'white'
    
      },
    
    

})
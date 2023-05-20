import React, { useState, useEffect } from 'react';
import { View, Text,ActivityIndicator, Image, StyleSheet, Button,Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

import Vidplay from './videoplay';
var globaldata=[];
const ProfileCard = (data) => {
  const [user,setuser] =useState( {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png",
    name: data.username,
    desc: 'Loading...',
  });
  console.log('tahir'+data.username);

  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const id={username: data.username}
console.log("USE "+ data.username );

    axios.post("http://192.168.18.102:3000/trainerdetails1", { id })
    .then((response) => {
      if(response.data=='0')
      {
        alert("Sorry No Trainer Details Found");
        setIsLoading(false)
      }
      else{
       globaldata=[...response.data]
       console.log("DDATA"+globaldata[0]);
      //  setuser({avatar: globaldata[0].pics,coverPhoto: globaldata[0].video,name:data.username,desc:globaldata[0].description})
       console.log(user); 
       // console.log("use : "+JSON.stringify(globaldata));
        //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
        // console.log(JSON.stringify(globaldata[0]));
        setIsLoading(false);
      }
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  
    }, []);

  //   useEffect(() => {
  //     const id={username: data.username}
  // console.log("USE "+ data.username );
  
  //     axios.post("http://192.168.18.102:3000/trainerdetails1", { id })
  //     .then((response) => {
  //       if(response.data=='0')
  //       {
  //         alert("Sorry No Trainer Details Found");
  //         setIsLoading(false)
  //       }
  //       else{
  //        globaldata=[...response.data]
  //        console.log("DDATA"+globaldata[0]);
  //       //  setuser({avatar: globaldata[0].pics,coverPhoto: globaldata[0].video,name:data.username,desc:globaldata[0].description})
  //        console.log(user); 
  //        // console.log("use : "+JSON.stringify(globaldata));
  //         //  console.log("DATaxxxxx: "+globaldata[2].coursetitle+"  "+globaldata[0].duration);
  //         // console.log(JSON.stringify(globaldata[0]));
  //         setIsLoading(false);
  //       }
  //       })
  //       .catch((error) => {
  //         alert(error);
  //         setIsLoading(false);
  //       });
    
  //     }, [count]);

 
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  else{
// console.log("GLVIDD"+globaldata[0].video);

if(globaldata.length<1)
{
  setcount(count+1)
  setIsLoading(true)
}

return (
    <View style={styles.container}>
    <View style={styles.vidcontainer}>
 
     <Vidplay sourceUri={'https://res.cloudinary.com/dahv24lxo/video/upload/v1684145393/w73odvs26r5ypsvsiyb6.mp4'} />  
     </View>
 
      <View style={styles.avatarContainer}>
        <Image source={{ uri: globaldata[0].pictures }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.edit} onPress={edit()}>   

        <Icon name='pencil' style={{marginRight:7,}} size={20} color='#900' />
        <Text>EDIT</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={{  color: "#ddd",
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 20,
  }}>
            {globaldata[0].description}
            </Text>
            
    </View>
    
  );
}
};

const styles = StyleSheet.create({
  
  edit: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#FFF',

    paddingLeft:12,
    paddingRight:12,
  paddingVertical:5,
  borderRadius:7
  },
  
  container: {
    width: '100%',
    alignItems: 'center',
  },
  vidcontainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:'center'
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 110,
    height: 100,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 1,
    fontSize: 20,
    fontWeight: '500',
    color:'#FFF'
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 3,

    justifyContent: 'space-between',
  },
});


export default ProfileCard;

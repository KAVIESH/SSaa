import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elememts'
import db from '../Config'
import * as ImagePicker from 'expo-image-picker'
import * as permissions from 'expo-permissions'


import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{


constructor(){
  super();
  this.state = {
    userId: firebase.auth().currentUser.email,
    image: '#',
    name: '',
    docId: '',

  }
}

getUserProfile = ()=>{
  db.collection('users').where('emial_id', '==', this.state.userId).onSnapshot(snapshot=>{
    snapshot.forEach(doc=>{
     this.setState({
       name: doc.data().first_name + '' + doc.data().last_name,
       docId: doc.id,
       image: doc.data().image
     })
    })
  })
  
}

componentDidMount(){
  this.fetchImage(this.state.userId)
  this.getUserProfile()
}

fetchImage = (imageName)=>{
var storageRef = firebase.storage().ref().child("user_profiles/" + imageName)
storageRef.getDownloadURL().then(url=>{
  this.setState({
    image: url
  })
})
.catch(error=>{
  this.setState({
    image: '#'
  })
})
}

selectPicture = async () =>{
const{canceled, uri} = await ImagePicker.launchImageLibraryAsync({
  mediTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
})

if(!canceled){
this.uploadImage(uri, this.state.userId)
}
}

uploadImage = async (uri, imageName)=>{
var response = await  fetch(uri)
var blob = await response.blob()
  var ref = firebase.storage().ref().child("user_profiles/" + imageName)
  return ref.put(blob).then(response=>{
    this.fetchImage(imageName)
  })

}

  render(){
    return(
      <View style={{flex:1}}>
        <View style = {{flex: 0.5, alignItems: 'center', backgroundColor: 'red'}}>
<Avatar
rounded
source = {{uri: this.state.image}}
size = 'medium'
onPress = {()=>{
  this.selectPicture()
}}
containerStyl = {styles.imageContainer}
showEditButton
/>

<Text style = {{fontWeight: 100, fontSize: 20, paddingTop: 10}}>
{this.state.name}
</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  },
  
  imageContainer: {
    flex: 0.75,
    width: '40%',
    height: '20%',
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,

  }
})

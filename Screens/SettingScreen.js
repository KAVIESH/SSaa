import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MyHeader from '../Components/MyHeader'
import db from '../Config'
import firebase from 'firebase'

export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            firstName: '',
            LastName: '',
            Adress: '',
            Contact: '',
            docId: '',
        }
    }

    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
        })
Alert.alert("Profile Updated Successfully")
    }

    componentDidMount(){
        this.getUserDetails()
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                var data = doc.data()
this.setState({
emailId: data.email_Id,
firstName: data.first_name,
lastName: data.last_name,
Contact: data.contact,
Adress: data.address,
docId: doc.id,

})
            })
        })

    }
    
    render(){return(
        <View style = {styles.container}>
<MyHeader title = "Settings" navigation = {this.props.navigation}/>
<View style = {styles.formContainer}>
<TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}

value = {this.state.firstName}

        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}

          value = {this.state.lastName}

        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}

          value = {this.state.contact}

        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}

value  = {this.state.address}

        />

<TouchableOpacity style = {styles.button}
onPress = {()=>{
    this.updateUserDetails()
}}
>
    <Text style = {styles.buttonText}>Save</Text>
</TouchableOpacity>

</View>
        </View>
    )}
}

const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' },
formContainer:{ flex:1, width:'100%', alignItems: 'center' },
formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import db from '../Config.js';
import firebase from 'firebase';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Card } from 'react-native-elements';

export default class ReceiverDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email(),
            receiveId: this.props.navigation.getParam('details')["user_id"],
requestId: this.props.navigation.getParam('details')["request_id"],
bookname: this.props.navigation.getParam('details')["book_name"],
reasonForRequesting: this.props.navigation.getParam('details')["reason_to_request"],
receiverName: '',
receiverContact: '',
receiverAddress: '',
receiverDocId: ''

        }
    }

getReceiverDetails(){
db.collection("users").where('email_id', '==', this.state.receiverId).get()
.then(snapshot =>{
    snapshot.forEach(doc=>{
        this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().contact,
            receiverAddress: doc.data.address,
        })
    })
})
db.collection("requested_books").where('request_id', '==', this.state.requestId).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({
            receiverDocId: doc.id,
            
        })
    })
}
    )

}

addNotification = ()=>{
    var message = this.state.userName + "Has shown interest in donating the book"
    db.collection("all_notifications").add({
        targeted_user_id: this.state.receiverId,
        donor_id: this.state.userId,
        request_id: this.state.requestId,
        book_name: this.state.bookname,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        notification_status: "Unread",
        message: message,
    })
}

    updateBookStatus = ()=>{
        db.collection("all_donations").add({
            book_name: this.state.bookName,
            request_id: this.state.requestId,
            requested_by: this.state.receiverName,
            donor_id: this.state.userId,
            request_status: "Donor Interested",
        })
    }
    componenetDidMount(){
        this.getReceiverDetails()
    }
    render(){
        return(
            <View style = {styles.container}>
<View style = {{flex: 0.1}}>
    
    <Header
    leftComponent ={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()}/>}
    centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
    addBackgroundColor = "yellow"
    
    />
</View>
<View style = {{flex: 0.3}}>
<Card 
title = {"book information"} 
titlestyle = {{fontSize: 20}}
>
    <Card>
        <Text style = {{fontWeight: 'bold'}}>
            Name: {this.state.bookName}
        </Text>
    </Card>
    <Card>
    <Text style = {{fontWeight: 'bold'}}>
            Reason: {this.state.reasonForRequesting}
        </Text>
    </Card>
</Card>
</View>

<View style = {{flex: 0.3}}>
<Card 
title = {"receiver information"} 
titlestyle = {{fontSize: 20}}
>
 <Card>
        <Text style = {{fontWeight: 'bold'}}>
            Name: {this.state.receiverName}
        </Text>
    </Card>
    <Card>
    <Text style = {{fontWeight: 'bold'}}>
            
            contact: {this.state.receiverContact}
        </Text>
    </Card>
<Card>
    <Text style = {{fontWeight: 'bold'}}>
        Adress: {this.state.receiverAddress}
    </Text>
</Card>

</Card>
</View>

<View style = {styles.buttonContainer}>{
    this.state.receiveId !== this.state.userId
    ?(
<TouchableOpacity style = {styles.button}
onPress = {(

)=>{
    this.updateBookStatus()
    this.addNotification()
    this.props.navigation.navigate('myDontaions')
}}
>
    <Text>Donate</Text>
</TouchableOpacity>
    )

    :null
}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ container: { flex:1, },
    buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' },
    button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })
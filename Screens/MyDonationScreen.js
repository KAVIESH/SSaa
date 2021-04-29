import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../Config'
import MyHeader from '../Components/MyHeader';

export default class myDontaionsScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.emailId,
            allDonations: []
        }
        this.requestRef = null
    }

    getAllDonations(){
        this.requestRef = db.collection("all_donations").where('donor_id', '==', this.state.userId)
    .onSnapshot((snapshot)=>{
      var allDonations = snapshot.docs.map(document => document.data());
      this.setState({
        allDonations : allDonations
      });
    })
    }

    sendBook = (bookDetails)=>{
      if (bookDetails.request_status === "bookSent") {
        var requestStatus = "Dono interested"
        db.collection("all_doations").doc(bookDetails.docId).update({
          request_status: "donor interested"
        })
        this.sendNotification(bookDetails, requestStatus)
      }

else{
  var requestStatus = "Book Sent"
  db.collection("all_donations").doc(bookDetails.docId).update({
  request_status: "book sent"  
  })
  this.sendNotification(bookSent, requestStatus)
}

    }

    sendNotification = (bookDetails, requestStatus)=>{
var requestId = bookDetails.request_Id
var donorId = bookDetails.donor_Id
db.collection("all_notifications").where('request_id','==', requestId)
.where('donor_id', '==', donorId).get().then(snapshot=>{
  snapshot.forEach(doc=>{
    var message = "";
    if(requestStatus === "bookSent" ) {
      message = this.state.donoName + 'Sent you book'
    }
    else{
      message = this.state.donoName + "Has shown intetrest in donating the book"
    }
    db.collection("all_notifications").doc(doc.id).update({
      message:message,
      notification_status: "unread",
      date: firebase.firestore.FieldPath.serverTimestamp()
    })
  })
})
    }

    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return(
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={"requestedBy"+item.requested_by+"\n status"+ item.request_status}
        leftElement = {<Icon name="book" type="font-awesome" color ='#696969'/>}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress = {(

            )=>{
              this.sendBook(item)
            }}
            >
              <Text style={{color:'#ffff'}}>{
                item.request_status ===  "Book Sent"?"Book Sent":"Send Book"
              }</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }
  componentDidMount(){
      this.getAllDonations()
  }

  componentWillUnmount(){
      this.requestRef()
  }

    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="My Donations" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.allDonations.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Donated Books</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonationsLength}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',  
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })
  
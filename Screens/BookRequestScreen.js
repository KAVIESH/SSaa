import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      isBookRequestActive: "",
      requestedBookName: "",
      bookStatus: "",
      requestId: "",
      userDocId: "",
      docId: '',
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    })

    await this.bookRequest()
    db.collection('users').where('email_id', '==', userId).get().then()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
db.collection('users').doc(doc.id).update({
  isBookRequestActive: true
})
      })
    })

    this.setState({
        bookName :'',
        reasonToRequest : '',
        requestId: randomRequestId,

    })

    return Alert.alert("Book Requested Successfully")
  }

  receivedBooks = (bookName)=>{
    var userId = this.state.userId
    var requestId = this.state.requestId
    db.collection('received_books').add({
      user_Id: userId,
      book_Name: bookName,
      request_id: requestId,
      bookStatus: 'received'
    })  
  }

  getIsBoookRequestActive = ()=>{
    db.collection('useres').where('email_id', '==', userId)
    .onSnapshot(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          isBookRequestActive: doc.data().isBookRequestActive,
          userDocId: doc.id
        })
      })
    })
  }

  getBookRequest = ()=>{
    var bookRequest = db.collection('requested_books')
    .where('user_id', '==', this.state.userId).get().then(snapshot=>{
      snapshot.forEach(doc=>{
        if(doc.data().book_status!== "received"){
        this.setState({
          requestId: doc.data().request_id,
          requestedBookName: doc.data.book_name,
          bookStatus: doc.data().book_status,
          docId: doc.id
        })}
      })
  })}


  sendNotifictaions = ()=>{
    db.collection('users').where('email_Id', '==', this.state.userId).get().then(snapshot=>{
      snapshot.forEach(doc=>{
var name = doc.data().first_name
var lastName = doc.data().last_name
db.collection('all_notifications').where('request_id', '==', this.state.requestId).get().then(snapshot=>{
  snappshot.forEach(doc=>{
    var donorId = doc.data().donor_id
    var book_Name  = doc.data().book_Name

    db.collection('all_notifications').add({
      targeted_user_id: donorId,
      message: name + '' + lastName + "receive the book" + book_Name,
      notifictaion_status: 'unread',
      book_Name: book_Name
    
    })
  })
})
      })
    })
  }

  componentDidMount(){
    this.getBookRequest()
    this.getIsBoookRequestActive()
  }

  updateBookRequest = ()=>{
    db.collection('requested_books').doc(this.state.docId).update({
      book_status: 'received'
    })
    db.collection('users').where('email_id', '==', userId).get().then()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
db.collection('users').doc(doc.id).update({
  isBookRequestActive: false
})
      })
    })
  
  }



  render(){
    if(this.state.isBookRequestActive === true){
      return(
        <View>
          <View>
            <Text>
              book Name
            </Text>
            <Text>
             { this.state.requestedBookName}
            </Text>
          </View>
          <View>
            <Text>
              Book Status 
            </Text>
            <Text>
              {this.state.bookStatus}
            </Text>
          </View>
<TouchableOpacity
style = {{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
onPress = {()=>{
  this.sendNotifictaions()
  this.updateBookRequestStatus()
  this.receivedBooks(this.state.requestedBookName)


}}
>


 <Text>
   I received the book
   </Text> 
   </TouchableOpacity>


        </View>
      )
    }

    else{

   
    return(
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                    this.setState
                    ({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    ) }
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)

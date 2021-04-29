import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../Config';
import MyHeader from '../Components/MyHeader';


export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state =  {
            userId: firebase.auth().currentUser.emailId,
            allNotifications: []
        }
        this.notificationRef = null
    }

    getNotifications = ()=>{
this.notificationRef = db.collection("all_notifications").where(
    "notification_status", "==", "unread"
).where(
    "targeted_user_id",'==',this.state.userId
).onSnapshot(snapshot=>{
    var allNotifications = []
    snapshot.docs.map(doc=>{
        var Notifications = doc.data()
        Notifications["doc_id"] = doc.id
        allNotifications.push(Notifications)
    })

this.setState({
    allNotifications: allNotifications,
})

})
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
      return(
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={item.message}
          leftElement = {<Icon name="book" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
         
          bottomDivider
        />
      )
    }

    componentDidMount(){
        this.getNotifications()
    }
  
    componentWillUnmount(){
        this.notificationsRef()
    }

    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader title="Notifications" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>No Notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotificationsLength}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
    }
    

}
const styles = StyleSheet.create({ container: { flex:1, }})


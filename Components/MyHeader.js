import React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {View, Text, StyleSheet, Alert} from 'react-native';
import { Notifications } from 'expo';
export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''

        }
    }

getNoOfNotifictaions = ()=>{
    db.collection("all_notifications").where( 'notification_status', '==', 'unread' )
    .onSnapshot(snapshot =>{
var unreadNotifications = snapshot.docs.map(doc=>doc.data())
this.setState({
    value: unreadNotifications.Length
})
    })
}


componentDidMount(){
    this.getNoOfNotifictaions()
}

    bellIconWithBadge = ()=>{
        return(
            <View>
                <Icon name = 'bell' type = 'font-awesome' color = 'red' size = {25} onPress = {()=>{
                props.navigation.navigate('Notification')
                        }} />

<Badge
value = {this.state.value}
containerStyle = {{position: 'absoulte', top: -4, rigth: -4}}
/>

                        </View>
        )
        
    }
    render(){
    return(
        <Header
        leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'yellow' onPress = {()=>{
            props.navigation.toggleDrawer()
        }}/>}
        rightComponent = {<this.bellIconWithBadge{...this.props}/>}
        centerComponent = {{text: props.title, style: {color: '#90A5A9', fontSize:20,fontWeight:"bold",}}}
        backgroundColor = "red"
        >

        </Header>
    )
}}

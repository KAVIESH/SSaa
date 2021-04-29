import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../Config'
import MyHeader from '../Components/MyHeader';

export default class MyReceivedBook extends React.Component{
    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.emailId,
            receivedBooks: []
        }
        this.requestRef = null
    }

    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return(
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.bookStatus}
        
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
    
        bottomDivider
      />
    )
  }
    componentDidMount(){

        this.getReceivedBookList()
    }
  
    componentWillUnmount(){
        this.requestRef()
    }

    getReceivedBookList = ()=>{
        this.requestRef = db.collection('requested_books')
        .where('user_id', '==', this.state.userId)
        .where('book_status', '==', 'received')
        .onSnapshot(snapshot=>{
            var getReceivedBookList = snapshot.docs.map(doc=>doc.data())
            this.setState({receivedBooks: getReceivedBooks})
        })
    }

    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="Received Books" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
              {
                this.state.receivedBooks.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List of all received Books</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.receivedBooksLength}
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
    }
})

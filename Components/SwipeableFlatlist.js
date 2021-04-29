import react from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight, Animated} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '..Config'


export default class SwipeableFlatlist extends React.Component{

constructor(props){
    super(props);
    this.state = {
        allNotifications: this.props.allNotifications
    }
}

renderItem = data =>(
    <Animated.View><ListItem
    leftElement = {<Icon name="book" type="font-awesome" color="#696969" />}
    title = {data.item.book_name}
    titleStyle = {{
        color: "black",
        fontWeight: "bold",
    }}
    subtitle = {data.item.message}
    bottomDivider
    /></Animated.View>
)

renderHiddenItem = ()=>{
    <View style = {styles.rowBack}>
        <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
            <Text style = {styles.backText}>
                Mark as read
            </Text>
            
        </View>
    </View>
}

updateMarkasRead = (notifications)=>{
db.collection("all_notifictaions")
.doc(notifications.doc_id)
.update({
    notification_status: "read"
})
}

onSwipeValueChange = (swipeData)=>{
var allNotifications = this.state.allNotifications
const {key, value} = swipeData

if(value < -Dimensions.get("window").width){
    const newData = [...allNotifications]
    this.updateMarkasRead(allNotifications[key])
    newData.splice(key, 1)
    this.setState({
        allNotifications: newData   
    })
}

}



render(){
    return(
<View style = {styles.container}>
<SwipeListView
disableRightSwipe
data = {this.state.all_notifications}
renderItem = {this.renderItem}
renderHiddenItem = {this.renderHiddenItem}
rightOpenValue = {-Dimensions.get("window").width}
previewRogueKey = {"0"}
reviewOpenValue = {-40}
previewOpenDelay = {300}
onSwipeValueChange = {this.onSwipeValueChange}
keyExtractor = {(item, index) => index.toString()}

/>
</View>
    )
}
}

const styles = StyleSheet.create({


    container:{
backgroundColor: 'red',
flex: 1,

    },

    rowBack: {
alignItems: 'center',
backgroundColor: 'yellow',
flex: 1,
flexDirection: "row",
justifyContent: 'space-between',
paddingLeft: 15,

    },

backRigthBtn: {
alignItems: 'center',
justifyContent: 'center',
width: 100
},

backRigthBtnRigth: {
backgroundColor: 'blue'
},

})
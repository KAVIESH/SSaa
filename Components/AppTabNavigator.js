import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookRequestScreen from '../Screens/BookRequestScreen';
import BookDonateScreen from '../Screens/BookDonateScreen';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: BookDonateScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
            tabBarLable: "Donate Books"
        }
    },
BookRequest: {
screen: BookRequestScreen,
navigationOptions: {
    tabBarIcon: <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
    tabBarLable: "Book Request"
}
}

})
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../Screens/SettingScreen'
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from '../Screens/BookDonateScreen';
import ReceiverDetails from '../Screens/ReceiverDetailsScreen';


export const AppStackNavigator = createStackNavigator({
  bookDonateList: {
      screen: BookDonateScreen,
      navigationOptions: {
          headerShown: false,
      }
  },

  receiverDetails: {
      screen: ReceiverDetails,
      navigationOptions: {
          headerShown: false,
      }
  }
},
{
    initialRouteName : 'BookDonateList'
  })

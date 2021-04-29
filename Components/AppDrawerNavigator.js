import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../Screens/SettingScreen'
import myDontaionsScreen from '../Screens/MyDonationScreen';
import NotificationScreen from '../Screens/NotificationScreen';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },

myDonations: {
  screen: myDontaionsScreen
},

Notification: {
  screen: NotificationScreen
},



    setting: {
      screen: SettingScreen
    },
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

import React, { Component } from 'react'
import { View, Platform, StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import { createStore } from 'redux'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { white, purple } from './utils/colors'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {setLocalNotification} from './utils/helpers'

const TabNavigator = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'AddDecks',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    }
   
  }, {
    navigationOptions: {
      headerShown: false
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);
const Tabs = createAppContainer(TabNavigator)

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: ({navigation}) => ({
      title: 'Deck Info',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    })
  },
}))

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store = {createStore(reducer)}>
        <View style={{ flex: 1 }} >
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { bluePrimary, blueAccent, grayBackground } from './utils/colors';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react'
//React Navigatiom
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//Components
import Deck from './components/Deck';
import CreateDeck from './components/CreateDeck';
import DeckList from './components/DeckList';
import { handleInitialData } from './actions/shared';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
//Redux
import {connect} from 'react-redux'
//Notifications
import { setLocalNotification } from './utils/helpers';




const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function DeckStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor}/>
    </View>
  )
}

function DeckTabs(){
  return(
    <Tab.Navigator
      barStyle = {{backgroundColor: bluePrimary}}
      tabBarOption = {{
        showIcon: false,
        activeTintColor: blueAccent,
        inactiveTintColor: grayBackground,
        labelStyle: {fontSize: 14},
        style: tabBarStyles
        }}
      screenOptions={tabScreenOptions}
      >
      <Tab.Screen name='DeckList' component = {DeckList} options = {{
        title: 'Deck List'
      }}/>
      <Tab.Screen name='CreateDeck' component = {CreateDeck} options = {{
        title: 'Create Deck'
      }}/>
    </Tab.Navigator>
  )
}


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
    setLocalNotification()
  }
  render() {
    return (
        <View style = {styles.container}>
          <DeckStatusBar backgroundColor = {bluePrimary} barStyle='light-content'/>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name = 'MobileFlashcards' component = {DeckTabs} options = {{
                headerStyle:{
                  backgroundColor: bluePrimary
                },
                headerTintColor: grayBackground,
                title: 'JM Mobile Flashcards',
                headerMode: 'none',
                headerShown: 'false'
              }}/>
              <Stack.Screen name = 'Deck' component = {Deck} options = {{
                headerStyle: {
                  backgroundColor: bluePrimary
                },
                headerTintColor: grayBackground
              }}/>
              <Stack.Screen name = 'AddCard' component = {AddCard} options = {{
                headerStyle: {
                  backgroundColor: bluePrimary
                },
                title: 'Add a Card',
                headerTintColor: grayBackground
              }}/>
              <Stack.Screen name = 'Quiz' component = {Quiz} options = {{
                headerStyle: {
                  backgroundColor: bluePrimary
                },
                headerTintColor: grayBackground
              }}/>

            </Stack.Navigator>
          </NavigationContainer>
        </View>
    )
  }
}

const tabScreenOptions = ({route}) => ({
  tabBarIcon: ({ focused, color, size }) => {
    switch(route.name) {
      case 'DeckList':
          return (<AntDesign name = 'questioncircle' size={15} color={color}/>)
      case 'CreateDeck':
          return (<AntDesign name='pluscircle' size={15} color={color}/>)
      default:
          return (<AntDesign name='exclamationcircle' size={15} color={color}/>)
    }
  },
})

const tabBarStyles = {

    height: 56,
    backgroundColor: bluePrimary,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 0.9
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grayBackground
  }
})

export default connect()(App)
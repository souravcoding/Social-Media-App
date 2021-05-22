import React, { useEffect, useState } from 'react'
import {StyleSheet,View,Text,ActivityIndicator, } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Landing from './components/Auth/Landing'
import * as firebase from 'firebase'

import Register from './components/Auth/Register'
import Main from './components/Main'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import Add from './components/main/Add'
import Login from './components/Auth/Login'
import Save from './components/main/Save'
import Comment from './components/main/Comment'

const firebaseConfig = {
    apiKey: "AIzaSyBMoP4fedep5aQ2Sg3u7QDoCjp-ADiBh1s",
    authDomain: "instagram-dev-f66b8.firebaseapp.com",
    projectId: "instagram-dev-f66b8",
    storageBucket: "instagram-dev-f66b8.appspot.com",
    messagingSenderId: "1059082593341",
    appId: "1:1059082593341:web:2aefc634da01d19ffa3654",
    measurementId: "G-CBC4DZRP1T"
  };


  if(firebase.apps.length===0){
      firebase.initializeApp(firebaseConfig)
  }

const stack=createStackNavigator()
const App = (props) => {
    const [loggedIn,setLoggedIn]=useState(false)
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            if(!user){
                setLoading(false)
                setLoggedIn(false)
            }else{
                setLoading(false)
                setLoggedIn(true)
            }
        })
    },[])


    if(loading){
        return <View style={styles.screen}>
        <ActivityIndicator color="black" size='large' />
        </View>
    }

    if(!loggedIn){
        return (
            <NavigationContainer>
            <stack.Navigator initialRouteName="landing">
             <stack.Screen name="landing" component={Landing} options={{headerShown:false}} />
             <stack.Screen name="register" component={Register} options={{headerShown:false}} />
             <stack.Screen name="login" component={Login} options={{headerShown:false}} />
            </stack.Navigator>
            </NavigationContainer>
         )
    }
    
    if(loggedIn){
        return (<Provider store={store}>
                 <NavigationContainer>
            <stack.Navigator initialRouteName="main" >
             <stack.Screen name="main" component={Main} options={{headerTitle:'Chatingoo..',headerTintColor:'white', headerStyle:{
                 backgroundColor:'black'
             }}} />
             <stack.Screen name="add" component={Add}  options={{headerTitle:'Chatingoo..',headerTintColor:'white', headerStyle:{
                 backgroundColor:'black'
             }}}  />
             <stack.Screen name="save" navigation={props.navigation} component={Save}  options={{headerTitle:'Chatingoo..',headerTintColor:'white', headerStyle:{
                 backgroundColor:'black'
             }}} />
             <stack.Screen name="comment" component={Comment}  options={{headerTitle:'Chatingoo..',headerTintColor:'white', headerStyle:{
                 backgroundColor:'black'
             }}} />

            </stack.Navigator>
            </NavigationContainer>
        </Provider>)
    }
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default App

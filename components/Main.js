import React, { Component, useEffect } from 'react'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, fetchUserFollowing, fetchUserPosts, signOut } from '../Redux/Actions/action';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Feed from './main/Feed';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Add from './main/Add';
import Profile from './main/Profile';
import Search from './main/Search';
const Tab=createMaterialBottomTabNavigator()

const Main = (props) => {
    // let color='red'

    const emptyScreen=()=>{
        return(null)
    }
     
    const currentUser=useSelector(state=>state.user.currentUser)
    const dispatch=useDispatch()
    

    useEffect(()=>{
        dispatch(signOut())
        dispatch(fetchUser())
        dispatch(fetchUserPosts())
        dispatch(fetchUserFollowing())
        
    },[])
    console.log( currentUser);
    return (
        <Tab.Navigator initialRouteName="feed" labeled={false}>
        <Tab.Screen name="feed" component={Feed}  
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons color={color} size={26} name="home" />
                   
                )
            }}
        />
          <Tab.Screen name="search" component={Search}  
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons color={color} size={26} name="magnify" />
                   
                )
            }}
        />
        
        <Tab.Screen name="addContainer" component={emptyScreen}  
        listeners={({navigation})=>({
            tabPress:e=>{
                e.preventDefault()
                navigation.navigate('add')
            }
        })}
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons color={color} size={26} name="plus-box" />
                   
                )
            }}
        />
        <Tab.Screen name="profile" component={Profile} 
         listeners={({navigation})=>({
            tabPress:e=>{
                e.preventDefault()
                navigation.navigate('profile',{uid:firebase.auth().currentUser.uid})
            }
        })} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons color={color} size={26} name="account-circle" />
                   
                )
            }}
        />
      </Tab.Navigator>
    )
}

export default Main


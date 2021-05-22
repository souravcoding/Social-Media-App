import React, { useState } from 'react'
import { View, Text,StyleSheet,FlatList,TextInput,TouchableOpacity, Touchable} from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
const Search = (props) => {
    const [users,setUsers]=useState([])

    const fetchUsers=(search)=>{
        firebase.firestore().collection('user')
        .where('name','>=' ,search).get    ()
        .then((snapshot)=>{
            let users=snapshot.docs.map(doc=>{
                let data=doc.data()
                let id=doc.id
                return {id,...data}
            })
            setUsers(users)
        })
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.heading}>Search User</Text>
            <TextInput style={styles.input}
            placeholder="search users.."
             onChangeText={(search)=>fetchUsers(search)} />
            
            <FlatList 
            data={users} 
            numColumns={1}
            renderItem={({item})=>{
                return <TouchableOpacity style={styles.result} onPress={()=>props.navigation.navigate('profile',{uid:item.id})}>
                <Text style={styles.text}>{item.name}</Text> 
                    </TouchableOpacity>
                    }}
                />
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'black'
    },
    input:{
        backgroundColor:'white',
        width:'80%',
        marginBottom:15,
        height:40,
        padding:10
    },
    result:{
        width:285,
        borderColor:'grey',
        borderWidth:1,
        marginVertical:5,
        padding:5
    },
    text:{
        color:'white',
        fontWeight:'800',
        fontSize:18
    },
    heading:{
        color:'white',
        fontWeight:'900',
        fontSize:20,
        marginBottom:10
    }
    
    
})

export default Search

import React, { useState } from 'react'
import { View,Text,Image, TextInput, StyleSheet, Button } from 'react-native'
import * as firebase from "firebase"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const handlePress = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log(result);
        }).catch((err) => console.log(err))
    }
    return (
        <View style={styles.screen}>
         <View style={styles.image_container}>
        <Text style={styles.text} >CHATINGOO..</Text>
            <Image style={styles.img} source={{uri:'https://freepngimg.com/thumb/chat/1-2-chat-png-image.png'}} />
            
        </View>
            <TextInput style={styles.input} value={email} onChangeText={(e) => setEmail(e)} placeholder="Enter Email" />
            <TextInput style={styles.input} value={password} onChangeText={(e) => setPassword(e)} placeholder="Enter password" />
        <View style={styles.btn}>
        <Button  title="Sign in" onPress={()=>handlePress(email,password)} />

        </View>

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
    img:{
        width:150,
        height:150
    },
    image_container:{
        alignItems:'center',
        marginBottom:20
    },
    text:{
        fontSize:30,
        color:'white',
        marginTop:10,
        fontWeight:'900'
    },
    btn:{
        width:'80%',
        
    },
    input:{
        backgroundColor:'white',
        width:'80%',
        marginBottom:15,
        height:40,
        padding:10
    }
})

export default Login

import React, { useState } from 'react'
import { View, TextInput,StyleSheet,Button,Image,Text } from 'react-native'
import * as firebase from "firebase"
const Register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState("")

    const handlePress=(name,email,password)=>{
        
        firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
            firebase.firestore().collection('user')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result);
        }).catch((err)=>console.log(err))

        
    }
    return (
        <View style={styles.screen}>
             <View style={styles.image_container}>
                <Text style={styles.text} >CHATINGOO..</Text>
                     <Image style={styles.img} source={{uri:'https://freepngimg.com/thumb/chat/1-2-chat-png-image.png'}} />
            
            </View>
            <TextInput style={styles.input} value={name} onChangeText={(e)=>setName(e)} placeholder="Enter your name" />
            <TextInput style={styles.input} value={email} onChangeText={(e)=>setEmail(e)} placeholder="Enter Email" />
            <TextInput style={styles.input} value={password} onChangeText={(e)=>setPassword(e)} placeholder="Enter password" />
            <View style={styles.btn}>
            <Button title="Sign up" onPress={()=>handlePress(name,email,password)} />

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


export default Register

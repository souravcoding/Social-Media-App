import React, { useState } from 'react'
import { View, TextInput,Image,StyleSheet,Button} from 'react-native'
import firebase from 'firebase'
require('firebase/firebase-firestore')
require('firebase/firebase-storage')
const Save = (props,{navigation}) => {
    const [caption,setCaption]=useState('')
    const path=`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    const savePost=async ()=>{
        const uri=props.route.params.image
        const response=await fetch(uri)
        const blob=await response.blob()

        const task=firebase.storage().ref().child(path).put(blob)

        const taskProgress=snapshot=>{
            console.log(`transferred: ${snapshot.bytesTransferred}`)

        }

        const taskComplete=()=>{
            task.snapshot.ref.getDownloadURL().then((snapshot)=>{
              saveTheData(snapshot)
                console.log(snapshot);
            })
        }

        const taskError=snapshot=>{
            console.log(snapshot);
        }

        task.on('state_changed',taskProgress,taskError,taskComplete)
    }

    const saveTheData=(downloadURL)=>{
        firebase.firestore().collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            creation:firebase.firestore.FieldValue.serverTimestamp()
        }).then((function (){
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
            <Image style={styles.img} source={{uri:props.route.params.image}} />
            <TextInput numberOfLines={2} style={styles.input} value={caption} onChangeText={(e)=>setCaption(e)} 
            placeholder="Write an Caption"
             />
            </View>
           
             <Button title='post' onPress={savePost}/>
        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'black'
    },
    img:{
        width:"100%",
        height:250
    },
    input:{
        // marginTop:10,
        // height:30,
        padding:10,
        backgroundColor:'white'
    }
})


export default Save

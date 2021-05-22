import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,FlatList,Image,Button, ColorPropType} from 'react-native'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {Ionicons} from '@expo/vector-icons'
import { log } from 'react-native-reanimated'
require('firebase/firestore')
const Feed = (props) => {
    const userFollowing=useSelector(state=>state.user.following)
    let feed=useSelector(state=>state.users.feed)
    const userLoaded=useSelector(state=>state.users.userLoaded)

    const [posts,setPosts]=useState([])
    useEffect(()=>{
        console.log('1');
        if(userLoaded==userFollowing.length && userFollowing.length!==0 ){
            console.log('2');
            
            feed.sort(function(x,y){
                return x.creation-y.creation
            })
            setPosts(feed)
            
        }
        console.log('============FEEDSSSS========================');
        console.log(posts);
        
    },[userLoaded,feed])
    
    
    
    console.log('============posts========================');
    console.log(posts);
    console.log('====================================');

    const onDislike=(uid,postid)=>{
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postid)
        .collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .delete()
    }
    const onLike=(uid,postid)=>{
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postid)
        .collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .set({})

        console.log('like');
    }
    return (
        <View style={styles.screen}>
            <View style={styles.images}>

                <FlatList data={posts} renderItem={({item})=>(
                    <View style={styles.image_container}>
                    <Text style={styles.text}> {item.user.name}</Text>
                    
                    <Image style={styles.img} source={{uri:item.downloadURL}} />
                    
                    <View style={styles.status}>

                    {item.userLike ? 
                        <Ionicons onPress={()=>onDislike(item.user.uid,item.id)}  name="heart" size={35} color="red" />
                    :  <Ionicons onPress={()=>onLike(item.user.uid,item.id)} name="heart-outline" size={35} color="white" />

                     }
                     <Ionicons  onPress={()=>props.navigation.navigate('comment',{
                        postId:item.id,
                        uid:item.user.uid
                    })} name="chatbox-ellipses-outline" 
                    size={35} color="white" />
                    </View>
                    <View style={styles.captionContainer}>
                    <Text style={styles.username}> {item.user.name} : </Text>
                    <Text style={styles.caption}> {item.caption}</Text>
                    </View>
                  
                    </View>
                )} />
                
                
               </View>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        // marginTop:30,
        // marginHorizontal:20,
        backgroundColor:'black'
    },
   
    images:{
       flex:1
    },
    image_container:{
        flex:1,
        width:"100%",
        marginVertical:15,
        backgroundColor:'black'
    },
    img:{
            // flex:1,
            height:300,
            // aspectRatio:1/1
        
    },
    text:{
        backgroundColor:'black',
        color:'white',
        padding:10,
        fontSize:20,
     
    },
    status:{
        width:'30%',
        marginVertical:10,
        flexDirection:'row',
        justifyContent:"space-between",
        backgroundColor:'black',
        paddingHorizontal:10
    },
    captionContainer:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'black',
        paddingHorizontal:10
    },
    caption:{
        color:'white',
        // padding:10,
        fontSize:15,
        marginBottom:5
    },
    username:{
        color:'white',
        // padding:10,
        fontSize:15,
    }

})

export default Feed

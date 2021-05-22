import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,FlatList,Image,Button} from 'react-native'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
require('firebase/firestore')
const Profile = (props) => {
    const userFollowing=useSelector(state=>state.user.following)
    const [userPosts,setUserPosts]=useState([])
    const [user,setUser]=useState(null)
    const posts=useSelector(state=>state.user.posts)
    const currentUser=useSelector(state=>state.user.currentUser)
    const [following,setFollowing]=useState(false)
    useEffect(()=>{
        if(props.route.params.uid===firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }else{
            firebase.firestore().collection("user").doc(props.route.params.uid).get().then((snapshot) => {

                if (snapshot.exists) {
                    setUser(snapshot.data())
                    
                }
                else {
                    console.log('does not exist')
                }
            }).catch((err)=>console.log(err))

            firebase.firestore().collection("posts")
            .doc(props.route.params.uid)
            .collection('userPosts')
            .orderBy('creation','asc')
            .get().then((snapshot) => {
                let posts=snapshot.docs.map(doc=>{
                    let data=doc.data()
                    let id=doc.id
                    return {id,...data}
                })
                setUserPosts(posts)
                
                }).catch((err)=>console.log(err))
        }

        if(userFollowing.indexOf(props.route.params.uid)>-1){
            setFollowing(true)
        }else{
            setFollowing(false)
        }
    },[props.route.params.uid,userFollowing])
    if(user===null){
        return <View />
    }

    const onFollow=()=>{
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid).set({})
    }

    const onUnfollow=()=>{
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid).delete()
    }

    const onLogout=()=>{
        firebase.auth().signOut()
    }

    return (
        <View style={styles.screen}>
            <View style={styles.info}>
            <Text style={styles.details}>{user.name}</Text>
            <Text style={{...styles.details,marginBottom:10}}>{user.email}</Text>
            
            {props.route.params.uid!==firebase.auth().currentUser.uid ? 
             (
                 <View style={styles.btn}>
                 {following ?
                 (
                    <Button 
                    title="Following"
                    onPress={onUnfollow}
                     />
                 ):
                 (
                    <Button 
                    title="Follow"
                    onPress={onFollow}
                     />
                 )
                 }
                 </View>
              ): <Button  color="red"
                    title="logout"
                    onPress={onLogout}
                     />
            }
                </View>
           <Text style={styles.line}></Text>
            <View style={styles.images}>
                <FlatList data={userPosts} horizontal={false} numColumns={3} renderItem={({item})=>(
                     <View style={styles.image_container}>
                    <Image source={{uri:item.downloadURL}} style={styles.img} />
                    </View>
                )}/>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        // marginTop:40,
        backgroundColor:'black'
    },
    info:{
        padding:20,
        
    },
    images:{
        flex:1
    },
    image_container:{
        flex:1/3
    },
    img:{
            flex:1,
            aspectRatio:1/1
        
    },
    btn:{
        width:200,
        marginLeft:70,
        
    },
    line:{
        borderColor:'white',
        borderBottomWidth:2,
        marginBottom:20
    },
    details:{
        color:'white',
        fontSize:18,

    }

})

export default Profile

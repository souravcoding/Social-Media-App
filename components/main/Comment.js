import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,FlatList,Button,TextInput } from 'react-native'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersData } from '../../Redux/Actions/action'
require('firebase/firestore')
const Comment = (props) => {
    const [comment,setComment]=useState([])
    const [postId,SetPostId]=useState('')
    const [text,setText]=useState('')
    const dispatch=useDispatch()
    const users=useSelector(state=>state.users.users)
    useEffect(()=>{

        const matchUserToComments=(comment)=>{
            for (let i = 0; i < comment.length; i++) {
                if(comment[i].hasOwnProperty('user')){
                    continue;
                }
                const user=users.find(user=>user.uid===comment[i].creator)
                if(user==undefined){
                    dispatch(fetchUsersData(comment[i].creator,false))
                }else{
                    comment[i].user=user
                }
                
            }
            setComment(comment)
        }

        if(props.route.params.postId!==postId){
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .get()
            .then((snapshot)=>{
                let comments=snapshot.docs.map(doc=>{
                    let data=doc.data()
                    let id=doc.id
                    return {
                        ...data,
                        id
                    }
                })
                matchUserToComments(comments)
                
            })
            SetPostId('props.route.params.postId')
        }else{
            matchUserToComments(comments)
        }


    },[props.route.params.postId,users])

    const onCommentSend=()=>{
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator:firebase.auth().currentUser.uid,
                text
            })
    }
    return (
        <View style={styles.screen}>
            <FlatList data={comment} renderItem={({item})=>(
                <View style={styles.comments}>
                {item.user!==undefined ?  
                <Text style={styles.username}>
                    {item.user.name} :
                </Text> : null
                }
                <Text style={styles.text}>{item.text}</Text>
                </View>
            )} />
            <View style={styles.input}>
                <TextInput  style={styles.textInput}
                placeholder='write your comment'
                value={text}
                onChangeText={(e)=>setText(e)} />
                <View style={styles.btn_container}>
                <Button style={styles.btn}  onPress={onCommentSend} 
                    title="post"
                />
                </View>
                
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        backgroundColor:'black',
        flex:1,
        justifyContent:'space-between',
        
    },
    input:{
        flexDirection:'row',
        height:40,
        alignItems:'flex-end'
    },
    textInput:{
        width:"80%",
        padding:4,
        paddingHorizontal:10,
        fontSize:20,
        color:'black',
        backgroundColor:'white'
    },
    btn_container:{
        width:'20%',
    },
    comments:{
        flexDirection:'row',
        marginVertical:8
    },
    text:{
        color:'white',
        fontSize:15,
        marginHorizontal:5
    },
    username:{
        color:'white',
        fontSize:15,
        marginHorizontal:5
    }

})


export default Comment

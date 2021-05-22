import React from 'react'
import { View, Text,StyleSheet,Button,Image} from 'react-native'

const Landing = (props) => {
    return (
        <View style={styles.screen}>
        <View style={styles.image_container}>
        <Text  style={styles.heading} >WELCOME </Text>
        <Text  style={styles.heading} >To</Text>
        <Text style={styles.text} >CHATINGOO..</Text>
            <Image style={styles.img} source={{uri:'https://freepngimg.com/thumb/chat/1-2-chat-png-image.png'}} />
            
        </View>
        <View style={styles.btn_container}>
         
            <View style={styles.btn}>
            <Button  title="login" onPress={()=>props.navigation.navigate('login')} />

            </View>
            <View style={styles.btn}>
            <Button color="red" title="register" onPress={()=>props.navigation.navigate('register')} />

                </View>
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
    heading:{
        fontSize:40,
        textAlign:'center',
        color:'grey',
        
        fontWeight:'900'
    },
    btn_container:{
        flexDirection:'row',
        width:200,
        justifyContent:'space-between'
    },
    btn:{
        width:80
    }
})

export default Landing

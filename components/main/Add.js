import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button,Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons,Entypo,AntDesign,MaterialIcons} from '@expo/vector-icons'
export default function Add({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
    const [image,setImage]=useState(null)
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');

      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission===null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission===false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture=async ()=>{
    if(camera){
        const data=await camera.takePictureAsync(null)
        setImage(data.uri)
        console.log('====================================');
        console.log(data.uri);
        console.log('====================================');
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
      <View style={{flex:1}}>
    <View style={styles.cameraContainer} >
      <Camera style={styles.ratio} type={type} ratio={"1:1"}
      ref={ref=>setCamera(ref)}
       />
    </View>
    <View style={styles.icon}>
    <MaterialIcons  onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }} name="flip-camera-ios" size={40} color="black" />
          <Entypo onPress={takePicture} name="picasa" size={40} color="black" />
          <AntDesign onPress={pickImage} name="picture" size={40} color="black" />
    </View>
         
            {image ? <Image style={styles.img} source={{uri:image}}/> : <View  style={styles.img} > 
            <Text style={styles.text}>No Image Selected Yet</Text>
            </View>}
            <Button  onPress={()=>navigation.navigate('save',{image})} title="Post" />

          </View>
  );
}

const styles=StyleSheet.create({
    cameraContainer:{
        // flex:1,
        height:'42%',
        flexDirection:'row'
    },
    ratio:{
      // flex:1,
      width:'100%',
        // aspectRatio:1
    },
    icon:{
      flexDirection:'row',
      marginTop:10,
      marginBottom:0,
      width:'100%',
      height:'8%',
      justifyContent:'space-evenly'
    },
    img:{
      alignItems:'center',
      justifyContent:'center',
     
      width:'100%',
      height:'42%'
    },
    text:{
      fontSize:25
    }
})
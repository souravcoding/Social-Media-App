import firebase from 'firebase'
require('firebase/firestore')

console.ignoredYellowBox = ['Warning: setting'];

export function fetchUser() {
    return ((dispatch,getState) => {
        firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {

                if (snapshot.exists) {
                    // console.log(snapshot.data());
                    dispatch({ type: "USER_STATE_CHANGE", currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            }).catch((err)=>console.log(err))
            
    }) 
}



export function fetchUserPosts() {
    return ((dispatch) => {
        console.log('yo yo');
        firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creation','asc')
        .get().then((snapshot) => {
            let posts=snapshot.docs.map(doc=>{
                let data=doc.data()
                let id=doc.id
                return {id,...data}
            })
            // console.log(posts);
            dispatch({ type: "USER_POST_CHANGE", posts:posts })
            }).catch((err)=>console.log(err))
    })
}


export function fetchUserFollowing() {
    return ((dispatch) => {
        console.log('yeppi');
        firebase.firestore().collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) => {
            let following=snapshot.docs.map(doc=>{
                let data=doc.data()
                let id=doc.id
                return id
            })
            console.log(following);
            dispatch({ type: "USER_FOLLOWING_CHANGE", following:following })
            for (let i = 0; i < following.length; i++) {
                dispatch(fetchUsersData(following[i],true))
                
            }

            })
    })
}



export const fetchUsersData=(uid,getPost)=>{
    return ((dispatch,getState)=>{
        const found=getState().users.users.some(el=>el.uid===uid)

        if(!found){
            firebase.firestore().collection("user").doc(uid).get().then((snapshot) => {

                if (snapshot.exists) {
                    // console.log(snapshot.data());
                    let user=snapshot.data()
                    user.uid=snapshot.id
                    dispatch({ type: "USERS_STATE_CHANGE", user })
                  
                }
                else {
                    console.log('does not exist')
                }
            })
            if(getPost){
                dispatch(fetchUserFollowingPosts(uid))
            }
            
           
        }   
        
    })
   
}



export function fetchUserFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
              
                const user = getState().users.users.find(el => el.uid === uid);


                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                })
                for (let i = 0; i < posts.length; i++) {
                    dispatch(fetchUserFollowingLikes(uid,posts[i].id))
                    
                }

                dispatch({ type: "USERS_POST_CHANGE" , posts, uid })
            })
    })
}

export function fetchUserFollowingLikes(uid,postid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .doc(postid)
            .collection('likes')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
              
                let userLike=false
                if(snapshot.exists){
                    userLike=true
                }
                

                dispatch({ type: "USERS_LIKES_CHANGE" , postid, userLike })
            })
    })
}


export const signOut=()=>{
    return {
        type:'LOGOUT'
    }
}
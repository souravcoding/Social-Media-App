const initalState={
    currentUser:null,
    posts:[],
    following:[]
}
export const UserReducer=(state=initalState,action)=>{
            switch (action.type) {
                case "USER_STATE_CHANGE":
                    return {
                        ...state,
                        currentUser:action.currentUser
                    }
                case "USER_POST_CHANGE":
                    return {
                        ...state,
                        posts:action.posts
                    }
                case "USER_FOLLOWING_CHANGE":
                    return {
                        ...state,
                        following:action.following
                    }
                case "LOGOUT":
                    return initial_state
                default:
                    return state
            }
            
    
}
initial_state={
    users:[],
    feed:[],
    userLoaded:0
}

const Users=(state=initial_state,action)=>{
    switch (action.type) {
        case "USERS_STATE_CHANGE":
            return {
                ...state,
                users:[...state.users,action.user]
            }
        case "USERS_POST_CHANGE":
            return {
                ...state,
                userLoaded:state.userLoaded+1,
               feed:[...state.feed,...action.posts]
            }

         case "USERS_LIKES_CHANGE":
            return {
                    ...state,
                   feed:state.feed.map(post=>post.id===action.postid ? 
                    {...post,userLike:action.userLike} : post
                    )
                }
        case "LOGOUT":
            return initial_state
        default:
            return state
    }
}

export default Users




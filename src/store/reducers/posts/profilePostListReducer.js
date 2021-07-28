import userPosts from "../../../data/profile/UserPosts";

const profilePostListReducer = (state = userPosts, action) => {
    switch(action.type) {
        case "UPDATE_PROFILE_POST":
            return action.payload;
        case "REMOVE_PROFILE_POST":
            return action.payload;
        default:
            return state;
    }
};

export default profilePostListReducer;
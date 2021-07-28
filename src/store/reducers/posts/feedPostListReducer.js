import allPosts from "../../../data/home/AllPosts";

const feedPostListReducer = (state = allPosts, action) => {
    switch(action.type) {
        case "UPDATE_FEED_POST":
            return action.payload;
        case "REMOVE_FEED_POST":
            return action.payload;
        default:
            return state;
    }
};

export default feedPostListReducer;
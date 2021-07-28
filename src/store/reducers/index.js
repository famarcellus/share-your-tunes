import { combineReducers } from "redux";
import artistsListReducer from "./music/artistListReducer";
import tracksListReducer from "./music/trackListReducer";
import albumsListReducer from "./music/albumListReducer";
import friendsListReducer from "./friends/friendsListReducer";
import blockListReducer from "./friends/blockListReducer";
import profilePostListReducer from "./posts/profilePostListReducer";
import feedPostListReducer from "./posts/feedPostListReducer";
import userReducer from "./user/userReducer";

const reducers = combineReducers({
    artistsList: artistsListReducer,
    tracksList: tracksListReducer,
    albumsList: albumsListReducer,
    friendsList: friendsListReducer,
    blockList: blockListReducer,
    profilePostList : profilePostListReducer,
    feedPostList: feedPostListReducer,
    userData: userReducer
});

export default reducers;
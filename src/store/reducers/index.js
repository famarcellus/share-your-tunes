import { combineReducers } from "redux";
import artistsListReducer from "./music/artistListReducer";
import tracksListReducer from "./music/trackListReducer";
import albumsListReducer from "./music/albumListReducer";
import friendsListReducer from "./friends/friendsListReducer";
import blockListReducer from "./friends/blockListReducer";

const reducers = combineReducers({
    artistsList: artistsListReducer,
    tracksList: tracksListReducer,
    albumsList: albumsListReducer,
    friendsList: friendsListReducer,
    blockList: blockListReducer
});

export default reducers;
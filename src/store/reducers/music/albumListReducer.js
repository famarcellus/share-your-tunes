import { albumsData } from "../../../data/profile/MusicData";

const albumsListReducer = (state = albumsData, action) => {
    switch(action.type) {
        case "REMOVE_ALBUM":
            return action.payload;
        case "ADD_ALBUM":
            return action.payload;
        default:
            return state;
    }
};

export default albumsListReducer;
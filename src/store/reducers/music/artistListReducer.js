import { artistsData } from "../../../data/profile/MusicData";

const artistsListReducer = (state = artistsData, action) => {
    switch(action.type) {
        case "REMOVE_ARTIST":
            return action.payload;
        case "ADD_ARTIST":
            return action.payload;
        default:
            return state;
    }
};

export default artistsListReducer;
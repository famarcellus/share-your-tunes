import { data } from "../../../data/profile/MusicData";

const { tracksData } = data;
const tracksListReducer = (state = tracksData, action) => {
    switch(action.type) {
        case "REMOVE_TRACK":
            return action.payload;
        case "ADD_TRACK":
            return action.payload;
        default:
            return state;
    }
};

export default tracksListReducer;
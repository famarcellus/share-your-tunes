import { data } from "../../../data/profile/FriendsData";

const { friendsData } = data;
const friendsListReducer = (state = friendsData, action) => {
    switch(action.type) {
        case "REMOVE_FRIEND":
            return action.payload;
        default:
            return state;
    }
};

export default friendsListReducer;
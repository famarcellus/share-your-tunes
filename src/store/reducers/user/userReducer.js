import userData from "../../../data/profile/UserData";

const userReducer = (state = userData, action) => {
    switch(action.type) {
        case "UPDATE_USER":
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
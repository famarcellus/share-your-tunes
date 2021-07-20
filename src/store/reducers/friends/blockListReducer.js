const blockListReducer = (state = [], action) => {
    switch(action.type) {
        case "BLOCK_USER":
            return action.payload;
        case "UNBLOCK_USER":
            return action.payload;
        default:
            return state;
    }
};

export default blockListReducer;
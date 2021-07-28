export const removeArtist = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_ARTIST",
            payload: list
        });
    }
}

export const removeTrack = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_TRACK",
            payload: list
        });
    }
}

export const removeAlbum = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_ALBUM",
            payload: list
        });
    }
}

export const removeFriend = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_FRIEND",
            payload: list
        });
    }
}

export const blockUser = (list) => {
    return (dispatch) => {
        dispatch({
            type: "BLOCK_USER",
            payload: list
        });
    }
}

export const unblockUser = (list) => {
    return (dispatch) => {
        dispatch({
            type: "UNBLOCK_USER",
            payload: list
        });
    }
}

export const updateProfilePost = (list) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_PROFILE_POST",
            payload: list
        });
    }
}

export const removeProfilePost = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_PROFILE_POST",
            payload: list
        });
    }
}

export const updateFeedPost = (list) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_FEED_POST",
            payload: list
        });
    }
}

export const removeFeedPost = (list) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_FEED_POST",
            payload: list
        });
    }
}

export const updateUser = (obj) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_USER",
            payload: obj
        });
    }
}


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
/********* UserInfo component functions BEGIN *********/

export function BioSuccess() {
    const { message } = require("antd");
    message.success("Successfully changed bio", 1);
}

export function BioEditVisibility(targetArray, visible, setVisible) {
    if(!visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("not-visible");
                targetRef.current.classList.remove("fade-out");
                targetRef.current.classList.add("visible");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.remove("fade-out");
                targetRef.current.resizableTextArea.textArea.classList.add("visible");
            }
           
        })
        setVisible(true);
    }

    if(visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("visible");
                targetRef.current.classList.add("not-visible");
                targetRef.current.classList.add("fade-out");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("visible");
                targetRef.current.resizableTextArea.textArea.classList.add("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.add("fade-out");
            }
            
        })
        setVisible(false);
    }
}

export function ChangeEditValue(e, setInputValFn, setCharValueFn, CHAR_LIMIT) {

    if(e.target.value.length <= CHAR_LIMIT) {
        setInputValFn(e.target.value);
        setCharValueFn(CHAR_LIMIT - e.target.value.length);
    }

    if(e.target.value.length > CHAR_LIMIT) {
        setInputValFn(e.target.value.slice(0,100));
        setCharValueFn(0);
    }
}

export function ApplyNewBio(editVal, setEditValFn, bioVal, setBioValFn, bioArray, setVisibileFn, setCharFn, CHAR_LIMIT) {
    setBioValFn(editVal);
    setEditValFn("");
    BioEditVisibility(bioArray, true, setVisibileFn);
    setCharFn(CHAR_LIMIT);
    BioSuccess();
}

export function ClearEditField(val, setValFn, setCharFn, CHAR_LIMIT) {
    if(val !== "") {
        setValFn("");
        setCharFn(CHAR_LIMIT);
    }

    return val;
}

export function KeepButtonsVisible(xRef, checkRef) {
    const refList = [xRef, checkRef];
    refList.forEach((targetRef) => {
        targetRef.current.classList.remove("not-visible");
        targetRef.current.classList.add("visible");
    })
}


export function ChangeImage(imageFile, setImageFn, userDataObj, setImageExistsFn) {
    const { message } = require("antd");
    
    if(!imageFile) {
        message.error(`${imageFile.name} file upload failed.`);
        return;
    }

    // Image isn't actually uploaded, this code ensures message is only displayed once
    if(imageFile.file.status === "error") {
        let url = URL.createObjectURL(imageFile.file.originFileObj);
        setImageFn({...userDataObj, imgSrc: url});
        setImageExistsFn(true);
        message.success("Succesfully added NEW profile picture!");
        return;
    }
}

export function BeforeUpload(file) {
    const { message } = require("antd");

    const isJpgOrPng = file.type === "image/jpeg"|| file.type === "image/png";
    if(!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLess2M = file.size / 1024 / 1024 < 2;
    if(!isLess2M) {
        message.error("Image must be smaller than 2MB!");
    }

    return isJpgOrPng && isLess2M;
}

export function RemoveImage(setImageFn, userDataObj, setImageExistsFn) {
    const { message } = require("antd");
    message.success("Successfully removed your profile picture!");
    setImageFn({...userDataObj, imgSrc: ""});
    setImageExistsFn(false);
}

/********* UserInfo component functions ENDS *********/

/********* MusicInterests component functions BEGINS *********/

export function RemoveItem(list, index) {
    const newList = list.filter((item, i) => {
        return i !== index;
    })
    return newList;
}

export function CalculateData(artistList, trackList, albumList) {
    const entireList = [...artistList, ...trackList, ...albumList];
    if(entireList.length === 0) {
        return [];
    }

    var counts = {}, max = 0;
    for (var v in entireList) {
        counts[entireList[v].artist ]= (counts[entireList[v].artist] || 0) + 1;
        if (counts[entireList[v].artist] > max) { 
        max = counts[entireList[v].artist];
        }
    }

    var sortedCounts = [];
    for (const person in counts) {
        sortedCounts.push({"artist": person, "count": counts[person]});
    }
    sortedCounts.sort((a,b) => {
        return b.count - a.count;
    });

    var results = sortedCounts.slice(0,3);
    return results;
}
/********* MusicInterests component functions ENDS *********/

/********* Friends component functions BEGINS *********/
export function Unblock(blockList, index, unblockUserFn) {
    const { message } = require("antd");
    message.success(`Successfully unblocked "${blockList[index]}"`);
    const updatedList = RemoveItem(blockList, index);
    unblockUserFn(updatedList);
}

export function RemoveFriendFromList(friendsList, idx, name) {
    const updatedList = RemoveItem(friendsList, idx);
    return updatedList;
}

export function AddToBlockList(blockList, name){
    const newBlockList = blockList.slice();
    newBlockList.push(name);
    return newBlockList;
}

/********* Friends component functions ENDS *********/

/********* Posts component functions BEGINS *********/

export function DisplayRelativeTime(date, currentDate) {
    const { formatDistance } = require("date-fns");
    return formatDistance(date, currentDate, { addSuffix: true }).toString();
}

export function generatedId() {
    const min = Math.ceil(1);
    const max = Math.floor(20000);
    return Math.floor(Math.random() * (max - min) + min);
}

export function findNameInObject(targetName, array) {
    if(array.length > 0) {
        for(const person of array) {
            for(const key of Object.keys(person)) {
                if(person[key] === targetName) {
                    return Object.create(person);
                }
            }
        }
    }
    
    return null;
}

export function UpdatePostLikes(sourceObj, allPostsArray, targetIndex) {
    const copyForPosts = allPostsArray.slice();
    if(sourceObj.likedByUser) {
        copyForPosts[targetIndex] = {...sourceObj, likedByUser: false, likes: sourceObj.likes - 1};
    }
    if(!sourceObj.likedByUser) {
        copyForPosts[targetIndex] = {...sourceObj, likedByUser: true, likes: sourceObj.likes + 1};
    }
    return copyForPosts;
}

export function UpdateCommentLikes(sourceObj, allPostsArray, targetIndex) {
    const copyForComments = allPostsArray.slice();
    const postIndex = allPostsArray.findIndex(post => post.postId === sourceObj.postId);
    let targetComment = copyForComments[postIndex].comments[targetIndex];

    if(targetComment.likedByUser) {
        copyForComments[postIndex].comments[targetIndex]= {...targetComment, likedByUser: false, likes: targetComment.likes - 1};
    }
    if(!targetComment.likedByUser) {
        copyForComments[postIndex].comments[targetIndex]= {...targetComment, likedByUser: true, likes: targetComment.likes + 1}
    }
    return copyForComments;    
}


export function RemovePost(allPosts, idx) {
    const { message } = require("antd");
    message.success(`Removed post`);
    const updatedList = RemoveItem(allPosts, idx);
    return updatedList;
}

export function AddPost(allPosts, value, userData) {
    const { formatRelative } = require("date-fns");
    const timePosted = formatRelative(new Date(), new Date());
    const relativeTime = DisplayRelativeTime(new Date(), new Date());
    const updatedList = allPosts.slice();
    updatedList.unshift({
        poster: userData.name,
        avatar: userData.imgSrc,
        content: value,
        timePosted: timePosted.toString(),
        relativeTime: relativeTime.toString(),
        likes: 0,
        likedByUser: false, 
        comments: [],
        postId: generatedId(),
        postCreatorId: userData.userId
    });
    return updatedList;
}

export function AddComment(allPosts, value, userData, idx) {
    const { formatRelative } = require("date-fns");
    const timePosted = formatRelative(new Date(), new Date());
    const relativeTime = DisplayRelativeTime(new Date(), new Date());
    const updatedList = allPosts.slice();
    updatedList[idx].comments.unshift({
        commenter: userData.name,
        avatar: userData.imgSrc,
        content: value,
        timePosted: timePosted.toString(),
        relativeTime: relativeTime.toString(),
        likes: 0,
        likedByUser: false, 
        commentId: generatedId(),
    });
    console.log(updatedList);
    return updatedList;
}

/********* Posts component functions ENDS *********/


import React, { useState } from "react";
import "./Posts.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import { Comment, Tooltip, Avatar, Menu, Popconfirm, Dropdown, Modal, Input, message, Button } from "antd";
import UpvoteFilledIcon from "../../assets/posts/upvote-filled.svg";
import UpvoteUnfilledIcon from "../../assets/posts/upvote-unfilled.svg";
import MoreIcon from "../../assets/profile/more.svg";
import CommentIcon  from "../../assets/posts/comment.svg";
import BlockUserIcon from "../../assets/posts/block-user.svg";
import TrashIcon from "../../assets/posts/trash.svg";
import ProfileIcon from "../../assets/profile/profile.svg";
import { RemovePost, UpdatePostLikes, UpdateCommentLikes, AddComment, RemoveFriendFromList, AddToBlockList } from "../../utilities/Utils";

const { TextArea } = Input;

function HandlePostRemoval(e, allPostsList, index, removePostFn) {
    e.preventDefault();
    const newPostList = RemovePost(allPostsList, index);
    removePostFn(newPostList);
}

function HandleBlockUser(e, allPostsList, index, friendsList, removePostFn, removeFriendFn, blockUserFn, blockList) {
    e.preventDefault();
    const posterName = allPostsList[index].poster;
    const friendIdx = friendsList.findIndex(obj => obj.name === posterName);
    const newFriendsList = RemoveFriendFromList(friendsList, friendIdx, posterName);
    removeFriendFn(newFriendsList);
    const newBlockList = AddToBlockList(blockList, posterName);
    blockUserFn(newBlockList);
    HandlePostRemoval(e, allPostsList, index, removePostFn);
}

function HandleLikes(postObject, updatePostFn, allPosts, type, index) {
    let updatedPosts;
    switch(type) {
        case "post":
            updatedPosts = UpdatePostLikes(postObject, allPosts, index);
            updatePostFn(updatedPosts);
            break;
        case "comment":
            updatedPosts = UpdateCommentLikes(postObject, allPosts, index);
            updatePostFn(updatedPosts);
            break;
        default:
            return null;
    }
}

function HandleAddComment(e, updatePostFn, profilePosts, value, setValue, userData, idx) {
    e.preventDefault();
    if(value === "") {
        message.warning("Comment must contain content!");
        return false;
    }
    const updatedPosts = AddComment(profilePosts, value, userData, idx);
    updatePostFn(updatedPosts);
    setValue("");
    message.success("Added NEW Comment!");
    return true;
}

function Posts({ allPosts, poster, avatar, content, timePosted, relativeTime, likes, likedByUser, comments, postId, postCreatorId, index, updatePost, removePost }) {

    const [value, setValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const [userData, friendsList, blockList] = useSelector((state) => [
        state.userData,
        state.friendsList,
        state.blockList
    ]);
    const { blockUser, removeFriend } = bindActionCreators(actionCreators, dispatch);


    const postObject = { poster, content, timePosted, relativeTime, likes, likedByUser, comments, postId };

    const menu = (
        <Menu>
            {postCreatorId === userData.userId ?
            <Menu.Item key="0">
                <Popconfirm className="trash-option" title="Are you sure?" okText="Yes" cancelText="No" onConfirm={(e) => (HandlePostRemoval(e, allPosts, index, removePost))}>
                        <Button type="link" danger block={true} size="small">Remove Post<img className="trash-icon" src={TrashIcon} width="18px" height="18px" alt="Trash icon"></img></Button>
                </Popconfirm>
            </Menu.Item> 
             : 
            <Menu.Item key="0">
                <Popconfirm className="block-option" title="Are you sure?" okText="Yes" cancelText="No" onConfirm={(e) => HandleBlockUser(e, allPosts, index, friendsList, removePost, removeFriend, blockUser, blockList)}>
                        <Button type="link" danger block={true} size="small">Block This User<img className="block-icon" src={BlockUserIcon} width="25px" height="25px" alt="Block icon"></img></Button>
                </Popconfirm>
            </Menu.Item>}
        </Menu>
    )

    const postActions = [
        <Tooltip key="like-button" title="Like">
            <h4><img onClick={() => HandleLikes(postObject, updatePost, allPosts, "post", index)} className="upvote-icon action-icon"     
            src={likedByUser ? UpvoteFilledIcon : UpvoteUnfilledIcon} alt="Likes icon"></img> {likes}</h4>
        </Tooltip>,
        <Tooltip key="comment-button" title="Comment">
            <img className="comment-icon action-icon" onClick={() => setIsModalVisible(true)} src={CommentIcon} alt="Comment Icon"></img>
        </Tooltip>,
        <Tooltip key="more-button" title="More options">
            <Dropdown overlay={menu} trigger={["click"]}>
                <img className="more-button" src={MoreIcon} width="16px" height="16px" alt="More icon"></img>
            </Dropdown>
        </Tooltip>
    ];

    function CheckToggleModal(e) {
        const accepted = HandleAddComment(e, updatePost, allPosts, value, setValue, userData, index)
        if(accepted) {
            setIsModalVisible(false);
        }
    }

    return (
        <section className="post-section">
            <Modal className="comment-modal" title="Add Your Comment" visible={isModalVisible} onOk={(e) => CheckToggleModal(e)} 
            onCancel={() => setIsModalVisible(false)} okText="Add Comment">
                <TextArea className="input-field" allowClear={true} showCount maxLength="100" rows={2} onChange={(e) => setValue(e.target.value)} value={value}
                placeholder="Type your comment here!" onPressEnter={(e) => CheckToggleModal(e)}>
                </TextArea>
            </Modal>
            <div className="original-poster">
                <Comment 
                    actions={postActions}
                    author={<p>{poster}</p>}
                    avatar={
                        <Avatar
                            src={avatar ? avatar : ProfileIcon}
                            alt="Avatar"
                        />
                    }
                    content={<p>{content}</p>}
                    datetime={
                        <Tooltip title={timePosted}>
                            <p>{relativeTime}</p>
                        </Tooltip>
                    }
                >
                    {comments.length !== 0 && comments.map((comment, idx) =>
                        <Comment
                            actions={
                            [<Tooltip key="like-button" title="Like">
                                <h4><img onClick={() => HandleLikes(postObject, updatePost, allPosts, "comment", idx)} className="upvote-icon action-icon" 
                                src={comment.likedByUser ? UpvoteFilledIcon : UpvoteUnfilledIcon} alt="Like Icon"></img> {comment.likes}</h4>
                            </Tooltip>]}
                            author={<p>{comment.commenter}</p>}
                            avatar={
                            <Avatar 
                                src={comment.avatar ? comment.avatar : ProfileIcon}
                                alt="Avatar"
                            />}
                            content={<p>{comment.content}</p>}
                            datetime={
                                <Tooltip title={comment.timePosted}>
                                    <p>{comment.relativeTime}</p>
                                </Tooltip>
                            }
                            key={comment.commentId.toString()}
                        />
                    )}        
                </Comment>
            </div>
        </section>
    )
}

export default Posts;
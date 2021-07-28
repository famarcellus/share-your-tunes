import React, { useState } from "react";
import Posts from "../Posts";
import "./ProfilePosts.scss";
import { Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/actionCreators";
import { AddPost } from "../../../utilities/Utils";

const { TextArea } = Input;

function HandleCreatePost(e, updateProfilePost, allProfilePosts, value, setValueFn, userData) {
    e.preventDefault();
    if(value === "") {
        message.warning("Posts must contain content!");
        return;
    }
    const updatedList = AddPost(allProfilePosts, value, userData)
    updateProfilePost(updatedList);
    setValueFn("");
    message.success("Added NEW post!");
}

function ProfilePosts() {
    const [ value, setValue ] = useState("");

    const dispatch = useDispatch();
    const [profilePosts, userData] = useSelector((state) => [
        state.profilePostList,
        state.userData
    ]);
    const { updateProfilePost, removeProfilePost } = bindActionCreators(actionCreators, dispatch);
    
    return (
        <section className="profile-posts-section">
            <div className="create-section">
                <TextArea className="input-field" allowClear={true} showCount maxLength="100" rows={2} onChange={(e) => setValue(e.target.value)} value={value}
                placeholder="Want to share something with the world?" onPressEnter={(e) => HandleCreatePost(e, updateProfilePost, profilePosts, value, setValue, userData)}>
                </TextArea>
                <Button className="post-button" type="primary" onClick={(e) => HandleCreatePost(e, updateProfilePost, profilePosts, value, setValue, userData)}>Add Post</Button>
            </div>
            {profilePosts.length !== 0 ? profilePosts.map((post, index) => {
                return (
                    <Posts
                    allPosts={profilePosts}
                    poster={post.poster}
                    avatar={userData.imgSrc}
                    content={post.content}
                    timePosted={post.timePosted}
                    relativeTime={post.relativeTime}
                    likes={post.likes}
                    likedByUser={post.likedByUser}
                    comments={post.comments}
                    key={post.postId.toString()}
                    postId={post.postId}
                    postCreatorId={post.postCreatorId}
                    index={index}
                    updatePost={updateProfilePost}
                    removePost={removeProfilePost}
                    />
            )
            }) 
            : <h2 className="empty-posts">No posts yet</h2> }
        </section>
    )
}

export default ProfilePosts;
import React from "react";
import Posts from "../Posts";
import "./FeedPosts.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/actionCreators";


function ProfilePosts() {

    const dispatch = useDispatch();
    const [feedPosts] = useSelector((state) => [
        state.feedPostList,
    ]);
    const { updateFeedPost, removeFeedPost } = bindActionCreators(actionCreators, dispatch);
    
    return (
        <section className="feed-posts-section">
            {feedPosts.length !== 0 ? feedPosts.map((post, index) => {
                return (
                    <Posts
                    allPosts={feedPosts}
                    poster={post.poster}
                    avatar={post.avatar}
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
                    updatePost={updateFeedPost}
                    removePost={removeFeedPost}
                    />
            )
            }) 
            : <h2 className="empty-posts">No posts yet</h2> }
        </section>
    )
}

export default ProfilePosts;
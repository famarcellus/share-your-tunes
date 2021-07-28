import React from "react";
import "./Home.scss";
import FeedPosts from "../../components/posts/feed_posts/FeedPosts";

function Home() {
    return (
        <main className="home-page page">
            <FeedPosts />
        </main>
    )
}

export default Home;

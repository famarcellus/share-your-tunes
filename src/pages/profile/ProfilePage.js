import React from "react";
import "./ProfilePage.scss";
import { UserInfo } from "../../components/user_info/UserInfo";
import MusicInterests from "../../components/music_interests/MusicInterests";
import Friends from "../../components/friends/Friends";
import ProfilePosts from "../../components/posts/profile_posts/ProfilePosts";

function ProfilePage() {
    return (
        <main className="profile-page page">
            <div className="left-side">
                <UserInfo />
                <MusicInterests />
                <Friends />
            </div>
            <div className="right-side">
                <ProfilePosts />
            </div>
            
        </main>
    )
}

export default ProfilePage;
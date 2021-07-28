import React from "react";
import "./ProfilePage.scss";
import { UserInfo } from "../../components/user_info/UserInfo";
import MusicInterests from "../../components/music_interests/MusicInterests";
import Friends from "../../components/friends/Friends";
import ProfilePosts from "../../components/posts/profile_posts/ProfilePosts";

function ProfilePage() {
    return (
        <main className="profile-page page">
            <UserInfo />
            <MusicInterests />
            <Friends />
            <ProfilePosts />
        </main>
    )
}

export default ProfilePage;
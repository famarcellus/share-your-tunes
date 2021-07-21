import React from "react";
import "./ProfilePage.scss";
import { UserInfo } from "../../components/user_info/UserInfo";
import MusicInterests from "../../components/music_interests/MusicInterests";
import Friends from "../../components/friends/Friends";

function ProfilePage() {
    return (
        <main className="profile-page">
            <UserInfo />
            <MusicInterests />
            <Friends />
        </main>
    )
}

export default ProfilePage;
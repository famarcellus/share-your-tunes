import React from "react";
import "./ProfilePage.scss";
import { UserInfo } from "../components/user_info/UserInfo";
import MusicInterests from "../components/music_interests/MusicInterests";

function ProfilePage() {
    return (
        <main className="profile-page">
            <UserInfo />
            <MusicInterests />
        </main>
    )
}

export default ProfilePage;
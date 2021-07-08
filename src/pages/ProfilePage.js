import React from "react";
import "./ProfilePage.scss";
import { UserInfo } from "../components/user_info/UserInfo";

function ProfilePage() {
    return (
        <main className="profile-page">
            <UserInfo />
        </main>
    )
}

export default ProfilePage;
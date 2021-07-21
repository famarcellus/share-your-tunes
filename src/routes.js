import React from "react";

const Home = React.lazy(() => import("./pages/home/Home.js"));
const Profile = React.lazy(() => import("./pages/profile/ProfilePage.js"));
const Music = React.lazy(() => import("./pages/music_search/Music.js"));

const routes = [
    { path: "/", exact: true, name: "Home", component: Home},
    { path: "/profile", name: "Profile", component: Profile},
    { path: "/music", name: "Music", component: Music }
];

export default routes;
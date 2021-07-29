import React from "react";
import "./Music.scss";
import SearchMusic from "../../components/search_music/SearchMusic";

function Music() {
    return (
        <main className="music-page page">
            <SearchMusic/>
        </main>
    )
}

export default Music;
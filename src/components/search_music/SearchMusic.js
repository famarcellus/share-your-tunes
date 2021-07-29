import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "./SearchMusic.scss";
import MusicResult from "../music_results/MusicResult";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import { message } from "antd";

function CheckIfUndefined(val) {
    if(typeof val !== "undefined") {
        return true;
    }
    if(typeof val === "undefined") {
        return false;
    }
}

function FindArtist(targetArtist, artistsList) {
    const found = artistsList.find(obj => obj.artist === targetArtist);
    return CheckIfUndefined(found);
}

function FindTrack(targetArtist, targetTrack, tracksList) {
    const found = tracksList.find(obj => {
        return obj.artist === targetArtist && obj.trackName === targetTrack;
    });
    return CheckIfUndefined(found);
}

function FindAlbum(targetArtist, targetAlbum, albumList) {
    const found = albumList.find(obj => {
        return obj.artist === targetArtist && obj.albumName === targetAlbum;
    });
    return CheckIfUndefined(found);
}

function HandleAddArtist(artistName, imgSrc, artistsList, AddArtistFn) {
    const copyList = artistsList.slice();
    copyList.unshift({
        artist: artistName,
        src: imgSrc
    });
    AddArtistFn(copyList);
    message.success(`Added Artist: "${artistName}" to profile`);
}

function HandleAddTrack(artistName, trackName, imgSrc, tracksList, AddTrackFn) {
    const copyList = tracksList.slice();
    copyList.unshift({
        artist: artistName,
        trackName: trackName,
        imgSrc: imgSrc
    });
    AddTrackFn(copyList);
    message.success(`Added Track: "${artistName + " - " + trackName}" to profile`);
}

function HandleAddAlbum(artistName, albumName, imgSrc, albumsList, AddAlbumFn) {
    const copyList = albumsList.slice();
    copyList.unshift({
        artist: artistName,
        albumName: albumName,
        imgSrc: imgSrc
    });
    AddAlbumFn(copyList);
    message.success(`Added Album: "${artistName + " - " + albumName}" to profile`);
}

function SearchMusic() {
    const placeHolder = "Search for artists, tracks, and albums";
    const [searchVal, setSearchVal] = useState("");
    const [results, setResults] = useState([]);
    const [artistsList, tracksList, albumsList] = useSelector((state) => [
        state.artistsList,
        state.tracksList,
        state.albumsList
    ]);
    const dispatch = useDispatch()
    const { AddArtist, AddTrack, AddAlbum } = bindActionCreators(actionCreators, dispatch);
    console.log(results);
    

    function onSearch() {
        axios.request({...options, params: {q: searchVal}})
        .then((response) => { 
            setResults(response.data.data) 
        })
        .catch((error) => console.log(error));
        setSearchVal("");
    }

    const options = {
        method: "GET",
        url: "https://deezerdevs-deezer.p.rapidapi.com/search",
        params: {q: ""},
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_APIKEY,
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    return (
        <div className="search-section">
            <SearchBar 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeHolder={placeHolder}
                onSearch={(val) => onSearch(val)}
            />
            <h3 className="explanation">You can add music interests to your profile page from here!</h3>
            <section className="results-section">
            {results.length !== 0 ? results.map((musicResult, idx) => {
                const { artist: { name: artistName } } = musicResult;
                const { title_short: trackName } = musicResult;
                const { album } = musicResult;

                return (
                    <MusicResult 
                        key={musicResult.id} 
                        artistName={artistName} 
                        trackName={trackName}
                        album={album}
                        audioPreview={musicResult.preview}
                        musicExists={{
                            artist: FindArtist(artistName, artistsList),
                            track: FindTrack(artistName, trackName, tracksList),
                            album: FindAlbum(artistName, album.title, albumsList)
                        }}
                        addArtist={() => HandleAddArtist(artistName, musicResult.artist.picture_medium, artistsList, AddArtist)}
                        addTrack={() => HandleAddTrack(artistName, trackName, album.cover, tracksList, AddTrack)}
                        addAlbum={() => HandleAddAlbum(artistName, album.title, album.cover, albumsList, AddAlbum)}
                    />
                )
            }) : <h1>Search above!</h1>}
            </section>
        </div>
    )
}

export default SearchMusic;
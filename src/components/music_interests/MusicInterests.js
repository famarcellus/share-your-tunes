import React, { useRef, useState, useEffect } from "react";
import "./MusicInterests.scss";
import Artist from "./artist/Artist";
import Track from "./track/Track";
import Album from "./album/Album";
import { data } from "../../data/profile/MusicData";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function RemoveItem(list, index, setList) {
    const newList = list.filter((item, i) => {
        return i !== index;
    })
    setList(newList);
}

function MusicInterests() {
    const { artistsData, tracksData, albumsData } = data;
    const [ artistList, setArtistList ] = useState(artistsData);
    const [ trackList, setTrackList ] = useState(tracksData);
    const [ albumList, setAlbumList ] = useState(albumsData);

    return (
        <section className="user-music-section">
            <Tabs defaultActiveKey="artists">
                <TabPane className="artists-section sub-section" tab="Artists" key="artists">
                    {artistList.length !== 0 ? artistList.map((item, index) => {
                        return (<Artist name={item.name} imgSrc={item.src} artistList={artistList} index={index} removeFn={RemoveItem} setArtistList={setArtistList}/>)
                    }) : <h2 className="empty-artists empty">No artists added yet!</h2> }
                </TabPane>
                <TabPane className="tracks-section sub-section" tab="Tracks" key="tracks">
                    {trackList.length !== 0 ? trackList.map((item, index) => {
                        return (<Track artist={item.artist} trackName={item.trackName} imgSrc={item.imgSrc} trackList={trackList} index={index} removeFn={RemoveItem} setTrackList={setTrackList}/>)
                    }) : <h2 className="empty-tracks empty">No tracks added yet!</h2> }
                </TabPane>
                <TabPane className="albums-section sub-section" tab="Albums" key="albums">
                    {albumList.length !== 0 ? albumList.map((item, index) => {
                        return (<Album artist={item.artist} albumName={item.albumName} imgSrc={item.imgSrc} albumList={albumList} index={index} removeFn={RemoveItem} setAlbumList={setAlbumList}/>)
                    }) : <h2 className="empty-albums empty">No albums added yet!</h2> }
                </TabPane>
            </Tabs>
        </section>
    )
}

export default MusicInterests;
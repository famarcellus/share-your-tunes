import React, { useRef, useState, useEffect } from "react";
import "./MusicInterests.scss";
import Artist from "./artist/Artist";
import Track from "./track/Track";
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
    const { artistsData, tracksData } = data;
    const [ artistList, setArtistList ] = useState(artistsData);
    const [ trackList, setTrackList ] = useState(tracksData);

    return (
        <section className="user-music-section">
            <Tabs defaultActiveKey="artists">
                <TabPane className="artists-section" tab="Artists" key="artists">
                    {artistList.length !== 0 ? artistList.map((item, index) => {
                        return (<Artist name={item.name} imgSrc={item.src} artistList={artistList} index={index} removeFn={RemoveItem} setArtistList={setArtistList}/>)
                    }) : <h2 className="empty-artists empty">No artists added yet!</h2> }
                </TabPane>
                <TabPane tab="Tracks" key="tracks">
                    Tracks go here
                </TabPane>
                <TabPane tab="Albums" key="albums">
                    Albums go here
                </TabPane>
            </Tabs>
        </section>
    )
}

export default MusicInterests;
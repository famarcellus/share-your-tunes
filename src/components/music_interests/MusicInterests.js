import React, { useState, useEffect } from "react";
import "./MusicInterests.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import Artist from "./artist/Artist";
import Track from "./track/Track";
import Album from "./album/Album";
import { Tabs } from "antd";
import { CalculateData, RemoveItem } from "../../utilities/Utils";
import MusicChart from "./MusicChart";

const { TabPane } = Tabs;

function MusicInterests() {
    const [artistsList, tracksList, albumsList] = useSelector((state) => [
        state.artistsList,
        state.tracksList,
        state.albumsList
    ]);
    const dispatch = useDispatch()
    const { removeArtist, removeTrack, removeAlbum } = bindActionCreators(actionCreators, dispatch);

    const topMentions = CalculateData(artistsList, tracksList, albumsList);
    const [ graphData, setGraphData] = useState(topMentions);
    useEffect(() => {
        let newGraphData = CalculateData(artistsList, tracksList, albumsList);
        setGraphData(newGraphData);
    }, [artistsList, tracksList, albumsList])

    return (
        <section className="user-music-section">
            <Tabs defaultActiveKey="artists">
                <TabPane className="artists-section sub-section" tab="Artists" key="artists">
                    {artistsList.length !== 0 ? artistsList.map((item, index) => {
                        return (<Artist key={item.artist} artist={item.artist} imgSrc={item.src} artistsList={artistsList} index={index} removeFn={RemoveItem} removeArtist={removeArtist} />)
                    }) : <h2 className="empty-artists empty">No artists added yet!</h2> }
                </TabPane>
                <TabPane className="tracks-section sub-section" tab="Tracks" key="tracks">
                    {tracksList.length !== 0 ? tracksList.map((item, index) => {
                        return (<Track key={item.artist} artist={item.artist} trackName={item.trackName} imgSrc={item.imgSrc} tracksList={tracksList} index={index} removeFn={RemoveItem} removeTrack={removeTrack} />)
                    }) : <h2 className="empty-tracks empty">No tracks added yet!</h2> }
                </TabPane>
                <TabPane className="albums-section sub-section" tab="Albums" key="albums">
                    {albumsList.length !== 0 ? albumsList.map((item, index) => {
                        return (<Album key={item.artist} artist={item.artist} albumName={item.albumName} imgSrc={item.imgSrc} albumsList={albumsList} index={index} removeFn={RemoveItem} removeAlbum={removeAlbum} />)
                    }) : <h2 className="empty-albums empty">No albums added yet!</h2> }
                </TabPane>
            </Tabs>
            {graphData.length !== 0 ? <MusicChart pieData={graphData} className="chart"/> : <h3 className="no-chart-message">Add Artists, Tracks, and Albums to generate a top artist mentions chart!</h3> }
        </section>
    )
}

export default MusicInterests;
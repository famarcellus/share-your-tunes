import React from "react";
import "./Track.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar } from "antd";

const { Meta } = Card;

function Track({ artist, trackName, imgSrc, audioSrc, trackList, index, removeFn, setTrackList }) {

    return (
        <div className="track-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={artist}/>} title={`${artist} - ${trackName}`}/>
                <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon" 
                    onClick={() => {removeFn(trackList, index, setTrackList)}}>
                </img>
            </Card>
        </div>
    )
}

export default Track;
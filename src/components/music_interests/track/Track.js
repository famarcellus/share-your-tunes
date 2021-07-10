import React from "react";
import "./Track.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar, Popconfirm, message } from "antd";

const { Meta } = Card;

function Track({ artist, trackName, imgSrc, trackList, index, removeFn, setTrackList }) {

    const success = () => {
        message.success(`Removed "${artist} - ${trackName}" from Track List`);
        removeFn(trackList, index, setTrackList);
    }

    return (
        <div className="track-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={artist}/>} title={`${artist} - ${trackName}`}/>
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => success()}>
                    <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon"> 
                    </img>
                </Popconfirm>
            </Card>
        </div>
    )
}

export default Track;
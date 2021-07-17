import React from "react";
import "./Artist.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar, Popconfirm, message } from "antd";

const { Meta } = Card;


function Artist({ artist, imgSrc, artistList, index, removeFn, setArtistList }) {

    const success = () => {
        message.success(`Removed "${artist}" from Artist List`);
        removeFn(artistList, index, setArtistList);
    }

    return (
        <div className="artist-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={artist}/>} title={artist}/>
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => success()}>
                    <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon"> 
                    </img>
                </Popconfirm>
            </Card>
        </div>
    )
}

export default Artist;
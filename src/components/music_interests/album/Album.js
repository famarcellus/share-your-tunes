import React from "react";
import "./Album.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar } from "antd";

const { Meta } = Card;

function Album({ artist, albumName, imgSrc, albumList, index, removeFn, setAlbumList }) {

    return (
        <div className="album-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={artist}/>} title={`${artist} - ${albumName}`}/>
                <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon" 
                    onClick={() => {removeFn(albumList, index, setAlbumList)}}>
                </img>
            </Card>
        </div>
    )
}

export default Album;
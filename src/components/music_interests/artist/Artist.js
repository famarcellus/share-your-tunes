import React from "react";
import "./Artist.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar } from "antd";

const { Meta } = Card;

function Artist({ name, imgSrc, artistList, index, removeFn, setArtistList }) {

    return (
        <div className="artist-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc}/>} title={name}/>
                <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon" 
                    onClick={() => {removeFn(artistList, index, setArtistList)}}>
                </img>
            </Card>
        </div>
    )
}

export default Artist;
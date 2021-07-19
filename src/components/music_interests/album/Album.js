import React from "react";
import "./Album.scss"
import x_mark from "../../../assets/profile/x_mark.svg";
import { Card, Avatar, Popconfirm, message } from "antd";

const { Meta } = Card;

function Album({ artist, albumName, imgSrc, albumsList, index, removeFn, removeAlbum}) {

    const success = () => {
        message.success(`Removed "${artist} - ${albumName}" from Album List`);
        const updatedList = removeFn(albumsList, index);
        removeAlbum(updatedList);
    }

    return (
        <div className="album-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={artist}/>} title={`${artist} - ${albumName}`}/>
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => success()}>
                    <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon"> 
                    </img>
                </Popconfirm>
            </Card>
        </div>
    )
}

export default Album;
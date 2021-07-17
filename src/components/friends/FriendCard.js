import React from "react";
import x_mark from "../../assets/profile/x_mark.svg";
import { Card, Avatar, Popconfirm, message } from "antd";
import "./FriendCard.scss";

const { Meta } = Card;

function FriendCard({ name, imgSrc, friendsList, index, removeFn, setFriendsList }) {

    const success = () => {
        message.success(`Removed "${name}" from Friends List`);
        removeFn(friendsList, index, setFriendsList);
    }

    return (
        <div className="friend-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={name}/>} title={name} />
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => success()}>
                    <img className="x-mark" src={x_mark} width="20px" height="20px" alt="X icon"></img>
                </Popconfirm>
            </Card>
        </div>
        
    )
}

export default FriendCard;
import React from "react";
import x_mark from "../../assets/profile/x_mark.svg";
import more_icon from "../../assets/profile/more.svg";
import { Card, Avatar, Popconfirm, message, Menu, Dropdown } from "antd";
import "./FriendCard.scss";

const { Meta } = Card;



function FriendCard({ name, imgSrc, friendsList, index, removeFn, removeFriend, blockList, blockUser }) {

    function success(e, action) {
        e.preventDefault();
        switch(action) {
            case "Remove":
                message.success(`Removed "${name}" from Friends List`);
                const updatedList = removeFn(friendsList, index);
                removeFriend(updatedList);
                break;
            case "Block":
                message.success(`Blocked "${name}"`);
                const newBlockList = blockList.map(x => x);
                newBlockList.push(name);
                blockUser(newBlockList);
                
                const target = friendsList.find(x => x.name === name);
                if(friendsList.includes(target)) {
                    const newFriendList = removeFn(friendsList, index);
                    removeFriend(newFriendList);
                    break;
                }
            default: 
                return;
        }
        
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={(e) => (success(e, "Remove"))}>
                        <a href="#">Remove</a>
                </Popconfirm>
            </Menu.Item>
            <Menu.Item key="1">
                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={(e) => (success(e, "Block"))}>
                        <a href="#">Block</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="friend-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={name}/>} title={name} />
                <Dropdown overlay={menu} trigger={["click"]}>
                    <img className="more-icon" src={more_icon} width="14px" height="14px" alt="More icon"></img>
                </Dropdown>
            </Card>
        </div>
        
    )
}

export default FriendCard;
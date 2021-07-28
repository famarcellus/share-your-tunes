import React from "react";
import more_icon from "../../assets/profile/more.svg";
import TrashIcon from "../../assets/posts/trash.svg";
import BlockUserIcon from "../../assets/posts/block-user.svg";
import { Card, Avatar, Popconfirm, message, Menu, Dropdown, Tooltip, Button } from "antd";
import { RemoveFriendFromList, AddToBlockList } from "../../utilities/Utils";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import "./FriendCard.scss";

const { Meta } = Card;

function HandleFriendRemoval(e, friendsList, idx, removeFriendFn, friendName) {
    e.preventDefault();
    const newFriendsList = RemoveFriendFromList(friendsList, idx, friendName);
    removeFriendFn(newFriendsList);
    message.success(`Removed "${friendName}" from Friends List`);
}

function HandleBlockUser(e, blockList, blockUserFn, friendsList, name, removeFriendFn, idx ) {
    e.preventDefault();
    const newBlockList = AddToBlockList(blockList, name);
    blockUserFn(newBlockList);

    const target = friendsList.find(x => x.name === name);
    if(friendsList.includes(target)) {
        const newFriendList = RemoveFriendFromList(friendsList, idx, name);
        removeFriendFn(newFriendList);
    }
    message.success(`Blocked "${name}"`);
}

function FriendCard({ name, imgSrc, index }) {

    const [friendsList, blockList] = useSelector((state) => [
        state.friendsList,
        state.blockList
    ]);
    const dispatch = useDispatch();
    const { removeFriend, blockUser } = bindActionCreators(actionCreators, dispatch);

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Popconfirm className="trash-option" title="Are you sure?" okText="Yes" cancelText="No" 
                onConfirm={(e) => HandleFriendRemoval(e, friendsList, index, removeFriend, name)}>
                        <Button type="link" danger block={true}>Remove Friend<img className="trash-icon" src={TrashIcon} width="18px" height="18px" alt="Trash Icon"></img></Button>
                </Popconfirm>
            </Menu.Item>
            <Menu.Item key="1">
                <Popconfirm className="block-option" title="Are you sure?" okText="Yes" cancelText="No" 
                onConfirm={(e) => HandleBlockUser(e, blockList, blockUser, friendsList, name, removeFriend, index)}>
                        <Button type="link" danger block={true}>Block User<img className="block-icon" src={BlockUserIcon} width="25px" height="25px" alt="Block Icon"></img></Button>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="friend-card">
            <Card size="small">
                <Meta avatar={<Avatar src={imgSrc} alt={name}/>} title={name} />
                <Tooltip key="more-button" title="More options">
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <img className="more-icon" src={more_icon} width="14px" height="14px" alt="More icon"></img>
                    </Dropdown>
                </Tooltip>
            </Card>
        </div>
        
    )
}

export default FriendCard;
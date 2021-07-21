import React, { useState } from "react"
import "./Friends.scss"
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import FriendCard from "./FriendCard";
import FriendIcon from "../../assets/profile/friend.svg";
import { RemoveItem, Unblock } from "../../utilities/Utils";
import { Button, Drawer } from "antd";


function Friends() {
    const [friendsList, blockList] = useSelector((state) => [
        state.friendsList,
        state.blockList
    ]);
    const dispatch = useDispatch();
    const { removeFriend, blockUser, unblockUser } = bindActionCreators(actionCreators, dispatch);

    const [visible, setVisible] = useState(false);

    return (
        <section className="friends-section">
            <h1 className="title">
                Friends
                <img className="icon" alt="friend icon" src={FriendIcon} width="32px" height="32px"></img>
                <Button className="blocked-users" type="primary" size="small" onClick={() => setVisible(true)} danger ghost>View Blocked Users</Button>
            </h1>
            <div className="card-section">
                {friendsList.length !== 0 ? friendsList.map((item, index) => {
                    return (<FriendCard name={item.name} imgSrc={item.imgSrc} friendsList={friendsList} index={index} removeFn={RemoveItem} removeFriend={removeFriend} blockList={blockList} blockUser={blockUser}></FriendCard>)
                }) : <h2 className="empty-friends">No friends yet!</h2>}
            </div>
            <Drawer
                className="blocked-section"
                title="Blocked Users"
                placement="bottom"
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
                >
                {blockList.length !== 0 ? blockList.map((friendName, index) => {
                    return (<p className="user">{`${friendName}`}<Button className="unblock-btn" type="primary" onClick={() => Unblock(blockList, index, unblockUser)}size="small" danger>Unblock</Button></p>)
                }) : <h2 className="empty-blocked" data-testid="empty-blocked">You don't have any users blocked</h2>}
            </Drawer>
        </section>
        
    )
}

export default Friends;
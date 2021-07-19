import React, { useState } from "react"
import "./Friends.scss"
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import FriendCard from "./FriendCard";
import FriendIcon from "../../assets/profile/friend.svg";
import { RemoveItem } from "../../utilities/Utils";


function Friends() {
    const friendsList = useSelector((state) => state.friendsList);
    const dispatch = useDispatch();
    const { removeFriend } = bindActionCreators(actionCreators, dispatch);

    return (
        <section className="friends-section">
            <h1 className="title">Friends<img className="icon" alt="friend icon" src={FriendIcon} width="32px" height="32px"></img></h1>
            <div className="card-section">
                {friendsList.length !== 0 ? friendsList.map((item, index) => {
                    return (<FriendCard name={item.name} imgSrc={item.imgSrc} friendsList={friendsList} index={index} removeFn={RemoveItem} removeFriend={removeFriend}></FriendCard>)
                }) : <h2 className="empty-friends">No friends yet!</h2>}
            </div>
        </section>
        
    )
}

export default Friends;
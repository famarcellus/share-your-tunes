import React from "react";
import { Menu } from 'antd';
import { HomeIcon, MusicIcon, HamburgerIcon } from "../../assets/navbar/Icons";
import profileIcon from "../../assets/profile/profile.svg";
import "./Navbar.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ Link }) {
    const { pathname } = useLocation();

    const [userData, friendsList, blockList] = useSelector((state) => [
        state.userData,
        state.friendsList,
        state.blockList
    ]);


    return (
        <header className="navbar">
            <Menu selectedKeys={pathname} mode="horizontal" overflowedIndicator={<HamburgerIcon />} triggerSubMenuAction="click">
                <Menu.Item key="/profile" data-testid="profile">
                    <img className="profile-image" src={!userData.imgSrc ? profileIcon : userData.imgSrc} width="30px" height="30px" alt="Profile Icon"></img>
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="/" icon={<HomeIcon />} data-testid="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/music" icon={<MusicIcon />} data-testid="music">
                    <Link to="/music">Music</Link>
                </Menu.Item>
            </Menu>
        </header>
    )
}

export { Navbar };
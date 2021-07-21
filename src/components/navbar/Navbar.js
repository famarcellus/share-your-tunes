import React from "react";
import { Menu } from 'antd';
import { ProfileIcon, HomeIcon, MusicIcon, HamburgerIcon } from "../../assets/navbar/Icons";
import "./Navbar.scss";

function Navbar({ Link, location }) {
    const { pathname } = location();
    
    return (
        <header className="navbar">
            <Menu selectedKeys={pathname} mode="horizontal" overflowedIndicator={<HamburgerIcon />} triggerSubMenuAction="click">
                <Menu.Item key="/profile" icon={<ProfileIcon />} data-testid="profile">
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
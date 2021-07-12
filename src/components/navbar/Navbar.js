import React, { useState } from "react";
import { Menu } from 'antd';
import { ProfileIcon, HomeIcon, MusicIcon, HamburgerIcon } from "../../assets/navbar/Icons";
import "./Navbar.scss";

function Navbar() {
    const [header, setHeader] = useState({ current: "home" })

    function HandleClick(e) {
        setHeader({current: e.key});
    }

    
    return (
        <header className="navbar">
            <Menu onClick={HandleClick} selectedKeys={header.current} mode="horizontal" overflowedIndicator={<HamburgerIcon />} triggerSubMenuAction="click">
                <Menu.Item key="profile" icon={<ProfileIcon />} data-testid="profile">
                    Profile
                </Menu.Item>
                <Menu.Item key="home" icon={<HomeIcon />} data-testid="home">
                    Home
                </Menu.Item>
                <Menu.Item key="music" icon={<MusicIcon />} data-testid="music">
                    Music
                </Menu.Item>
            </Menu>
        </header>
    )
}

export { Navbar };
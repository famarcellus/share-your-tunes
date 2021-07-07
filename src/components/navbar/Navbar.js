import React, { useState, useRef, useEffect} from "react";
import { Menu } from 'antd';
import { ProfileIcon, HomeIcon, MusicIcon } from "../../assets/navbar/Icons";
import "./Navbar.scss";

function Navbar() {
    const [header, setHeader] = useState({ current: "home" })

    function HandleClick(e) {
        setHeader({current: e.key});
    }

    return (
        <header className="navbar">
            <Menu onClick={HandleClick} selectedKeys={header.current} mode="horizontal">
                <Menu.Item key="profile" icon={<ProfileIcon />}>
                    Profile
                </Menu.Item>
                <Menu.Item key="home" icon={<HomeIcon />}>
                    Home
                </Menu.Item>
                <Menu.Item key="music" icon={<MusicIcon />}>
                    Music
                </Menu.Item>
            </Menu>
        </header>
    )
}

export { Navbar };
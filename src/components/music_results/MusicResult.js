import React from "react";
import { Card, Button, Tooltip, Dropdown, Menu } from "antd";
import "./MusicResult.scss";

const { Meta } = Card;

function MusicResult({ artistName, trackName, album, audioPreview, musicExists, addArtist, addTrack, addAlbum}) {

    const menu = (
        <Menu>
            <Menu.Item key="artist">
                <Button type="link" block={true} disabled={musicExists.artist} 
                size="small" onClick={addArtist}>Add Artist</Button>
            </Menu.Item>
            <Menu.Item key="track">
                <Button type="link" block={true} disabled={musicExists.track} 
                size="small" onClick={addTrack}>Add Track</Button>
            </Menu.Item>
            <Menu.Item key="album">
                <Button type="link" block={true} disabled={musicExists.album} 
                size="small" onClick={addAlbum}>Add Album</Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <Card className="music-result-card"
            cover={<img className="image" src={album.cover} alt={artistName + "'s track cover"}></img>}
            actions={[
                <Tooltip key="add-music" title="Add">
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button>Add to Profile</Button>
                    </Dropdown>
                </Tooltip>
            ]}
        >
            <Meta 
                title={artistName + " - " +  trackName}
                description=
                {   
                    <audio className="audio" controls controlsList="nodownload">
                        <source src={audioPreview} type="audio/mpeg"/>
                        Your browser does not support the audio tag.
                    </audio>
                } 
            />
        </Card>
    )
}

export default MusicResult;

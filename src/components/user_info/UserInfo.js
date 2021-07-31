import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/actionCreators";
import "./UserInfo.scss";
import { Input, Tooltip, Button, Upload } from 'antd';
import ImgCrop from "antd-img-crop";
import data from "../../data/profile/Bio";
import editIcon from "../../assets/profile/edit_button.svg";
import checkMarkIcon from "../../assets/profile/check_mark.svg";
import xMarkIcon from "../../assets/profile/x_mark.svg";
import profileIcon from "../../assets/profile/profile.svg";
import { BioEditVisibility, ChangeEditValue, ApplyNewBio, ClearEditField, KeepButtonsVisible, ChangeImage, 
    BeforeUpload, RemoveImage } from "../../utilities/Utils";

const { TextArea } = Input;
const CHAR_LIMIT = 100;

function UserInfo() {
    const [ bioValue, setBioValue ] = useState(data.bio);
    const [ editIsVisible, setEditIsVisible ] = useState(false);
    const [ editValue, setEditValue ] = useState("");
    const [ charactersLeft, setCharactersLeft ] = useState(100);
    const [ profileImageExists, setProfileImageExists ] = useState(false);
    const EditFieldRef = useRef(null);
    const CharactersRef = useRef(null);
    const XMarkRef = useRef(null);
    const CheckMarkRef = useRef(null);
    const bioRefArray = [ EditFieldRef, CharactersRef, XMarkRef, CheckMarkRef ];

    const dispatch = useDispatch()
    const [userData] = useSelector((state) => [
        state.userData,
    ]);
    const { imgSrc } = userData;
    const { updateUser } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        if(bioValue === "") {
            setBioValue("No bio has been added yet!");
        }
    
    }, []);

    useEffect(() => {
        if(bioValue === "") {
            setBioValue("No bio has been entered here yet!")
        }
        if(!charactersLeft) {
            CharactersRef.current.style.color = "red";
        }
        if(charactersLeft) {
            CharactersRef.current.style.color = "white";
        }

    }, [bioValue, charactersLeft])


    return (
        <section className="info-section">
            {/* <img className="profile-pic" alt="Profile icon" src={!profileImageExists ? profileIcon : imgSrc}></img>  */}
            <img className="profile-pic" alt="Profile icon" src={!userData.imgSrc ? profileIcon : userData.imgSrc}></img> 
            <ImgCrop>
                <Upload beforeUpload={BeforeUpload} showUploadList={false} onChange={(file) => ChangeImage(file, updateUser, userData, setProfileImageExists)}>
                    <Button className="upload-button" type="primary" size="small" ghost>Change Profile Image</Button>
                </Upload>
            </ImgCrop>
            {profileImageExists && <Button type="primary" size="small" danger ghost onClick={() => {RemoveImage(updateUser, userData, setProfileImageExists)}}>Remove Image</Button>}
            <h1 className="user-name">Steve Rogers</h1>
            <div className="bio-section">
                <h2 className="user-bio" data-testid="bio">
                    {bioValue}
                    <Tooltip title="Click to edit bio" color="blue">
                        <img className="edit-button" src={editIcon} alt="Edit button" onClick={() => BioEditVisibility(bioRefArray, editIsVisible, setEditIsVisible)} data-testid="edit-button"></img>
                    </Tooltip>
                    </h2>
                <div className="edit-section">
                    <TextArea className="not-visible" rows={3} placeholder="Enter new bio here!" ref={EditFieldRef} data-testid="edit-field"
                        value={editValue} onChange={(e) => ChangeEditValue(e, setEditValue, setCharactersLeft, CHAR_LIMIT)}
                    />
                    <h3 className="character-limit not-visible" ref={CharactersRef}>
                            {charactersLeft} characters remaining
                            <pre>
                                <Tooltip title="Clear text" placement="bottom" color="red" onVisibleChange={() => KeepButtonsVisible(XMarkRef, CheckMarkRef)}>
                                    <img className="x-mark not-visible" src={xMarkIcon} alt="X button" ref={XMarkRef} 
                                        onClick={() => {ClearEditField(editValue, setEditValue, setCharactersLeft, CHAR_LIMIT)}} data-testid="x-mark">
                                    </img>
                                </Tooltip>
                                <Tooltip title="Apply changes" placement="bottom" color="green" onVisibleChange={() => KeepButtonsVisible(XMarkRef, CheckMarkRef)}>
                                    <img className="check-mark not-visible" src={checkMarkIcon} alt="Check Mark button" ref={CheckMarkRef} 
                                        onClick={(e) => {ApplyNewBio(editValue, setEditValue, bioValue, setBioValue, bioRefArray, setEditIsVisible, setCharactersLeft, CHAR_LIMIT)}}>
                                    </img>
                                </Tooltip>                               
                            </pre>
                        </h3>
                </div>
            </div>   
        </section>
        
    )
}

export { UserInfo }
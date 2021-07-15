import React, { useState, useEffect, useRef } from "react";
import "./UserInfo.scss";
import { Input, Tooltip } from 'antd';
import data from "../../data/profile/Bio";
import editIcon from "../../assets/profile/edit_button.svg";
import checkMarkIcon from "../../assets/profile/check_mark.svg";
import xMarkIcon from "../../assets/profile/x_mark.svg";
import { BioEditVisibility, ChangeEditValue, ApplyNewBio, ClearEditField, KeepButtonsVisible } from "../../utilities/Utils";
const { TextArea } = Input;

const CHAR_LIMIT = 100;



function UserInfo() {
    const [ bioValue, setBioValue ] = useState(data.bio);
    const [ editIsVisible, setEditIsVisible ] = useState(false);
    const [ editValue, setEditValue ] = useState("");
    const [ charactersLeft, setCharactersLeft ] = useState(100);
    const EditFieldRef = useRef(null);
    const CharactersRef = useRef(null);
    const XMarkRef = useRef(null);
    const CheckMarkRef = useRef(null);
    const bioRefArray = [ EditFieldRef, CharactersRef, XMarkRef, CheckMarkRef ];


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
            <img className="profile-pic"></img>
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
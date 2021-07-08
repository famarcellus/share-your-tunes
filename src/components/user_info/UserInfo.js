import React, { useState, useEffect, useRef } from "react";
import "./UserInfo.scss";
import { Input } from 'antd';
import data from "../../data/profile/Bio";
import editIcon from "../../assets/profile/edit_button.svg";
import checkMarkIcon from "../../assets/profile/check_mark.svg";
import xMarkIcon from "../../assets/profile/x_mark.svg";

const CHAR_LIMIT = 100;
const { TextArea } = Input;


function BioEditVisibility(targetArray, visible, setVisible) {
    if(!visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("not-visible");
                targetRef.current.classList.remove("fade-out");
                targetRef.current.classList.add("visible");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.remove("fade-out");
                targetRef.current.resizableTextArea.textArea.classList.add("visible");
            }
           
        })
        setVisible(true);
    }

    if(visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("visible");
                targetRef.current.classList.add("not-visible");
                targetRef.current.classList.add("fade-out");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("visible");
                targetRef.current.resizableTextArea.textArea.classList.add("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.add("fade-out");
            }
            
        })
        setVisible(false);
    }
}

function ChangeEditValue(e, setInputValFn, setCharValueFn ) {
    
    if(e.target.value.length <= CHAR_LIMIT) {
        setInputValFn(e.target.value);
        setCharValueFn(CHAR_LIMIT - e.target.value.length);
    }

    if(e.target.value.length > CHAR_LIMIT) {
        setInputValFn(e.target.value.slice(0,100));
        setCharValueFn(0);
    }
}

function ApplyNewBio(editVal, setEditValFn, setBioValFn, bioArray, setVisibileFn, setCharFn) {
    setBioValFn(editVal);
    setEditValFn("");
    BioEditVisibility(bioArray, true, setVisibileFn);
    setCharFn(CHAR_LIMIT);
}

function ClearEditField(val, setValFn, setCharFn) {
    if(val !== "") {
        setValFn("");
        setCharFn(CHAR_LIMIT);
    }

    return val;
}

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
                    <img className="edit-button" src={editIcon} onClick={() => BioEditVisibility(bioRefArray, editIsVisible, setEditIsVisible)} data-testid="edit-button"></img>
                </h2>
                <div className="edit-section">
                    <TextArea className="not-visible" rows={3} placeholder="Enter new bio here!" ref={EditFieldRef} data-testid="edit-field"
                        value={editValue} onChange={(e) => ChangeEditValue(e, setEditValue, setCharactersLeft)}
                    />
                    <h3 className="character-limit not-visible" ref={CharactersRef}>
                            {charactersLeft} characters remaining
                            <pre>
                                <img className="x-mark not-visible" src={xMarkIcon} ref={XMarkRef} 
                                    onClick={() => {ClearEditField(editValue, setEditValue, setCharactersLeft)}} data-testid="x-mark">
                                </img>
                                <img className="check-mark not-visible" src={checkMarkIcon} ref={CheckMarkRef} 
                                    onClick={(e) => {ApplyNewBio(editValue, setEditValue, setBioValue, bioRefArray, setEditIsVisible, setCharactersLeft)}}>
                                </img>
                            </pre>
                        </h3>
                </div>
                
            </div>
            
        </section>
        
    )
}

export { UserInfo }
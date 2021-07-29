import React from "react";
import { Input } from "antd";
import "./SearchBar.scss";

const { Search } = Input;

function SearchBar({ placeHolder, value, onChange, onSearch }) {
    return (
        <div className="search-bar">
            <Search placeholder={placeHolder} allowClear size="large" 
            enterButton value={value} onChange={onChange} onSearch={onSearch}></Search>
        </div>
    )
}

export default SearchBar;
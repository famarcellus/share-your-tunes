import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Friends from "./Friends";
import { data } from "../../data/profile/FriendsData";



describe("Friend component testing", () => {
    
    test("Friends data should load successfully", () => {
        let { friendsData } = data;
        expect(friendsData.length).toBe(5);
    });
});
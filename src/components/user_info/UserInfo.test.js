import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserInfo } from "./UserInfo";
import data from "../../data/profile/Bio";



describe("User bio functionality testing", () => {

    test("Correct initial bio message is displayed for user", () => {
        let { getByTestId } = render(<UserInfo />);
        const bio = getByTestId("bio");
        expect(bio.textContent).toBe(data.bio);
    })


    test("Edit bio field should not be visible by default", () => {
        let { getByTestId } = render(<UserInfo />);
        const editField = getByTestId("edit-field");
        expect(editField).toHaveClass("not-visible");
    })

    test("Edit bio field should become visible", () => {
        let { getByTestId } = render(<UserInfo />);
        const iconTarget = getByTestId("edit-button");
        const editField = getByTestId("edit-field");
        fireEvent.click(iconTarget);
        expect(editField).toHaveClass("visible");
    })
});
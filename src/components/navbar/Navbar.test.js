import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Header testing", () => {
    test("Home header should be selected by default", () => {
        let { getByTestId } = render(<Navbar />);
        const target = getByTestId("home");
        expect(target).toHaveClass("ant-menu-item-selected");
    });

    const headers = [ "profile", "music" ];

    headers.forEach((icon) => {
        test(`${icon} header should be selected after being clicked`, () => {
            let { getByTestId } = render(<Navbar />);
            const target = getByTestId(icon);
            act(() => {
                fireEvent.click(target);
            });
            
            expect(target).toHaveClass("ant-menu-item-selected");
        })
    })
    
});
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CalculateData } from "../../utilities/Utils";




describe("Top 3 duplicates should be correctly displayed", () => {

    const artistData = [
        {
            artist: "Taylor Swift",
        },
        {
            artist: "Drake"
        }
    ]
    const trackData = [
        {
            artist: "Taylor Swift"
        },
        {
            artist: "Alicia Keys"
        },
        {
            artist: "Taylor Swift"
        }
    ]
    const albumData = [
        {
            artist: "Alicia Keys"
        },
        {
            artist: "Adam Levigne"
        },
        {
            artist: "Luke Bryan"
        }
    ]

    test("Taylor Swift, Alicia Keys, and Drake should be top 3", () => {
        var result = CalculateData(artistData, trackData, albumData);
        expect(result).toStrictEqual([
            {
                artist: "Taylor Swift",
                count: 3
            },
            {
                artist: "Alicia Keys",
                count: 2
            },
            {
                artist: "Drake",
                count: 1
            }
        ])
    })

    test("Should return empty array", () => {
        var result = CalculateData([],[],[]);
        expect(result).toStrictEqual([]);
    })
});
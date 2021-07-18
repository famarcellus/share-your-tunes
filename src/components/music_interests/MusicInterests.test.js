import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CalculateData, RemoveItem } from "../../utilities/Utils";

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

describe("RemoveItem function testing", () => {
    test("RemoveItem fn should remove Taylor Swift successfully", () => {
        const initial = ["Adam Levigne", "Taylor Swift", "John Lennon" ];
        let results;
        results = RemoveItem(initial, 1, (list) => list = list);
        expect(results).not.toStrictEqual(initial);
    });

    test("RemoveItem fn should return empty array", () => {
        const initial = [];
        let results;
        results = RemoveItem(initial, 1, (list) => list = list);
        expect(results).toStrictEqual(initial);
    });
});





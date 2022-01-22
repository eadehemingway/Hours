import { assert, expect, test } from "vitest";

import {
    createDay,
    emptyHours,
    fillHours,
    UNFILLED,
    FILLED,
} from "./hours.js";

const hours = {};
for (let i = 0; i < 24; i++) hours[i] = UNFILLED;

test("can create a day", () => {
    const day = createDay({ categories: ["sleep", "gym"] });

    expect(day).toEqual({
        categories: [
            {
                name: "sleep",
                ...hours,
            },
            {
                name: "gym",
                ...hours,
            },
        ],

        aggregate: {
            ...hours,
        },
    });
});

test("can fill hours when all already empty", () => {
    const day = createDay({ categories: ["sleep", "gym"] });

    const updated = fillHours(day, { category: "sleep", from: 3, to: 6 });

    expect(updated).toEqual({
        categories: [
            {
                name: "sleep",
                ...hours,
                3: FILLED,
                4: FILLED,
                5: FILLED,
            },
            { name: "gym", ...hours },
        ],

        aggregate: {
            ...hours,
            3: "sleep",
            4: "sleep",
            5: "sleep",
        },
    });
});

test("only fills available hours when there is overlap", () => {
    const day = {
        categories: [
            {
                name: "sleep",
                ...hours,
                3: FILLED,
                4: FILLED,
            },
            { name: "gym", ...hours },
        ],

        aggregate: {
            ...hours,
            3: "sleep",
            4: "sleep",
        },
    };

    const updated = fillHours(day, { category: "gym", from: 2, to: 7 });

    expect(updated).toEqual({
        categories: [
            {
                name: "sleep",
                ...hours,
                3: FILLED,
                4: FILLED,
            },
            {
                name: "gym",
                ...hours,
                2: FILLED,
                5: FILLED,
                6: FILLED,
            },
        ],

        aggregate: {
            ...hours,
            2: "gym",
            3: "sleep",
            4: "sleep",
            5: "gym",
            6: "gym",
        },
    });
});

test("can empty out hours", () => {
    const day = {
        categories: [
            {
                name: "sleep",
                ...hours,
                3: FILLED,
                4: FILLED,
                5: FILLED,
                6: FILLED,
            },
            { name: "gym", ...hours },
        ],

        aggregate: {
            ...hours,
            3: "sleep",
            4: "sleep",
            5: "sleep",
            6: "sleep",
        },
    };

    const updated = emptyHours(day, { category: "sleep", from: 4, to: 6 });

    expect(updated).toEqual({
        categories: [
            {
                ...day.categories[0],
                4: UNFILLED,
                5: UNFILLED,
            },
            { ...day.categories[1] },
        ],

        aggregate: {
            ...day.aggregate,
            4: UNFILLED,
            5: UNFILLED,
        },
    });
});

// TODO:
// - fill hours with overlap should not be allowed, or snap back to something
// - pending hours?

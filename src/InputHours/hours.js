export const UNFILLED = "unfilled";
export const FILLED = "filled";
export const PENDING = "pending";
export const HOURS_ARR = new Array(24).fill();
export const DAYS_ARR = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];


const hours = {};
for (let i = 0; i < 24; i++) hours[i] = UNFILLED;

export function createDay({ categories }) {


    return {
        categories: categories.map((c) => {
            const image_index = Math.floor(Math.random() * 7);
            const scale_values = [-1, 1];
            const y_index = Math.round(Math.random());
            const x_index = Math.round(Math.random());
            const scale_y = scale_values[y_index];
            const scale_x = scale_values[x_index];
            return { category: c.category, scale_y, scale_x, image_index,  ...hours,  };
        }),
        aggregate: { ...hours },
    };
}

export function fillHours(day, { category, from, to }) {
    const aggregate = { ...day.aggregate };
    const categories = [...day.categories].map((cat) => {
        if (cat.category !== category) return cat;

        cat = { ...cat };
        for (let i = from; i < to; i++) {
            if (aggregate[i] === UNFILLED) {
                cat[i] = FILLED;
                aggregate[i] = cat.category;
            }
        }
        return cat;
    });

    return { categories, aggregate };
}

export function emptyHours(day, { category, from, to }) {
    const aggregate = { ...day.aggregate };
    const categories = [...day.categories].map((cat) => {
        if (cat.category !== category) return cat;

        cat = { ...cat };
        for (let i = from; i < to; i++) {
            cat[i] = UNFILLED;
            aggregate[i] = UNFILLED;
        }
        return cat;
    });

    return { categories, aggregate };
}

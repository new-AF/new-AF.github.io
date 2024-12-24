// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

// Good luck and happy coding!!

/* bag is a map */
/* 15 from {
    20: 3,
    10: 2,
    5: 3
} */

/* start with biggest notes first */
const sortedBagArray = (bag) => {
    const array = [...bag.entries()];
    array.sort((array1, array2) => {
        const note1 = array1[0];
        const note2 = array2[0];
        return note2 - note1;
    });
    return array;
};

const constructBill = (input, bag) => {
    const attempt = new Map();

    let remaining = input;

    for (const [note, notesCount] of sortedBagArray(bag)) {
        if (remaining === 0) break;
        if (notesCount === 0 || note > input) continue;

        /* attempt to construct bill */
        for (let count = 1; count <= notesCount; ++count) {
            if (remaining - note < 0) break;
            attempt.set(note, attempt.has(note) ? attempt.get(note) + 1 : 1);
            remaining -= note;
        }
    }

    if (remaining > 0) return { successful: false };
    else return { successful: true, attempt };
};

const addToBag = (bag, note) => {
    bag.set(note, bag.has(note) ? bag.get(note) + 1 : 1);
};

const removeFromBag = (bag, map) => {
    map.forEach((notesCount, note) => {
        if (bag.has(note) === false) return;
        for (let count = 1; count <= notesCount; ++count) {
            if (bag.get(note) === 0) return;
            bag.set(note, bag.get(note) - 1);
        }
    });
};

const mapToObject = (map) => {
    const obj = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

function correctChangeFromSanta(bills) {
    const bag = new Map([
        [5, 0],
        [10, 0],
        [20, 0],
    ]);
    for (const value of bills) {
        const giveBack = value - 5;
        const { successful, attempt } = constructBill(giveBack, bag);

        // console.log({ giveBack, successful }, mapToObject(bag))

        if (successful === false) return false;

        removeFromBag(bag, attempt);
        addToBag(bag, value);
    }
    return true;
}

// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5, 5, 5, 10, 20])) {
    console.log("Nice job Santa, everyone got their correct change!");
} else {
    console.log(
        "Looks like you have some work to do Santa, and bring some money next time!"
    );
}

// Should return false
if (correctChangeFromSanta([5, 5, 10, 10, 20])) {
    console.log("Nice job Santa, everyone got their correct change!");
} else {
    console.log(
        "Looks like you have some work to do Santa, and bring some money next time!"
    );
}

import { workshopData } from "/data.js";

/*
Santa has grown suspicious that one of his elves isn't playing fair. The elves are paid well to make toys but Santa thinks one of the elves is keeping some of the toys he has made (and probably selling them on the black market in one of Laplands dodgier neighbourhoods.)

Santa has written a script to recursively look over the data and find discrepancies. But Santa is not so great at coding and he has got bugs he can't resolve.

This code should:
 - Traverse through all elves.
 - Traverse toysShipped, summing up toy counts across regions and subregions.
 - Compare the aggregated counts with toysMade to determine discrepancies.
But it doesn't!

Your task: debug this code - there are two bugs to find! 

Stretch Goal

- Recursion is hard! Delete everything in index.js and start again from scratch. You don't have to do it the same way. Perhaps you can find a better way.
 
*/

// Function to find the elf who created more presents than they delivered
function findNaughtyElf(data) {
    const naughtyElves = [];

    /* info = {
      name : "Elf Tiberius III",
      toysLeft: {
        "Teddy Bear": {madeCount: 0, shippedCount: 0} 
      }
    }
  */
    const track = {};
    const recurse = ({ currentKey, value, parentKey, parentToy }) => {
        /* Objects and Arrays */
        if (typeof value === "object") {
            // console.log()

            const newParentKey =
                currentKey === "toysMade" || currentKey === "toysShipped"
                    ? currentKey
                    : parentKey;

            /* e.g. { toy: "Teddy Bear", count: 3 } */
            const newParentToy = "toy" in value ? value["toy"] : parentToy;

            // console.log({ currentKey, parentKey, parentToy, value: Object.keys(value) })
            Object.keys(value).forEach((key) =>
                recurse({
                    currentKey: key,
                    value: value[key],
                    parentKey: newParentKey,
                    parentToy: newParentToy,
                })
            );
        } else if (currentKey === "name") {

        /* {
      name : "Elf Tiberius III",
      toysLeft: {}
      }
    */
            track["name"] = value;
            track["toysLeft"] = {};
        } else if (parentKey === "toysMade")

        /* {
      name : "Elf Tiberius III",
      toys: { Teddy Bear: 10 }
    }
    */
            track["toysLeft"][currentKey] = value;
        else if (parentKey === "toysShipped" && currentKey === "count") {
            // console.log({parentToy})
            if (parentToy in track["toysLeft"])
                track["toysLeft"][parentToy] -= value;
        }
    };

    const hasAnyToysLeft = (obj) =>
        Object.entries(obj)
            .map(([toy, count]) => count)
            .some((value) => value !== 0);

    data.forEach((obj) => {
        recurse({ value: obj });
        // console.log(track)
        if (hasAnyToysLeft(track["toysLeft"])) {
            // console.log(track)
            naughtyElves.push(track["name"]);
        }
        delete track["name"];
        delete track["toysLeft"];
    });

    return naughtyElves.join(", ");
}

// Example usage
console.log(findNaughtyElf(workshopData)); //Elf Kalvin Armadillo
console.log("--- finished ---");

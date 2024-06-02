import { CHAR_WIDTH, ELLIPSIS_CHAR } from "../Constants";
import { getOccurrence } from "./utilities";

export const toAverage = (numbers: number[]): number => {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length;
}

export const toMedian = (numbers: number[]): number => {
    const length = numbers.length;
    if(length % 2 === 1) {
        return numbers[Math.ceil(length / 2) - 1];
    }
    return (numbers[(length / 2) - 1] + numbers[(length / 2)]) / 2;
}

export function validateInput(input: string): boolean {
    const regexValidation = /^[0-9,.\s]+$/; // seulement: chiffres, virgules, points et espaces
    return regexValidation.test(input);
}

export function parseInputToArray(input: string): number[] {
    return input
    .replace(/\n/g, ",") // remplace newline par une virgule
    .replace(/\s/g, ',') // remplace les espaces blancs par une virgule
    .split(',')
    .filter(n => n ) // filtre les elements vide
    .map((el) => Number(el))
    .sort((a, b) => a - b); // sort par ordre croissant
}

export function setSliderPinPosition(measure: number, entriesToBeDisplayed: string[]): number {
    const entries = document.querySelectorAll<HTMLElement>("[data-entry]");
    const perfectMatchEntries = document.querySelectorAll<HTMLElement>(`[data-entry="${measure}"]`);

    if (perfectMatchEntries.length > 0) {
        // if at least one input value displayed on the graph equals to the median
        // let positionAccumulator = 0;
        // perfectMatchEntries.forEach((element: HTMLElement) => {
        //   positionAccumulator += element.offsetLeft;
        // });
        //const position = Math.floor(positionAccumulator / perfectMatchEntries.length) + perfectMatchEntries[0].innerHTML.length * (CHAR_WIDTH / 2);
        /*const numbersToMatch = [...entriesToBeDisplayed];
        for (let i = 0; i < entriesToBeDisplayed.length; i++) {
        const pulled = numbersToMatch.splice(Math.floor(numbersToMatch.length / 2), 1);
        if(Number(pulled[0]) === median) {
            setMedianSliderPositionX(position);
            break;
        }
        }
        const position = Math.floor(positionAccumulator / perfectMatchEntries.length) + perfectMatchEntries[0].innerHTML.length * (CHAR_WIDTH / 2);*/

        // if at least one entry has the same value as the median, set the position at the entry that is nearest to the middle
        let leapCount = 0;
        for (let i = 0; i <= entries.length; i++) {
            const isOdd = i % 2 === 1;
            let interation = 0;
            // iteration starts at the middle then it goes right, left, right, left
            // eg. we have these entries: 11, 22, 33, 44, 55. Here's the order used to find the match: 33, 44, 22, 55, 11
            interation = Math.floor(entries.length / 2) + (isOdd ? leapCount * -1 : leapCount);
            if (isOdd) leapCount++;

            if (Number(entries[interation].innerHTML) === measure) {
                return(entries[interation].offsetLeft + entries[interation].innerHTML.length * (CHAR_WIDTH / 2));
            }
        }
    }

    // if no entries on the graph equals to the median, look to set the slider between 2 entries
    let previousEntry: number = 0;
    for (let i = 0; i < entriesToBeDisplayed.length; i++) {
        if(entriesToBeDisplayed[i] === ELLIPSIS_CHAR) continue;

        const entryInLoop = Number(entriesToBeDisplayed[i]);
        if (entryInLoop > measure) {
            const entryOccurences = getOccurrence(entriesToBeDisplayed, previousEntry.toString());
            const startingPointEntryWidth = CHAR_WIDTH * previousEntry.toString().length;
            const startingPointPositionX = document.querySelectorAll<HTMLElement>(`[data-entry="${previousEntry}"]`)[entryOccurences - 1].offsetLeft + startingPointEntryWidth;
            const endingPointPositionX = document.querySelectorAll<HTMLElement>(`[data-entry="${entryInLoop}"]`)[0].offsetLeft;
            const ratioPositionX = (measure - previousEntry) * 100 / (entryInLoop - previousEntry);            

            return((startingPointPositionX + ratioPositionX * (endingPointPositionX - startingPointPositionX) / 100));
        }
        previousEntry = entryInLoop;
    }

    return 0; // fallback
}
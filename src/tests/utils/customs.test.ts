import { describe, expect, it } from 'vitest'
import { toAverage, toMedian, validateInput, parseInputToArray } from '../../utils/customs';

describe('toAverage', () => {

    it('Should return the average', () => {
        expect(toAverage([-10, 0, 10])).toBe(0);
        expect(toAverage([1, 2, 3, 4, 5])).toBe(3);
        expect(toAverage([10, 10, 30, 35, 90])).toBe(35);
        expect(toAverage([7.5, 5.5, 8.5, 1.5])).toBe(5.75);
    })
})

describe('toMedian', () => {

    it('Should return the median', () => {
        expect(toMedian([1, 2, 3, 4, 5])).toBe(3);
        expect(toMedian([10, 22, 39, 40, 41])).toBe(39);
        expect(toMedian([9, 12])).toBe(10.5);
    })
})

describe('validateInput', () => {

    it('Check if the input value validates', () => {
        expect(validateInput("1 2 3")).toBe(true);
        expect(validateInput("1, 2, 3,")).toBe(true);
        expect(validateInput("1\n 2\n 3")).toBe(true);
        expect(validateInput("1.1 2.1 3.")).toBe(true);
        expect(validateInput("1 2 3 a")).toBe(false);
        expect(validateInput("1-2-3")).toBe(false);
        expect(validateInput("1 2_3")).toBe(false);
        expect(validateInput("1 2 (3)")).toBe(false);
    })
})

describe('parseInputToArray', () => {

    it('Should parse the input value (string) into an array of sorted numbers', () => {
        expect(parseInputToArray("1 3 2")).toStrictEqual([1, 2, 3]);
        expect(parseInputToArray("10, 29, 1 99\n -155")).toStrictEqual([-155, 1, 10, 29, 99]);
        expect(parseInputToArray("200.2 10, 9 -4 -0 21, 88")).toStrictEqual([-4, -0, 9, 10, 21, 88, 200.2]);
    })
})

describe('setSliderPinPosition', () => {

    // @vitest-environment jsdom

    it('Document should be defined', () => {
        /*const document = {
            querySelectorAll() {
                return [];
            }
        };
        vi.spyOn(document, 'querySelectorAll').mockReturnValueOnce([]);

        vi.mock('document', () => {
            return {
                querySelectorAll: vi.fn().mockReturnValueOnce([])
            }
          })

        expect(setSliderPinPosition(22, ["1", "10", "22", "100", "150"])).toBe(22);*/
        expect(document).not.toBeNull()
    }) 
})
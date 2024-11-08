import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'
import { debounce, getOccurrence, roundWith2Decimals } from '../../utils';

describe('debounce', () => {
    vi.useFakeTimers();

    let func: Mock;
    let debouncedFunc: Function;

    beforeEach(() => {
        func = vi.fn();
        debouncedFunc = debounce(func, 1000);
    });

    it('Callback function to be called only once', () => {
        for(let i = 0; i <= 50; i++) {
            debouncedFunc();
        }

        vi.runAllTimers();

        expect(func).toBeCalledTimes(1);
    })
})

describe('roundWith2Decimals', () => {

    it('Should return a number rounded with no more that 2 decimals', () => {
        expect(roundWith2Decimals(3)).toBe(3);
        expect(roundWith2Decimals(10.6)).toBe(10.6);
        expect(roundWith2Decimals(999.0)).toBe(999);
        expect(roundWith2Decimals(-1)).toBe(-1);
        expect(roundWith2Decimals(-371.659)).toBe(-371.66);
        expect(roundWith2Decimals(10266.155497)).toBe(10266.16);
    })
})

describe('getOccurrence', () => {

    it('Should return the total occurence of a value', () => {
        const numbers = [-100, -1, 0, 0.1, 1, 1, 1, 1.4, 1.44, 2, 5, 10, 22, 50, 100, 100, 100, 100, 100];
        expect(getOccurrence(numbers, 0)).toBe(1);
        expect(getOccurrence(numbers, 1)).toBe(3);
        expect(getOccurrence(numbers, 500)).toBe(0);
        expect(getOccurrence(numbers, -100)).toBe(1);
        expect(getOccurrence(numbers, 100)).toBe(5);

        const strings = ['asa', 'bee', 'bee', 'beef', 'dam', 'sum', 'bee', 'bee', 'zoo'];
        expect(getOccurrence(strings, 'asa')).toBe(1);
        expect(getOccurrence(strings, 'bee')).toBe(4);
        expect(getOccurrence(strings, 'beef')).toBe(1);
        expect(getOccurrence(strings, 'beee')).toBe(0);
        expect(getOccurrence(strings, 'ee')).toBe(0);
    })
})
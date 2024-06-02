import { useEffect, useRef, useState } from "react";
import { debounce, roundWith2Decimals, setSliderPinPosition } from "../../utils";
import "../../css/Graph.css";
import GraphSlider from "./GraphSlider";
import { CHAR_WIDTH, ELLIPSIS_CHAR } from "../../Constants";

interface Graph {
  numbers: number[];
  average: number;
  median: number;
}

const Graph = ({ numbers, average, median }: Graph) => {
  const graphBar = useRef<HTMLDivElement | null>(null);

  const [numbersSpreaded, setNumbersSpreaded] = useState<string[]>([]);
  const [prevNumbers, setPrevNumbers] = useState<number[]>([]);

  const [averageSliderPositionX, setAverageSliderPositionX] = useState<number>(0);
  const [medianSliderPositionX, setMedianSliderPositionX] = useState<number>(0);

  // Avoid rerender when numbers input didn't change
  if (JSON.stringify(numbers) !== JSON.stringify(prevNumbers)) {
    setTimeout(() => {
      setPrevNumbers(numbers);
      setNumbersSpreaded(generateGraphNumbers(numbers));
    }, 1);
  }

  // Event listener when window resize, re-evaluate the available width to display the input numbers on the graph
  useEffect(() => {
    const debouncedRegenerateGraphNumbers = debounce(() => {
      setNumbersSpreaded(generateGraphNumbers(numbers));
    }, 1000);

    window.addEventListener("resize", debouncedRegenerateGraphNumbers);

    return () => {
      window.removeEventListener("resize", debouncedRegenerateGraphNumbers);
    };
  }, [numbers]);

  // Spread the input numbers based on available width of the graph element
  function generateGraphNumbers(numbers: number[]): string[] {
    const firstHalfNumbers: number[] = numbers.slice(0, numbers.length / 2);
    const secondHalfNumbers: number[] = numbers.slice(numbers.length / 2, numbers.length);

    const leftSection: string[] = [];
    const middleSection: string[] = [];
    const rightSection: string[] = [];

    if (graphBar.current) {
      let availableWidth = graphBar.current.offsetWidth - CHAR_WIDTH * 2; // full bar width - 2 hypothetical ellipsis added characters if needed
      let cycle: 1 | 2 | 3 | 4 = 1;

      function insertNumber(numberToInsert: number | undefined, arrayToInsert: string[], arrayMethod: "push" | "unshift"): void {
        if (numberToInsert === undefined) return;
        const numberToInsertFormated = roundWith2Decimals(numberToInsert).toString();
        availableWidth = availableWidth - (numberToInsertFormated.length * CHAR_WIDTH + CHAR_WIDTH); //  + charWidth is for spacing buffer between displayed numbers
        if (availableWidth >= 0) arrayToInsert[arrayMethod](numberToInsertFormated);
      }

      do {
        switch (cycle) {
          case 1:
            insertNumber(secondHalfNumbers.shift(), middleSection, "push");
            cycle = 2;
            break;
          case 2:
            insertNumber(firstHalfNumbers.pop(), middleSection, "unshift");
            cycle = 3;
            break;
          case 3:
            insertNumber(secondHalfNumbers.pop(), rightSection, "unshift");
            cycle = 4;
            break;
          case 4:
            insertNumber(firstHalfNumbers.shift(), leftSection, "push");
            if (firstHalfNumbers.length + secondHalfNumbers.length === 0) availableWidth = -1;
            cycle = 1;
            break;
        }
      } while (availableWidth > 0);

      if (firstHalfNumbers.length > 0) leftSection.push(ELLIPSIS_CHAR);
      if (secondHalfNumbers.length > 0) rightSection.unshift(ELLIPSIS_CHAR);

      const entriesToBeDisplayed = [...leftSection, ...middleSection, ...rightSection];

      // set slider pin (average and median) at new X position
      setTimeout(() => {
        setMedianSliderPositionX(setSliderPinPosition(median, entriesToBeDisplayed));
        setAverageSliderPositionX(setSliderPinPosition(average, entriesToBeDisplayed));
      }, 1);

      return entriesToBeDisplayed;
    }

    // Fallback if the graph ref is null
    return [];
  }

  return (
    <div className="graph">
      <GraphSlider mode={median} label="médiane" variant="graph-median" position={medianSliderPositionX} />
      <div className="graph-bar" ref={graphBar}>
        {numbersSpreaded.map((inputNumber, index) => (
          <span className="graph-number" data-entry={inputNumber} key={index}>
            {inputNumber}
          </span>
        ))}
      </div>
      <GraphSlider mode={average} label="moyenne" variant="graph-average" position={averageSliderPositionX} />
    </div>
  );
};

export default Graph;

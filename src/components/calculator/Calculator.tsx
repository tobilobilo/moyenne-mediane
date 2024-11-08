import "../../css/Calculator.css";
import { FormEvent, useState, useRef } from "react";
import Badge from "./Badge";
import FormTooltip from "./FormTooltip";
import { parseInputToArray, toAverage, toMedian, validateInput } from "../../utils/";
import Graph from "./Graph";

const Calculator = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [inputData, setInputData] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const [median, setMedian] = useState(0);
  const [average, setAverage] = useState(0);

  const calculate = (event: FormEvent, inputHasError: boolean = false): void => {
    event.preventDefault();
    if (input.trim() === "") {
      setInputData([]);
      setHasError(false);
      return;
    }
    if (!validateInput(input) || inputHasError) {
      setInputData([]);
      setHasError(true);
      textareaRef.current?.focus();
      return;
    }

    setHasError(false);

    const parsedInput = parseInputToArray(input);
    if (parsedInput.includes(NaN)) {
      calculate(event, true); // recursive call if NaN is found in the parsed input data
      return;
    }
    setInputData(parsedInput);

    setMedian(toMedian(parsedInput));
    setAverage(toAverage(parsedInput));
  };

  function onTextareaChange(newValue: string) {
    setInput(newValue);
    if (hasError) {
      setInputData([]);
      setHasError(false);
    }
  }

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="position-relative">
                <label htmlFor="input" id="input-label">
                  Entrez une série de nombres
                </label>
                <FormTooltip />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <form className="d-flex flex-column position-relative" onSubmit={(event) => calculate(event)}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => {
                onTextareaChange(event.target.value);
              }}
              className={`form-control ${hasError ? "is-invalid" : ""}`}
              placeholder="ex: 12 80 99 0 23 3 54"
              name="input"
              id="input"
              aria-labelledby="input-label"
              aria-describedby="calculator-tooltip"
              {...(hasError && {
                "aria-invalid": true,
                "aria-errormessage": "error",
              })}
            ></textarea>
            <button className="btn btn-primary mx-auto mt-3">Calculer</button>
          </form>
        </div>
        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          {hasError && (
            <div id="error">
              <h4 className="fw-bold">Erreur dans le format des données...</h4>
            </div>
          )}
          {inputData.length > 0 && (
            <div key={average.toString() + median.toString()}>
              <h4 className="fw-bold mb-3">Voici le résultat</h4>
              <Graph numbers={inputData} average={average} median={median} />
              <div className="row result-badges">
                <Badge id="average" title="Moyenne" value={average} />
                <Badge id="median" title="Médianne" value={median} />
              </div>
            </div>
          )}
          {inputData.length === 0 && !hasError && (
            <div>
              <h4 className="fw-bold">En attente de vos données...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

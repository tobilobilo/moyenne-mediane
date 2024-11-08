import "../../css/Badge.css";
import { roundWith2Decimals } from "../../utils/";

interface Badge {
  id: string;
  title: string;
  value: number;
}

const Badge = ({ title, id, value }: Badge) => {
  const numberToArray = roundWith2Decimals(value).toString().split(".");
  const hasDecimal = numberToArray.length > 1;
  const caractersLength = numberToArray[0].length + (hasDecimal ? 1 : 0);

  return (
    <div className="col-12 col-md-6 mt-3">
      <div className={`result-badge result-badge-${id}`}>
        <p id={`results-${id}`} className="result-badge-number">
          <span className={`caracters-${caractersLength}`}>
            {numberToArray[0]}
            {hasDecimal && (
              <small>
                .{numberToArray[1]}
                {numberToArray[1].length === 1 ? "0" : ""}
              </small>
            )}
          </span>
        </p>
        <h6 className="mb-0">{title}</h6>
      </div>
    </div>
  );
};

export default Badge;

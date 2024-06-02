import { roundWith2Decimals } from "../../utils";

interface GraphSlider {
  mode: number;
  label: string;
  variant: string;
  position: number;
}

const GraphSlider = ({ mode, label, variant, position }: GraphSlider) => {
  return (
    <div className="graph-slider">
      <div className={`graph-pin ${variant}`} style={{ left: position.toString().concat("px") }}>
        <span className="graph-label">{label}</span>
        <span className="graph-value">{roundWith2Decimals(mode)}</span>
      </div>
    </div>
  );
};

export default GraphSlider;

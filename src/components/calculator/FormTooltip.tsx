import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const FormTooltip = () => {
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => (
        <Tooltip {...props}>
          <p>La liste ne doit contenir que ces caractères</p>
          <ul className="mb-1 mt-1">
            <li>Chiffre</li>
            <li>Point</li>
            <li>Virgule</li>
            <li>Espace</li>
            <li>Saut de ligne</li>
          </ul>
        </Tooltip>
      )}
      placement="bottom"
    >
      <button
        className="btn icon-info"
        id="calculator-tooltip"
        aria-label="La liste ne doit contenir que ces caractères: Chiffre, Point, Virgule, Espace, Saut de ligne"
      >
        <FontAwesomeIcon icon={faCircleInfo} />
      </button>
    </OverlayTrigger>
  );
};

export default FormTooltip;

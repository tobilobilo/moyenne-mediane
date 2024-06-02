import "../css/Header.css";
import logo from "../assets/svg/logo-transparent.svg";

const Header = () => {
  return (
    <header className="col-12">
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="header-title">
        <strong>Calculateur</strong> de <br />
        <strong>moyenne</strong> et de <br />
        <strong>médiane</strong>
      </h1>
    </header>
  );
};

export default Header;

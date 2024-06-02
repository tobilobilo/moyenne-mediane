import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <div className="container">
      <div className="row">
        <Header />
        <div className="col-12 content">
          <div className="row h-100 pt-3">
            <Calculator />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

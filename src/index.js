import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Footer from "./Footer";
import Header from "./Header";
import Weather from "./Weather";
import Forecast from "./Forecast";
import * as serviceWorker from "./serviceWorker";

class Main extends React.Component {
  render() {
    return (
      <main>
        <Weather title="Current Weather" />
        <Forecast title="Forecast for the day" />

      </main>
    );
  }
}

class Root extends React.Component {
  render() {
    return (
      <div>
        <Header username="Savieo" />
        <Main />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();

import React from "react";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "Savieo" };
  }

  changeName = a => {
    this.setState({ username: a });
  };

  render() {
    return (
      <header style={{ background: "linear-gradient(#e66465, #9198e5);", padding: "10px" }}>
        <img src="logo512.png" alt="some logo" style={{ width: "50px" }}></img>
        <h1>Welcome to Weather Forecast Page </h1>


      </header>
    );
  }
}
export default Header;

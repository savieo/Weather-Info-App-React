import React from "react";


class Weather extends React.Component {
    constructor(props) {
        super(props)
        console.log("Weather response below ---------@");
        this.state = {
            weather_data: {},
            main_data: {},
            isLoaded: true,
            error: null
        };
    }

    searchWeather = (cityName) => {
        fetch("http://api.openweathermap.org/data/2.5/weather?APPID=dfcbfa91a57ec56afbf2e296953fa5e6&q=" + cityName).then(
            response => {
                console.log("Fetched data url");
                if (response.ok) {
                    response.json().then(json_response => {
                        console.log(json_response);
                        this.setState({
                            weather_data: json_response.weather[0],
                            main_data: json_response.main,
                            isLoaded: true,
                            error: null
                        });
                    });
                }
                else {
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            error: json_response,
                            weather_data: [],
                            main_data: {},
                        });
                    });
                }
            },
            error => {
                this.setState({
                    isLoaded: false,
                    error: { message: "Ajax error, URL might be wrong! or unreacheable, check console" },
                    weather_data: {},
                    main_data: {}
                });
            }
        );
    };


    render() {
        console.log("Inside Weather render");
        if (!this.state.isLoaded) {
            return (
                <form className="panel350">
                    <h3>{this.props.title}</h3>
                    <input type="text" id="cityName" />
                    <button className="button" type="button" onClick={() => this.searchWeather(document.getElementById("cityName").value) }> Search</button>
                    <div>Please Enter a Valid City</div>
                </form>
            )
        } else {
            return (
                <form className="panel350">
                    <h3>{this.props.title}</h3>
                    <input type="text" id="cityName" />
                    <button className="button" type="button"  onClick={() => this.searchWeather(document.getElementById("cityName").value)  }> Search</button>
                    <table  align="center">
                        <tbody>
                            <tr>
                                <th>Temp:</th>
                                
                                <td>{Math.trunc(this.state.main_data.temp - 273.15) + "° C"}</td>
                            </tr>
                            <tr>
                                <th>Description:</th>
                                <td>{this.state.weather_data.description}</td>
                            </tr>
                            <tr>
                                <th>Pressure:</th>
                                <td>{this.state.main_data.pressure}</td>
                            </tr>
                            <tr>
                                <th>Humidity:</th>
                                <td>{this.state.main_data.pressure}</td>
                            </tr>
                            <tr>
                                <th>Icon</th>
                                <td>
                                    <img
                                        src={ "http://openweathermap.org/img/w/" + this.state.weather_data.icon + ".png"  } alt="clouds" ></img>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            );
        }
    }

}
export default Weather;
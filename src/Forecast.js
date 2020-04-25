import React from "react";


class Forecast extends React.Component {
    constructor(props) {
        super(props)
        console.log("<-------------Forecast response below --------->");
        this.state = {
            forecast_data: [],
            forecast_main_data: {},
            isLoaded: true,
            error: null
        };

    }

    searchForecast = (cityName) => {
        fetch("http://api.openweathermap.org/data/2.5/forecast?us&mode=json&appid=dfcbfa91a57ec56afbf2e296953fa5e6&q=" + cityName).then(
            response => {
                console.log("Fetched forecast data url");
                if (response.ok) {
                    response.json().then(json_response => {
                        console.log(json_response);
                        this.setState({
                            forecast_data: json_response.list,
                            forecast_main_data: json_response.city,
                            isLoaded: true, 
                            error: null 

                        });
                        // console.log(this.state.forecast_data);
                    });
                }
                else {
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            error: json_response,
                            forecast_data: [],
                            forecast_main_data: {},
                        });
                        console.log(this.state.forecast_data);
                    });
                }
            },
            error => {
                this.setState({
                    isLoaded: false,
                    error: { message: "URL might be wrong! or unreacheable, check console" },
                    forecast_data: [],
                    forecast_main_data: {}

                });
            }
        );
    };


    render() {
        console.log("Inside Forecast render");
        if (!this.state.isLoaded) {
            return (
                <form className="panel850">
                    <h3>{this.props.title}</h3>
                    <input type="text" id="cityName2" />
                    <button className="button"  type="button" onClick={() => this.searchForecast(document.getElementById("cityName2").value) }> Search</button>
                    <div>Invalid City .....! please re-enter the city </div>
                </form>
            )
        } else {
            
            return (
                <form className="panel850">
                    <h3>{this.props.title}</h3>
                    <input type="text" id="cityName2" />
                    <button className="button" type="button"
                        onClick={() => this.searchForecast(document.getElementById("cityName2").value)}> Search</button>

                    <div class="forecast_tabel">
                        <h2>Forecast</h2>
                        <table cellspacing="0" cellpadding="0" width="100%" summary="Data table">
                            <tbody>
                                <tr>
                                    <th>Datetime</th>
                                    <th>Temperature</th>
                                    <th>Humidity</th>
                                    <th>Pressure</th>
                                    <th>Clouds</th>
                                    <th>Feels Like</th>
                                    <th>Description</th>
                                    <th>~~~</th>
                                </tr>
                                {/* const elements = ['one', 'two', 'three'];
                                return (
                                <ul>
                                    {elements.map((value, index) => {
                                        return <li key={index}>{value}</li>
                                    })}
                                </ul>) */}

                                {this.state.forecast_data.map(function (loop_data, index) {
                                    let date = new Date(loop_data.dt * 1000);
                                    // let date = new Date(loop_data.sys.dt_txt);
                                    date.toString()
                                    return (
                                        <tr key={index}>
                                            <td>{date.toUTCString()}</td>
                                            <td>{Math.trunc(loop_data.main.temp - 273.15) + "° C"}</td>
                                            <td>{loop_data.main.humidity}</td>
                                            <td>{loop_data.main.pressure}</td>
                                            <td>{loop_data.clouds.all + "%"}</td>
                                            <td>{loop_data.main.feels_like}</td>
                                            <td>{loop_data.weather[0].description}</td>
                                            <td>
                                                <img src={"http://openweathermap.org/img/w/" + loop_data.weather[0].icon + ".png"} alt="clouds"></img>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </form>
            );

        }
    }

}
export default Forecast;
import React from 'react'
import { Table, Image } from "react-bootstrap";

const WeatherCard = (props) => {
    return (
        <>
            <Image src={props.theme === "style_TW" ? "/sunny_light.svg" : "/clear_night_light.svg"} style={{ margin: '15px 120px' }} roundedCircle />
            <div className='w-75' id='BG' style={{ borderRadius: "20px", border: "1px solid", margin: 'auto' }}>
                <Table className='w-75' style={{ tableLayout: "fixed", margin: "20px auto" }} bordered>
                    <thead>
                        <tr style={{ border: "2px solid black" }}>
                            <th style={{ textAlign: 'center' }}>Temperature</th>
                            <th style={{ textAlign: 'center' }}>Humidity</th>
                            <th style={{ textAlign: 'center' }}>Wind Speed</th>
                            <th style={{ textAlign: 'center' }}>Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ border: "2px solid black" }}>
                            <td style={{ textAlign: 'center' }}>{props.CW?.main?.temp}</td>
                            <td style={{ textAlign: 'center' }}>{props.CW?.main?.humidity}</td>
                            <td style={{ textAlign: 'center' }}>{props.CW?.wind?.speed}</td>
                            <td style={{ textAlign: 'center' }}>{props.CW?.weather[0].description}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default WeatherCard
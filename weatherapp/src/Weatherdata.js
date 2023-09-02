import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import CardImg from "react-bootstrap/esm/CardImg";

export default function CurrentInfo() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const apiKey = "1ef0f45d2983fa1873a1d90fcb7fffbe"; // Replace with your API key
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Update state with fetched weather data
            console.log(data);
            setWeatherData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  return (
    <>
      {weatherData ? (
        <Card style={{ width: "40rem", height: "50vh" }} className="imgg ">
          <Card.Body className="bb">
            <Card.Title>
              {weatherData.name},{weatherData.sys.country}
            </Card.Title>
            <Card.Text>
              {weatherData.main.temp}C<br />
              Feel Like: {""}
              <strong>{weatherData.main.feels_like}C</strong>
              <h3>{weatherData.weather[0].description}</h3>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>loading weather data...</p>
      )}
    </>
  );
}

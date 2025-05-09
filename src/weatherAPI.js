async function fetchWeather(location, unit) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=566NKT6ACPXXCK4J29G7PNWKK`,
  );
  const weatherJSON = await response.json;
  const weather = {
    address: weatherJSON.address,
    temperature: weatherJSON.days[0].temp,
    feelsLike: weatherJSON.days[0].feelslike,
    humidity: weatherJSON.days[0].humidity,
    precipitation: weatherJSON.days[0].precipprob,
    wind: weatherJSON.days[0].windspeed,
    icon: weatherJSON.days[0].icon,
  };
  return weather;
}

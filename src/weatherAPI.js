async function fetchWeather(location, unit) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=566NKT6ACPXXCK4J29G7PNWKK`,
  );
  if (!response.ok){
    let message;
    switch (response.status){
      case 400:
      case 404:
        message = 'Your given address is invalid. If the issue persists please try again later';
        break;
      case 401:
      case 429: 
      case 403:
        message = 'Sorry. There is a problem with my API. Please try again later';
        break;
      case 500:
      case 502:
      case 503:
        message = 'Sorry there is a problem with the API’s server. Please try again later';
        break;
    }
    throw new Error(message);
  }
  const weatherJSON = await response.json();
  const weather = {
    address: weatherJSON.resolvedAddress,
    condition: weatherJSON.days[0].conditions,
    temperature: weatherJSON.days[0].temp,
    feelsLike: weatherJSON.days[0].feelslike,
    humidity: weatherJSON.days[0].humidity,
    precipitation: weatherJSON.days[0].precipprob,
    wind: weatherJSON.days[0].windspeed,
    icon: weatherJSON.days[0].icon,
  };
  return weather;
}

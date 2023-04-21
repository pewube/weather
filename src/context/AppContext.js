import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appBackground, setAppBackground] = useState("home");
  const [inputError, setInputError] = useState({ is: false, info: "" });
  const [weatherData, setWeatherData] = useState({});

  return (
    <AppContext.Provider
      value={{
        appBackground,
        inputError,
        weatherData,
        setAppBackground,
        setInputError,
        setWeatherData,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

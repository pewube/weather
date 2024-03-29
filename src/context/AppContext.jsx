import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = (props) => {
  const [appBackground, setAppBackground] = useState("home");
  const [inputError, setInputError] = useState({ is: false, info: "" });
  const [modal, setModal] = useState({
    visible: false,
    header: {},
    body: {},
  });
  const [weatherData, setWeatherData] = useState({});

  return (
    <AppContext.Provider
      value={{
        appBackground,
        inputError,
        modal,
        weatherData,
        setAppBackground,
        setInputError,
        setModal,
        setWeatherData,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

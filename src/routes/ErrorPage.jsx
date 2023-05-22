import { useContext, useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { setAppBackground, setInputError } = useContext(AppContext);

  // status 299 => server status = 200 but there's no data to process
  const status =
    error.status && error.status !== 299 ? (
      <p>Odpowiedź serwera: {error.status}</p>
    ) : null;
  const statusText = error.statusText ? (
    <p>{decodeURIComponent(error.statusText)}</p>
  ) : (
    <p>Wystąpił nieznany problem z przetwarzaniem danych.</p>
  );

  useEffect(() => {
    setAppBackground("home");
    setInputError({
      is: true,
      info: (
        <>
          {statusText}
          {status}
        </>
      ),
    });

    navigate("/");
  }, []);

  return null;
}

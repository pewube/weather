import { useContext, useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export default function ErrorPage() {
  const error = useRouteError();
  const { setAppBackground, setInputError } = useContext(AppContext);
  const navigate = useNavigate();

  const statusText = error.statusText ? (
    <p>{decodeURIComponent(error.statusText)}</p>
  ) : (
    <p>Wystąpił nieznany problem z przetwarzaniem danych.</p>
  );
  // status 299 => server status = 200 but there's no data to process
  const status =
    error.status && error.status !== 299 ? (
      <p>Odpowiedź serwera: {error.status}</p>
    ) : null;

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

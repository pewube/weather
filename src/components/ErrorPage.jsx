import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Houston, mamy problem ...</h1>
      <p>Przepraszamy, ale wystąpił błąd w aplikacji.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

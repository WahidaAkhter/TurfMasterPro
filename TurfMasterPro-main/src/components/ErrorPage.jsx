import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 className="text-red-500">Something went wrong 😥</h1>
      <p className="text-red-500">{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;

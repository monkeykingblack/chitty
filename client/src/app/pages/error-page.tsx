import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;

  return <div className="">Error: {error.message}</div>;
};

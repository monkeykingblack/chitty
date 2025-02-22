import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h3 className="text-xl font-medium">
        Error: {error.message || 'something wen wrong'}
      </h3>
    </div>
  );
};

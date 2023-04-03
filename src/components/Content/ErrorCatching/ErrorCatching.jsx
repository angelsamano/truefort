import React from "react";
import ErrorBoundary from './ErrorBoundary';

const ErrorCatching = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="font-bold">A placeholder for a component handling errors</div>
      </div>

      <ErrorBoundary fallback="Something showing the caught error!">
        <React.Suspense fallback="Preloader component goes here...">
          <div className="mt-3 text-xs">
            Please check <span className="code">src/components/ErrorCatching</span> for more information.<br/>
            Basically wrapping everything inside a React.Suspense and an ErrorBoundary components to avoid the application crashing entirely.
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ErrorCatching;

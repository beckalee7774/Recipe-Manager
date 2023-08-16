function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-orange-200 h-screen w-screen p-3 text-orange-800">
      <button onClick={resetErrorBoundary}>&larr; Back</button>
      <h1 className="font-semibold text-center mt-10">
        Something went wrong 😢
      </h1>
      <p className="text-xs text-center ">{error.message}</p>
    </div>
  );
}

export default ErrorFallback;

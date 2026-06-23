"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PAGE CRASH ERROR:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <pre className="bg-red-900/50 p-4 rounded text-red-200 overflow-auto max-w-full">
        {error.message}
        {"\n"}
        {error.stack}
      </pre>
      <button
        className="mt-6 px-4 py-2 bg-white text-black rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type ConnectionResponse = {
  success: boolean;
  message: string;
  application: string;
};

export default function Home() {
  const [data, setData] = useState<ConnectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        const result = await apiRequest<ConnectionResponse>(
          "/connection-test"
        );

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "API connection failed."
        );
      } finally {
        setLoading(false);
      }
    }

    checkConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">
          Study Abroad Platform
        </h1>

        <p className="mb-8 text-sm text-zinc-400">
          Frontend and Backend Connection Test
        </p>

        {loading && (
          <p className="text-yellow-400">
            Connecting to Laravel API...
          </p>
        )}

        {data && (
          <div className="space-y-3 rounded-xl border border-green-800 bg-green-950/40 p-5">
            <p className="font-semibold text-green-400">
              API Connection Successful
            </p>

            <p>{data.message}</p>

            <p className="text-sm text-zinc-400">
              Application: {data.application}
            </p>

            <p className="text-sm text-zinc-400">
              Success: {String(data.success)}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-800 bg-red-950/40 p-5">
            <p className="font-semibold text-red-400">
              API Connection Failed
            </p>

            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}
      </section>
    </main>
  );
}

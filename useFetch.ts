import { useCallback, useEffect, useState } from "react";

const localCache = new Map();

// Definir interfaces para el tipado
interface FetchError {
  message: string;
  code: number | Record<string, unknown>;
}

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
  error: FetchError | null;
}

export const useFetch = <T>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });
  const getFetch = useCallback(async () => {
    if (localCache.has(url)) {
      console.log("usando Cache");

      setState({
        data: localCache.get(url),
        isLoading: false,
        hasError: false,
        error: null,
      });

      return;
    }

    try {
      const resp = await fetch(url);
      const data: T = await resp.json();
      console.log({ data });

      if (!resp.ok) {
        throw {
          code: resp.status,
          message: resp.statusText,
        };
      }

      setState({
        data,
        isLoading: false,
        hasError: false,
        error: null,
      });

      localCache.set(url, data);
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          message: (error as Error).message,
          code: (error as { message: string; code: number }).code,
        },
      });
    }
  }, [url]);

  useEffect(() => {
    setLoadingState();
    getFetch();
  }, [url, getFetch]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  return { ...state };
};

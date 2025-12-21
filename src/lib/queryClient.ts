import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`); // ✅ FIXED: Added parentheses
  }
}

// Fixed: This function now returns parsed JSON instead of raw Response
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    // Don't send credentials for cart operations to avoid auth conflicts
    credentials: url.includes('/api/cart') ? 'omit' : 'include',
  });

  await throwIfResNotOk(res);
  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    const res = await fetch(url, {
      // Don't send credentials for cart operations
      credentials: url.includes('/api/cart') ? 'omit' : 'include',
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes instead of Infinity
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
      retry: (failureCount, error) => {
        // Only retry on network errors, not 4xx/5xx status codes
        return failureCount < 2 && !error.message.includes('400') && !error.message.includes('500');
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        // Retry mutations only on network errors
        return failureCount < 1 && !error.message.includes('400') && !error.message.includes('500');
      },
    },
  },
});
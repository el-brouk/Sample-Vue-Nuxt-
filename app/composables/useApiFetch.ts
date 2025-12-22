import { useFetch } from '#app';
import type { DebugLog } from '~/model/debug';
import useDebugStore from '~/store/debug';

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useApiFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();
  const { token } = useAuth();
  const debugStore = useDebugStore();
  //const appStore = useAppStore()

  const requestId = 'id' + Math.random().toString(16).slice(2);
  const method = (((options as any)?.method as string) || 'get').toLowerCase();

  let debugLog: DebugLog = {
    id: requestId,
    type: method,
    ssr: true,
    path: path.toString(),
    dateFrom: new Date(),
    dateTo: null,
    options: options,
    status: null,
  };

  if (process.client) {
    debugLog.ssr = false;
  }

  // Create new options object to avoid mutating the original
  const fetchOptions: any = {
    ...options,
    watch: false as const,
  };

  return useFetch(path, {
    ...fetchOptions,
    async onRequest({ request, options }) {
      options.cache = 'no-cache';

      /** @ts-ignore */
      options.baseURL = config.public.apiUrl;
      if (token && token.value) {
        // Merge headers to preserve existing ones
        const existingHeaders = options.headers || {};
        options.headers = {
          ...existingHeaders,
          /** @ts-ignore */
          Authorization: token.value,
        };
      }
    },
    async onRequestError({ request, options, error }) {
      console.log('[ERROR response]', request, error);
      // Log error
      //console.log('[fetch request error]', request, error)
      debugLog.dateTo = new Date();
      debugLog.status = 500;
      await debugStore.addToLog(debugLog);
    },
    async onResponse({ request, response, options }) {
      if (response.status != 200) {
        console.log('[ERROR response]', request, response.status, response.body);
      }

      debugLog.dateTo = new Date();
      debugLog.status = response.status;
      await debugStore.addToLog(debugLog);
    },
    async onResponseError({ request, response, options }) {
      if (response.status != 200) {
        console.log('[fetch response error]', request, response.status, response.body);
      }

      debugLog.dateTo = new Date();
      debugLog.status = response.status;
      await debugStore.addToLog(debugLog);
    },
  });
};

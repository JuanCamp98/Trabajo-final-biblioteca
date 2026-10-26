import { useCallback, useEffect, useRef, useState } from 'react';
import { MESSAGES } from '../constants/messages';
import { getErrorMessage } from '../utils/errors';

export function useAsync(asyncFunction, dependencies = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lastRequest = useRef(0);

  const load = useCallback(async () => {
    lastRequest.current += 1;
    const requestNumber = lastRequest.current;
    const isLastRequest = () => requestNumber === lastRequest.current;

    setLoading(true);
    setError('');

    try {
      const result = await asyncFunction();
      if (isLastRequest()) setData(result);
    } catch (err) {
      if (isLastRequest()) setError(getErrorMessage(err, MESSAGES.LOAD_ERROR));
    } finally {
      if (isLastRequest()) setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

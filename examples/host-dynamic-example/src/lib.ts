export const createAsyncCache = <Result, Param>(fn: (param: Param) => Promise<Result>) => {
  const resultCache = new Map<Param, Result>();
  const requestCache = new Map<Param, Promise<Result>>();

  function invoke(param: Param, onSuccess: (result: Result) => void) {
    const cache = resultCache.get(param);

    if (cache) {
      onSuccess(cache);
      return;
    }

    const prevRequest = requestCache.get(param);

    if (prevRequest) {
      prevRequest.then(onSuccess);
      return;
    }

    const request = fn(param);

    requestCache.set(param, request);

    request.then((result) => {
      onSuccess(result);
      resultCache.set(param, result);
      requestCache.delete(param);
    });
  }

  return {
    cache: resultCache,
    invoke,
  };
};

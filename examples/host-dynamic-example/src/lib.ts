export const createAsyncCache = <Result, Param>(fn: (param: Param) => Promise<Result>) => {
  const resultCache = new Map<Param, Result>();
  const requestCache = new Map<Param, Promise<Result>>();

  function invoke(param: Param): Promise<Result> {
    const cache = resultCache.get(param);

    if (cache) {
      return Promise.resolve(cache);
    }

    const prevRequest = requestCache.get(param);

    if (prevRequest) {
      return prevRequest;
    }

    const request = fn(param);

    requestCache.set(param, request);

    request.then((result) => {
      resultCache.set(param, result);
      requestCache.delete(param);
    });

    return request;
  }

  return {
    cache: resultCache,
    invoke,
  };
};

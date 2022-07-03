import { publicPath } from './env';

export interface ExposesConfig {
  id: string;
  remotes: Array<{
    name: string;
    entryUrl: string;
    exposedModule: string;
  }>;
}

const baseUrl = `${publicPath}/config`;

// get config data, in actual implementation should be an API endpoint
// here we only get from static JSON file from public folder
export const getConfig = (type: string) =>
  fetch(`${baseUrl}/${type}.json`).then((res) => res.json() as Promise<ExposesConfig>);

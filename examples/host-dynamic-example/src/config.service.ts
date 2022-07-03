export interface ExposesConfig {
  id: string;
  remotes: Array<{
    name: string;
    entryUrl: string;
  }>;
}

declare const __webpack_public_path__: string;

const baseUrl = `${__webpack_public_path__}/config`;

export const getConfig = (type: string) =>
  fetch(`${baseUrl}/${type}.json`).then((res) => res.json() as Promise<ExposesConfig>);

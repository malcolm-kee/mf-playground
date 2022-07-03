export const loadRemoteEntry: <Result>(remoteEntry: string, remoteName: string) => Promise<void>;

export const loadRemoteModule: <Result>(options: {
  remoteName: string;
  exposedModule: string;
  remoteEntry?: string;
}) => Promise<Result>;

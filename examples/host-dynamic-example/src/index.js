const type = window.sessionStorage.getItem('configType') || 'default';

// get config data, in actual implementation should be an API endpoint
// here we only get from static JSON file from public folder
const getConfig = (type) =>
  fetch(`${__webpack_public_path__}/config/${type}.json`).then((res) => res.json());

Promise.all([getConfig(type), import('mf-cli/mf')])
  .then(([{ remotes }, { loadRemoteEntry }]) =>
    // we use loadRemoteEntry to initialize all the remotes
    // so that package sharing can be resolved similar to how we statically
    // configure remote modules
    Promise.all(remotes.map((r) => loadRemoteEntry(r.entryUrl, r.name)))
  )
  .then(() => import('./app'));

const params = new URL(document.location).searchParams;

const type = window.sessionStorage.getItem('configType') || 'default';

Promise.all([
  fetch(`${__webpack_public_path__}/config/${type}.json`).then((res) => res.json()),
  import('mf-cli/mf'),
])
  .then(([{ remotes }, { loadRemoteEntry }]) =>
    Promise.all(remotes.map((r) => loadRemoteEntry(r.entryUrl, r.name)))
  )
  .then(() => import('./app'));

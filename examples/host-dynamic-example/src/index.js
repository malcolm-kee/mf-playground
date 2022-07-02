Promise.all([fetch('config/default.json').then((res) => res.json()), import('mf-cli/mf')])
  .then(([{ remotes }, { loadRemoteEntry }]) =>
    Promise.all(remotes.map((r) => loadRemoteEntry(r.entryUrl, r.name)))
  )
  .then(() => import('./app'));

echo "Building sites...";
pnpm run build:dev;

echo "Combining sites...";
rm -rf dist;

mv examples/root/dist dist;
mv examples/edge-example/dist dist/edge;
mv examples/noimport-example/dist dist/noimport;
mv examples/remote-example/dist dist/remote;
mv examples/remote-singleton-example/dist dist/singleton;
mv examples/stateless-example/dist dist/stateless;
mv examples/host-broken-example/dist dist/host-broken;
mv examples/host-conflict-example/dist dist/host-conflict;
mv examples/host-fixed-example/dist dist/host-fixed;
mv examples/host-noimport-example/dist dist/host-noimport;
mv examples/host-simple-example/dist dist/host-simple;
mv examples/host-dynamic-example/dist dist/host-dynamic;


echo "
/host-dynamic/*     /host-dynamic/index.html    200
" > dist/_redirects
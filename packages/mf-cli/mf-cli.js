const process = require('node:process');

const cac = require('cac');

/**
 * @type {import('cac').CAC}
 */
const cli = cac('mf-cli');

cli
  .command('dev', 'Start a dev server')
  .option('--publicPath [path]')
  .option('--port [port]', 'Port number for the server', {
    default: 3000,
  })
  .option('--open', 'Open browser when dev server started')
  .action((options) => {
    process.env.NODE_ENV = 'development';
    require('./commands/dev').dev(options);
  });

cli
  .command('build', 'Generate bundle')
  .option('--publicPath [path]')
  .option('--mode [mode]', 'Mode of compilation', {
    default: 'production',
  })
  .action((options) => {
    process.env.NODE_ENV = options.mode === 'production' ? 'production' : 'development';

    require('./commands/build').build(options);
  });

cli.help();

cli.parse();

export const launchJSON = {
  version: '0.2.0',
  configurations: [
    {
      type: 'node',
      request: 'launch',
      name: 'test',
      program: '${workspaceFolder}/node_modules/@teambit/bit/dist/app.js',
      args: ['test', '--debug'],
      console: 'integratedTerminal',
      sourceMaps: true,
      internalConsoleOptions: 'neverOpen',
    },
    {
      type: 'node',
      request: 'launch',
      name: 'compile',
      program: '${workspaceFolder}/node_modules/@teambit/bit/dist/app.js',
      args: ['compile'],
      console: 'integratedTerminal',
      sourceMaps: true,
      internalConsoleOptions: 'neverOpen',
    },
  ],
};

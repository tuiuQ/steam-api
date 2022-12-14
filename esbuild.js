const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/main.ts"],
  outfile: 'server.js',
  bundle: true,
  platform: 'node',
});


module.exports = {
    apps: [
      {
        name: 'auto-deploy',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3535',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  

//   run pm2 start ecosystem.config.js

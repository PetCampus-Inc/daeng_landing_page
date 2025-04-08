module.exports = {
  apps: [
    {
      name: 'landing',
      script: 'pnpm',
      args: 'start',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};

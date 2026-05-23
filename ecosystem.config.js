module.exports = {
  apps: [
    {
      name: 'prior-luxury',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/luxury-website',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/luxury-website/logs/pm2-error.log',
      out_file: '/luxury-website/logs/pm2-out.log',
      log_file: '/luxury-website/logs/pm2-combined.log',
      time: true,
      merge_logs: true,
    },
  ],
};

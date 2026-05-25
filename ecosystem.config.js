module.exports = {
  apps: [
    {
      name: "prior-luxury",

      // ─── CRITICAL FIX 1: Use standalone server ──────────────────────────
      // Old: running `next start` via node_modules/.bin/next
      //      → loads the full Next.js framework into RAM on startup (~300MB+)
      // New: runs the pre-built minimal standalone server
      //      → only loads what's needed (~150MB), your #1 memory win
      //
      // REQUIREMENT: next.config.mjs must have output: "standalone"
      // REQUIREMENT: after `next build`, run once:
      //   cp -r public .next/standalone/public
      //   cp -r .next/static .next/standalone/.next/static
      script: ".next/standalone/server.js",

      cwd: "/luxury-website",

      // ─── CRITICAL FIX 2: exec_mode fork, not cluster ────────────────────
      // cluster mode with instances:1 is the worst of both worlds:
      //   - adds cluster overhead (IPC, master process)
      //   - still only 1 worker
      //   - doubles memory usage vs fork for no benefit
      // fork = single process, no overhead, correct for 1 instance
      instances: 1,
      exec_mode: "fork",

      // ─── CRITICAL FIX 3: Node.js heap cap ──────────────────────────────
      // Your Droplet has 1GB RAM total. OS + Express + Redis client + Next.js
      // all share it. Without a heap cap, Node.js will try to use all available
      // RAM before GC kicks in, causing OOM kills (→ your 502 errors).
      // 512MB cap: Node GCs aggressively before hitting this, keeping the
      // process stable. Leave the other ~512MB for OS + your Express backend.
      node_args: "--max-old-space-size=512",

      // ─── CRITICAL FIX 4: max_memory_restart threshold ───────────────────
      // Old: 1G — by the time PM2 restarts at 1G your Droplet is already
      //      swapping to disk and everything is degraded or dead.
      // New: 450M — PM2 restarts before the OOM killer hits, keeping
      //      downtime to ~2s instead of a full crash + recovery cycle.
      max_memory_restart: "450M",

      autorestart: true,
      watch: false,

      // ─── Environment ────────────────────────────────────────────────────
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0", // required for standalone server to bind correctly
      },

      // ─── Restart behaviour ───────────────────────────────────────────────
      // Wait 3s before restarting after a crash — prevents a tight crash loop
      // from hammering your DB/Redis connections on every restart.
      restart_delay: 3000,

      // Stop trying to restart after 10 consecutive failures within 1 minute.
      // Without this, a broken deploy restarts infinitely and fills your logs.
      max_restarts: 10,
      min_uptime: "10s", // must stay up 10s to count as a successful start

      // ─── Logs ────────────────────────────────────────────────────────────
      error_file: "/luxury-website/logs/pm2-error.log",
      out_file: "/luxury-website/logs/pm2-out.log",
      log_file: "/luxury-website/logs/pm2-combined.log",
      time: true,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};

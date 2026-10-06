import type { NextConfig } from "next";
import os from "node:os";

/*
 * Next.js dev server blocks cross-origin requests to dev-only resources
 * (`/_next/hmr`, `/__nextjs*`) with 403 unless the Origin is `localhost`
 * (or listed in `allowedDevOrigins`). The check compares the Origin header —
 * which the browser always sends on the HMR websocket handshake, even for a
 * same-host page — against that allowlist.
 *
 * When the dev site is opened through any address the machine is not
 * matched by `localhost` for — its LAN IP from another device, or even
 * `127.0.0.1` (the matcher only accepts the string `localhost`/`**.localhost`)
 * — the HMR websocket is rejected and the client app never completes
 * hydration: the whole page renders but every client-side animation stays
 * frozen at its initial state.
 *
 * Allow every IPv4 address the machine currently has (loopback included,
 * recomputed on each dev-server start so DHCP changes are picked up) so
 * motion works whether the site is reached via localhost, 127.0.0.1, or the
 * LAN. This is a dev-server-only safety valve; it does not affect production.
 */
function machineAddresses(): string[] {
  const addresses = new Set<string>();
  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const iface of interfaces ?? []) {
      if (iface.family === "IPv4") {
        addresses.add(iface.address);
      }
    }
  }
  return [...addresses];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: machineAddresses(),
};

export default nextConfig;

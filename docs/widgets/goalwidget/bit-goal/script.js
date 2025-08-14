// script.js (bit-goal)

/**
 * 1. Imports
 */
import { loadConfig } from '../../common/config.js';
import {
  parseTokenFromUrl,
  twitchApi,
  requestToken
} from '../../common/twitch.js';

/**
 * 2. Default config + URL overrides
 *    - type: 'follower' → finds follower goals
 */
const config = loadConfig({
  size:        200,
  clientId:    'YOUR_TWITCH_CLIENT_ID',
  redirectUri: window.location.href,
  scopes:      ['channel:read:goals'],
  type:        'bits'    // ← change to 'subscriber' or 'bits' in other folders
});

/**
 * 3. OAuth Implicit Flow
 */
let token = parseTokenFromUrl();
if (!token) {
  requestToken(config.clientId, config.redirectUri, config.scopes);
  // After redirect, token will appear in URL hash
}

/**
 * 4. Render SVG + text container
 */
const root = document.getElementById('widget-root');
root.innerHTML = /* html */`
  <svg viewBox="0 0 200 200">
    <circle
      cx="100" cy="100" r="80"
      stroke="rgba(255,255,255,0.2)"
      stroke-width="16" fill="none"
    />
    <circle
      id="progress-ring"
      cx="100" cy="100" r="80"
      stroke="var(--color-primary-start)"
      stroke-width="16"
      fill="none"
      stroke-dasharray="${2 * Math.PI * 80}"
      stroke-dashoffset="${2 * Math.PI * 80}"
      transform="rotate(-90 100 100)"
    />
  </svg>
  <div id="progress-text">Loading…</div>
`;

/**
 * 5. Fetch & draw
 */
async function refreshGoal() {
  // Replace YOUR_BROADCASTER_ID with the channel’s ID
  const res = await twitchApi(
    `goals?broadcaster_id=YOUR_BROADCASTER_ID`,
    token,
    config.clientId
  );
  const goal = res.data.find(g => g.type === config.type);
  if (!goal) return;

  const pct = goal.current_amount / goal.target_amount;
  const ring = document.getElementById('progress-ring');
  const offset = 2 * Math.PI * 80 * (1 - pct);
  ring.setAttribute('stroke-dashoffset', offset);

  document.getElementById('progress-text').textContent =
    `${config.type.charAt(0).toUpperCase() + config.type.slice(1)}: ` +
    `${goal.current_amount} / ${goal.target_amount}`;
}

// 6. Initial + polling every 30s
refreshGoal();

setInterval(refreshGoal, 30_000);

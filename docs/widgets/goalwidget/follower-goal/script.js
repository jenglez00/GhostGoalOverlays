// docs/widgets/GoalWidget/Follower-Goal/script.js

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.widgetConfig || {};
  const { target = 0, label = "Followers" } = cfg.followerGoals || {};

  // for now we’re using a placeholder; later twitch.js can populate this
  const current = 0;

  // grab our elements
  const textEl = document.getElementById("follower-text");
  const fillEl = document.getElementById("progress-fill");
  const iconEl = document.getElementById("ghost-icon");

  // apply any theme overrides from config.js
  if (cfg.theme) {
    // CSS variables for colors
    document.documentElement.style.setProperty("--primary-color", cfg.theme.primaryColor);
    document.documentElement.style.setProperty("--bg-color", cfg.theme.backgroundColor);
    // icon opacity
    iconEl.style.opacity = cfg.theme.iconOpacity;
  }

  // update the UI text + progress bar width
  textEl.textContent = `${current} / ${target} ${label}`;
  const pct = target > 0 ? (current / target) * 100 : 0;
  fillEl.style.width = `${pct}%`;
});

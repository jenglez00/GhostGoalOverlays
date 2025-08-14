// docs/common/twitch.js

window.twitch = {
  getFollowers: async function(channelName) {
    console.log(`[twitch.js] Simulating follower count for "${channelName}"`);

    // Replace this with real Twitch API logic later
    // For now, return a fake count so the widget works
    return { total: 10 };
  }
};

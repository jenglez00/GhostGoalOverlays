(function() {
  function updateFollowerGoal() {
    twitch.getFollowers(config.channelName)
      .then(data => {
        // data.total might be a string or number
        const current = Number(data.total) || 0;
        const goal    = Number(config.followersGoal) || 100;
        const percent = Math.min((current / goal) * 100, 100);

        document.getElementById('follower-text').textContent = `${current}/${goal}`;
        document.getElementById('progress-fill').style.width =
          percent + '%';
      })
      .catch(err => {
        console.error('Follower-Goal error:', err);
      });
  }

  // Initial draw
  updateFollowerGoal();

  // Poll every 60s for updates
  setInterval(updateFollowerGoal, 60_000);
})();

// docs/common/config.js

;(function(window) {
  window.widgetConfig = {
    followerGoals: {
      // change this to your desired follower goal
      target: 100,

      // the label shown next to the count
      label: "Followers"
    },

    // optional theme settings
    theme: {
      primaryColor: "#FF8800",      // fill color for progress bar
      backgroundColor: "#F8F8F8",   // widget background
      iconOpacity: 0.85              // opacity for the ghost icon
    }

    // you can extend this object later with:
    //   - pollingIntervalMs
    //   - customFonts
    //   - secondaryGoals
    //   - etc.
  };
})(window);

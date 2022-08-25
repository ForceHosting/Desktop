let titlebar;
const { Titlebar, Color } = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#388e3c"),
    itemBackgroundColor: Color.fromHex("#121212"),
  })
})
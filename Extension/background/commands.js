/**
 * initCommands
 */
let initCommands = () => {

  chrome.commands.onCommand.addListener((command) => {

    if (command.toString() === 'toggle_grid_overlay') {
      chrome.tabs.query({
          active: true,
          currentWindow: true,
        }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            function: 'toggleGridOverlay',
          })
        },
      )
    }

  })
}

initCommands()

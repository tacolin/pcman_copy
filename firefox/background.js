function sendMessageToTab(tab_id, command) {
    const info = {
        "message": "tacolin.pcman.copy.click",
        "command": command
    };
    browser.tabs.sendMessage(tab_id, info);
}

function clicked(tab) {
    sendMessageToTab(tab.id, "title-special");
}

browser.browserAction.onClicked.addListener(clicked);

function command_pressed(command) {
    if (command == "align-only" || command == "title-special") {
        let get = browser.tabs.query({active: true, currentWindow: true});
        get.then((tabs) => {
            sendMessageToTab(tabs[0].id, command);
        })
    }
}

browser.commands.onCommand.addListener(command_pressed);

browser.contextMenus.create({
  id: "title-special",
  title: "含標題 (&Z)",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "align-only",
  title: "僅內文 (&V)",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    sendMessageToTab(tab.id, info.menuItemId);
});

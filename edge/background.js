function sendMessageToTab(tab_id, command) {
    const info = {
        "message": "tacolin.pcman.copy.click",
        "command": command
    };
    chrome.tabs.sendMessage(tab_id, info);
}

function clicked(tab) {
    sendMessageToTab(tab.id, "title-special");
}

chrome.browserAction.onClicked.addListener(clicked);

chrome.contextMenus.create({
  id: "title-special",
  title: "含標題 (&Z)",
  contexts: ["selection"]
});

chrome.contextMenus.create({
  id: "align-only",
  title: "僅內文 (&V)",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    sendMessageToTab(tab.id, info.menuItemId);
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == "align-only" || command == "title-special") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            sendMessageToTab(tabs[0].id, command);
        });
    }
});

/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!");
});

chrome.history.onVisited.addListener(async (historyItem) => {
    let url_list = (await chrome.storage.sync.get(["url_list"])).url_list || [],
        current_url = new URL(historyItem.url).origin;
    for (let item of url_list) {
        if (current_url === item.url) {
            chrome.history.deleteUrl({ url: historyItem.url }, () => {});
        }
    }
});

chrome.contextMenus.create({
    id: "1",
    title: "Add current url to history filter",
    contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let url_list = (await chrome.storage.sync.get(["url_list"])).url_list || [];
    chrome.storage.sync.set(
        {
            url_list: [
                ...url_list,
                { id: +new Date(), url: new URL(tab.url).origin },
            ],
        },
        () => {
            console.log("Added url");
        }
    );
});

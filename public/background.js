/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!");
});

chrome.history.onVisited.addListener(async (historyItem) => {
    let result = await chrome.storage.sync.get(["url_list"]),
        current_url = new URL(historyItem.url).origin;
    for (let item of result.url_list) {
        if (current_url === item.url) {
            chrome.history.deleteUrl({ url: historyItem.url }, () => {});
        }
    }
});

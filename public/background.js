/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!");
});

const autoFilter = async (historyItem) => {
    let url_list = (await chrome.storage.sync.get(["url_list"])).url_list || [],
        current_url = new URL(historyItem.url).origin;
    for (let url_item of url_list) {
        if (current_url === url_item.url) {
            chrome.history.deleteUrl({ url: historyItem.url }, () => {});
            break;
        }
    }
};

const filterAll = async () => {
    let url_list = (await chrome.storage.sync.get(["url_list"])).url_list || [];
    for (let url_item of url_list) {
        let history_list =
            (await chrome.history.search({
                text: url_item.url,
                maxResults: 10000,
            })) || [];
        for (let history_item of history_list) {
            chrome.history.deleteUrl({ url: history_item.url }, () => {});
        }
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Recieved message: " + request.message);
    if (request.message === "AUTO_FILTER_ON") {
        chrome.history.onVisited.addListener(autoFilter);
    } else if (request.message === "AUTO_FILTER_OFF") {
        chrome.history.onVisited.removeListener(autoFilter);
    } else if (request.message === "FILTER_ALL") {
        filterAll();
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

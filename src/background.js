chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'tabsCreate') {
    chrome.tabs
        .create({
          url: request.options.url,
          active: request.options.active,
          openerTabId: sender.tab.id,
        })
        .then((tab) => {
          if (!chrome.tabs.group) {
            return;
          }
          return chrome.tabs.group({
            tabIds: tab.id,
            groupId: sender.tab.groupId,
          });
        });
    return true;
  }
  return false;
});

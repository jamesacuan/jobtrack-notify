chrome.contextMenus.removeAll();

/*chrome.storage.sync.set({"links": [
  ["Network Utilization", "http://nod.sencor.net/NetworkUtilization/NetworkUtil.aspx", "NU"],
  ["Turnover", "http://nod.sencor.net/TurnOver/TurnOver.aspx", "TO"],
  ["Email", "http://nod.sencor.net/PSIEmail/PSI.aspx", "EM"],
  ["PRF", "http://nod.sencor.net/PRF/PRF's.aspx", "PRF"]
]
});

chrome.storage.sync.get(
  "links", function(result){
    for(var i = 0; i < result.links.length; i++) {
      chrome.contextMenus.create({
        title: result.links[i][0],
        id: result.links[i][2],
        contexts: ["browser_action"],
      });
    }

    ...implement event page.....
    chrome.contextMenus.onClicked.addListener(onClickHandler);

});
*/

chrome.contextMenus.create({
  "title"    : "Network Utilization",
  "id"       : "NETUTIL",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Information",
  "id"       : "PARENT",
  "contexts" : ["browser_action"]
});
chrome.contextMenus.create({
  "title"    : "Primary Email (PSI)",
  "parentId" : "PARENT",
  "id"       : "EMAIL",
  "contexts" : ["browser_action"]
});
chrome.contextMenus.create({
  "title"    : "Backup Email (ePLDT)",
  "parentId" : "PARENT",
  "id"       : "BACKUP",
  "contexts" : ["browser_action"]
});
chrome.contextMenus.create({
  "title"    : "PRF",
  "parentId" : "PARENT",
  "id"       : "PRF",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Email",
  "parentId" : "PARENT",
  "id"       : "EMAIL",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Turnover",
  "id"       : "TURNOVER",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
  if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
    console.log("radio item " + info.menuItemId +
                " was clicked (previous checked state was "  +
                info.wasChecked + ")");
  } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
    console.log(JSON.stringify(info));
    console.log("checkbox item " + info.menuItemId +
                " was clicked, state is now: " + info.checked +
                " (previous state was " + info.wasChecked + ")");

  } else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
  }
};
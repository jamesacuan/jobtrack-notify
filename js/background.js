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
  "title"    : "NOD",
  "id"       : "NOD",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Old NOD Site",
  "parentId" : "NOD",
  "id"       : "OLD",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Information",
  "parentId" : "NOD",
  "id"       : "INFORMATION",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Hardware Maintenance",
  "parentId" : "NOD",
  "id"       : "HARDWARE",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Turnover",
  "id"       : "TURNOVER",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "E-Profile",
  "id"       : "PROFILE",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Overtime",
  "id"       : "OVERTIME",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.create({
  "title"    : "Change Schedule",
  "id"       : "CHANGESCHED",
  "contexts" : ["browser_action"]
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
  if (info.menuItemId == "NETUTIL") {
	  chrome.tabs.create({ url: "http://nod.sencor.net/NetworkUtilization/NetworkUtil.aspx" });
  }
  else if (info.menuItemId == "EMAIL") {
	  chrome.tabs.create({ url: "http://nod.sencor.net/PSIEmail/PSI.aspx" });
  }
  else if (info.menuItemId == "BACKUP") {
	  chrome.tabs.create({ url: "http://nod.sencor.net/ePLDT/ePLDT.aspx" });
  }
  else if (info.menuItemId == "PRF") {
	  chrome.tabs.create({ url: "http://nod.sencor.net/PRF/PRF's.aspx" });
  }
  else if (info.menuItemId == "TURNOVER") {
	  chrome.tabs.create({ url: "http://nod.sencor.net/TurnOver/TurnOver.aspx" });
  }
  else if (info.menuItemId == "PROFILE") {
	  chrome.tabs.create({ url: "http://eprofile.int.sencor.net" });
  }
  else if (info.menuItemId == "OVERTIME") {
	  chrome.tabs.create({ url: "http://overtime.int.sencor.net" });
  }
  else if (info.menuItemId == "CHANGESCHED") {
	  chrome.tabs.create({ url: "http://changesched.int.sencor.net" });
  }
  else if (info.menuItemId == "HARDWARE") {
	  chrome.tabs.create({ url: "http://nod.int.sencor.net/pulloutform/main.asp" });
  }
  else if (info.menuItemId == "INFORMATION") {
	  chrome.tabs.create({ url: "http://information.int.sencor.net/informationlogin.asp" });
  }
  else {
	console.log("error in context menu");
  }
};
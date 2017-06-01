chrome.contextMenus.removeAll();

var links = [
  ["Network Utilization", "http://nod.sencor.net/NetworkUtilization/NetworkUtil.aspx"],
  ["Turnover", "http://nod.sencor.net/TurnOver/TurnOver.aspx"],
  ["Email", "http://nod.sencor.net/PSIEmail/PSI.aspx"],
  ["PRF", "http://nod.sencor.net/PRF/PRF's.aspx"]
];

for(var i = 0; i < links.length; i++) {
  chrome.contextMenus.create({
      title: links[i][0],
      contexts: ["browser_action"],
      onclick: function() {         
        window.open(window.links[i][1], '_blank');
      }
  });
}
chrome.contextMenus.removeAll();

var links = [
  ["NOD Site", "http://nod.sencor.net"],
  ["Hardware Maintenance", "http://nod.int.sencor.net/pulloutform/main.asp"],
  ["E-profile", "http://eprofile.int.sencor.net"]
];

for(var i = 0; i < links.length; i++) {
  chrome.contextMenus.create({
      title: links[i][0],
      contexts: ["browser_action"],
      onclick: function() {         
        window.open(""+links[i][1], '_blank');
      }
  });
}
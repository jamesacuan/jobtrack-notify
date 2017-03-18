var s = document.createElement('script');
var t = document.createElement('script');
s.src = chrome.extension.getURL('/js/moment.min.js');
t.src = chrome.extension.getURL('/js/notify.js');
(document.head||document.documentElement).appendChild(s);
(document.head||document.documentElement).appendChild(t);
s.onload = function() {
    s.parentNode.removeChild(s);
};
t.onload = function() {
    t.parentNode.removeChild(t);
};

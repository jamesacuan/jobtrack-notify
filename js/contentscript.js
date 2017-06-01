var s = document.createElement('script');
var t = document.createElement('script');
var u = document.createElement('script');

u.src = chrome.extension.getURL('/js/jquery.min.js');
s.src = chrome.extension.getURL('/js/moment.min.js');
t.src = chrome.extension.getURL('/js/fix.js');

(document.head||document.documentElement).appendChild(u);
(document.head||document.documentElement).appendChild(s);
(document.head||document.documentElement).appendChild(t);
u.onload = function() {
    u.parentNode.removeChild(u);
};
s.onload = function() {
    s.parentNode.removeChild(s);
};
t.onload = function() {
    t.parentNode.removeChild(t);
};

moment().format();
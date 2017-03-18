// ==UserScript==
// @name        jobtrack notify
// @namespace   sencor.net
// @include     http://jobtrack.ncg.sencor.net/resolverdb.aspx
// @require     http://momentjs.com/downloads/moment.min.js
// @version     1
// @grant       none
// ==/UserScript==

moment().format();
if (document.getElementById('ctl00_ContentPlaceHolder1_gvPending') === null) {
  checkToast();
  title = 'Jobtrack has crashed';
  body = 'Don\'t worry. We have reload it for you';
  toast(title, body);
  location.reload();
} 
else {
  checkToast();
  table = document.getElementById('ctl00_ContentPlaceHolder1_gvPending');
  cells = table.getElementsByTagName('td');
  status = cells[7].textContent.replace(/\s+/g, ' ');
  title = 'Jobtrack #' + cells[0].textContent.replace(/\s+/g, ' ');
  time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
  body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
  if (status == 'In-progress') {
    toast(title, body);
  }
}
function checkToast() {
  if (Notification.permission === 'granted') {
  } 
  else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        location.reload();
      }
    });
  }
}
function toast(title, body) {
  var notification = new Notification(title, {
    icon: 'http://eprofile.int.sencor.net/images/sencor150.png',
    body: body
  });
  notification.onclick = function () {
    window.focus();
  }
}
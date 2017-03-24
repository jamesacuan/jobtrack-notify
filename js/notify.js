moment().format();
checkToast();
if (document.getElementById('ctl00_ContentPlaceHolder1_gvPending') === null) {
  setFavicon('404');
  location.reload();
} 
else {
  table = document.getElementById('ctl00_ContentPlaceHolder1_gvPending');
  cells = table.getElementsByTagName('td');
  status = cells[7].textContent.replace(/\s+/g, ' ');
  title = 'Jobtrack #' + cells[0].textContent.replace(/\s+/g, ' ');
  time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
  body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
  if (status == 'New') {
    toast(title, body);
    setFavicon(status);
  } 
  else {
    setFavicon('okay');
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
function setFavicon(status) {
  var link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  if (status == 'New') {
    link.href = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master/img/favicon-new.png';
  } 
  else if (status == '404') {
    link.href = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master/img/favicon-alert.png';
  } 
  else {
    link.href = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master/img/favicon-none.png';
  }
  document.getElementsByTagName('head') [0].appendChild(link);
}
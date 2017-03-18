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
  if (status == 'Pending') {
    toast(title, body);
    setFavicon();
  }
  else{
    unsetFavicon();
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

function setFavicon() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    /*i just don't know how to call the image, webextension uses isolated world to segregate 
    the extension and the site.*/
    link.href = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master/img/favicon-new.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}

function unsetFavicon(){
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master/img/favicon-none.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}
//storage = chrome.storage.sync;
url = 'http://jobtrack.ncg.sencor.net/processor.aspx?editID=';
src = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master';
tblPending = document.getElementById('ctl00_ContentPlaceHolder1_gvPending');
tblReserve = document.getElementById('ctl00_ContentPlaceHolder1_gvRoomReservation');
tblOverdue = document.getElementById('ctl00_ContentPlaceHolder1_gvOverDue');
now = new Date();

moment().format();
checkToast();

if (tblPending === null) {
  setFavicon('404');
  location.reload();
} 
else {
  //   Check for new jobtrack
  var cells = tblPending.getElementsByTagName('td');
  var status = cells[7].textContent.replace(/\s+/g, ' ');
  var jobid = cells[0].textContent.replace(/\s+/g, ' ');
  var title = 'Jobtrack #' + jobid;
  var time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
  body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
  if (status == 'New') {
    toast(title, body, url+jobid);
    setFavicon(status);
  } 
  else {
    setFavicon('okay');
  }
    
  //  Check for unassigned overdue jobtrack
  cells = tblOverdue.getElementsByTagName('td');
  assigned = cells[8].textContent.replace(/\s+/g, ' ');
  jobid = cells[0].textContent.replace(/\s+/g, ' ');

  title = 'Jobtrack #' + jobid;
  time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
  body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
  if (assigned) {
    toast(title, body, url+jobid);
    setFavicon('New');
  } 
  else {
    setFavicon('okay');
  }
    
  //  Check for upcoming reservation
  cells = tblReserve.getElementsByTagName('td');
  start = cells[2].textContent.replace(/\s+/g, ' ').trim();
  title = cells[5].textContent.replace(/\s+/g, ' ').trim();
  body  = cells[4].textContent.replace(/\s+/g, ' ').trim()+'\n'+cells[0].textContent.replace(/\s+/g, ' ').trim()+'\n'+start;
  var d = new Date(start);
  var min = 0;
  if(d.getMinutes()==0)
    min = 59;
  else
    min = d.getMinutes;

  if((now.getHours()-d.getHours())==-1){
    if((min-now.getMinutes())<=15 && (min-now.getMinutes())>=10){
      toast(title, body, 'goback');
    }
  }
}
function checkToast() {
  if (Notification.permission === 'granted') {} 
  else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        location.reload();
      }
    });
  }
}
function toast(title, body, url) {
  var notification = new Notification(title, {
    icon: 'http://eprofile.int.sencor.net/images/sencor150.png',
    body: body
  });
  setTimeout(function(){
    notification.close();
  },3000);
  notification.onclick = function () {
      if(url=='goback'){
        window.focus();
      }
      else{
        var win = window.open(url, '_blank');
        win.focus();
      }
  };
}
function setFavicon(status) {
  var link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  if (status == 'New')
    link.href = src+'/img/favicon-new.png';
  else if (status == '404')
    link.href = src+'/img/favicon-alert.png'; 
  else
    link.href = src+'/img/favicon-none.png';
  document.getElementsByTagName('head') [0].appendChild(link);
}
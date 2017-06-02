//storage = chrome.storage.sync;
jobtrack = "http://jobtrack.ncg.sencor.net/resolverdb.aspx";
emailloc = "http://nod.sencor.net/PSIEmail/PSI.aspx";
jobreq = "http://jobtrack.ncg.sencor.net/editrequest.aspx";
scanprf = "http://nod.sencor.net/PRF/PRF's.aspx";
url = 'http://jobtrack.ncg.sencor.net/processor.aspx?editID=';
src = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master';
cph = "ctl00_ContentPlaceHolder1_";
tblPending = document.getElementById(cph + "gvPending");
tblReserve = document.getElementById(cph + "gvRoomReservation");
tblOverdue = document.getElementById(cph + "gvOverDue");
tblEmail = document.getElementById('ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView');
now = new Date();
$('body').append("<div class='notify'>testing</div>");
if (document.location.href == jobreq) {
  asset = $('#ctl00_ContentPlaceHolder1_lblAssetNo').text();
  $("#" + cph + "lblJobtrackNo").dblclick(function(e) {
    var test = $(e.target).text().trim();
    copy(test);
  });
  /*$("#" + cph + "lblAssetNo").dblclick(function(e){
      var test = $(e.target).text().trim();
      copy(test);
  });
  */
  $("#" + cph + "lblAssetNo").html(asset + "<a style='margin-left: 10px; text-decoration: none' href='http://inventory.int.sencor.net/Description.asp?qinvcomputername=" + asset + "' target='_blank' class='cmdbutton' style='text-decoration: none'>Inventory</a> <a href='http://nod.int.sencor.net/pulloutform/result2.asp?search=" + asset + "' target='_blank' class='cmdbutton'>Hardware Maintenance</a>");
} else if (document.location.href == emailloc) {
  var cells = tblEmail.getElementsByTagName('td');
  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(2)').dblclick(function(e) {
    var test = $(e.target).text().trim() + " (SENCOR)";
    copy(test);
    $('tr').removeClass('active');
    $(this).parent().addClass('active');
  });
  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(4)').dblclick(function(e) {
    var test = $(e.target).text().trim();
    copy(test);
    $('tr').removeClass('active');
    $(this).parent().addClass('active');
  });
  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(5)').dblclick(function(e) {
    var test = $(e.target).text().trim();
    copy(test);
    $('tr').removeClass('active');
    $(this).parent().addClass('active');
  });
} else if (document.location.href == scanprf){
  $('body').append("<div class='lightbox'><div class='container'><span id='closebox'>close</span><img src='http://nod.sencor.net/PRF_Files/020617054314.jpg'></img></div></div>");
  var c = document.getElementById("closebox");

  c.addEventListener('click', function() {
    lightbox('test');
  }, false);
}
else {
  var mom = 1;
  try {
    moment().format();
  } catch (err) {
    mom = 0;
    console.log(err.message);
  }
  checkToast();
  if (tblPending === null) {
    setFavicon('404');
    refresh();
  } else {
    //   Check for new jobtrack
    var cells = tblPending.getElementsByTagName('td');
    var status = cells[7].textContent.replace(/\s+/g, ' ');
    var jobid = cells[0].textContent.replace(/\s+/g, ' ');
    var title = 'Jobtrack #' + jobid;
    var time;
    if (mom == 1) {
      time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
    } else {
      time = cells[2].textContent.replace(/\s+/g, ' ').trim();
    }
    body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
    if (status == 'New') {
      toast(title, body, url + jobid);
      setFavicon(status);
    } else {
      setFavicon('okay');
    }
    //  Check for unassigned overdue jobtrack
    cells = tblOverdue.getElementsByTagName('td');
    assigned = cells[8].textContent.replace(/\s+/g, ' ');
    jobid = cells[0].textContent.replace(/\s+/g, ' ');
    title = 'Jobtrack #' + jobid;
    if (mom == 1) {
      time = moment(cells[2].textContent.replace(/\s+/g, ' ').trim(), 'MM/DD/YY hh:mm a').fromNow();
    } else {
      time = cells[2].textContent.replace(/\s+/g, ' ').trim();
    }
    body = cells[4].textContent.replace(/\s+/g, ' ') + '(' + cells[5].textContent.replace(/\s+/g, ' ').trim() + ')' + ' : ' + cells[1].textContent.replace(/\s+/g, ' ').trim() + '\n ' + time;
    if (assigned == "") {
      toast(title, body, url + jobid);
      setFavicon('New');
    } else {
      setFavicon('okay');
    }
    //  Check for upcoming reservation
    cells = tblReserve.getElementsByTagName('td');
    start = cells[2].textContent.replace(/\s+/g, ' ').trim();
    title = cells[5].textContent.replace(/\s+/g, ' ').trim();
    body = cells[4].textContent.replace(/\s+/g, ' ').trim() + '\n' + cells[0].textContent.replace(/\s+/g, ' ').trim() + '\n' + start;
    var d = new Date(start);
    var min = 0;
    if (d.getMinutes() == 0) min = 59;
    else min = d.getMinutes;
    if ((now.getHours() - d.getHours()) == -1) {
      if ((min - now.getMinutes()) <= 15 && (min - now.getMinutes()) >= 10) {
        toast(title, body, 'goback');
      }
    }
  }
}

function toast(title, body, url) {
  var notification = new Notification(title, {
    icon: 'http://eprofile.int.sencor.net/images/sencor150.png',
    body: body
  });
  setTimeout(function() {
    notification.close();
  }, 3000);
  notification.onclick = function() {
    if (url == 'goback') {
      window.focus();
    } else {
      var win = window.open(url, '_blank');
      win.focus();
    }
  };
}


function setFavicon(status) {
  var link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  if (status == 'New') link.href = src + '/img/favicon-new.png';
  else if (status == '404') link.href = src + '/img/favicon-alert.png';
  else link.href = src + '/img/favicon-none.png';
  document.getElementsByTagName('head')[0].appendChild(link);
}

function notify(elem) {
  $('.notify').html(elem);
  $('.notify').fadeToggle('fast').delay(2000).fadeOut();
}

function copy(elem) {
  try {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    $(dummy).css('display', 'block');
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = elem;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    notify('<u>' + elem + '</u> has been copied to clipboard');
    $(this).parent().text('test');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
}

function refresh() {
  location.reload();
}

function checkToast() {
  if (Notification.permission === 'granted') {} else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
    Notification.requestPermission(function(permission) {
      if (permission === 'granted') {
        refresh();
      }
    });
  }
}

function lightbox(elem){
  $('.lightbox').fadeToggle();
}
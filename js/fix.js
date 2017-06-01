//storage = chrome.storage.sync;
jobtrack = "http://jobtrack.ncg.sencor.net/resolverdb.aspx";
emailloc = "http://nod.sencor.net/PSIEmail/PSI.aspx";
url = 'http://jobtrack.ncg.sencor.net/processor.aspx?editID=';
src = 'https://raw.githubusercontent.com/jamesacuan/jobtrack-notify/master';
tblPending = document.getElementById('ctl00_ContentPlaceHolder1_gvPending');
tblReserve = document.getElementById('ctl00_ContentPlaceHolder1_gvRoomReservation');
tblOverdue = document.getElementById('ctl00_ContentPlaceHolder1_gvOverDue');
tblEmail = document.getElementById('ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView');

now = new Date();


if (document.location.href == emailloc){
  $('body').append("<div class='notify' style='border:#f0c36d 1px solid; display:none;position: absolute;top: 45px;background: #fff6b5;font-family: segoe ui, arial, sans-serif;font-size: 12px;padding: 8px;border-radius: 3px;left: 40%;'>testing</div>");
  $("<style type='text/css'> .active{ background-color: #fff6b5 !important;} </style>").appendTo("head");

  var cells = tblEmail.getElementsByTagName('td');

  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(2)').dblclick(function(e){
      var test = $(e.target).text().trim() + " (SENCOR)";
      copy(test);
  });


  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(4)').dblclick(function(e){
      var test = $(e.target).text().trim();
      copy(test);
  });

  $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView td:nth-child(5)').dblclick(function(e){
      var test = $(e.target).text().trim();
      copy(test);
  });

}
else{
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
    if (assigned == "") {
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

}

function copy(elem){
    try {
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      $(dummy).css('display','block');
      dummy.setAttribute("id", "dummy_id");
      document.getElementById("dummy_id").value=elem;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      $('.notify').html('<u>' + elem + '</u> has been copied to clipboard');
      $('.notify').fadeToggle('fast').delay(2000).fadeOut();
      $(this).parent().text('test');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  }
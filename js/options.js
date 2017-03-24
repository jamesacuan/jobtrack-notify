var storage = chrome.storage.sync;
var btnSave = document.getElementById('save');
var inpRoom = document.getElementById('room');
var inpJob  = document.getElementById('newjob'); 

loadChanges();

btnSave.addEventListener('click', saveChanges);
btnReset.addEventListener('click', clearChanges);

function saveChanges() {
  var pingRoom = inpRoom.checked;
  var pingNew  = inpJob.checked;
  storage.set({
     pingRoom: pingRoom,
     pingNew: pingNew
    }, function() {
      message('Settings saved.');
  });
}

function loadChanges() {
  storage.get({
    pingRoom: false,
    pingNew: true
  }, function(items) {
    inpRoom.checked = items.pingRoom;
    inpJob.checked = items.pingNew;
 });
}
function clearChanges(){

}

function message(msg){
  var status = document.getElementById('status')
  status.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}


//document.addEventListener('DOMContentLoaded', restore_options);

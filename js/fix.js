tblEmail = document.getElementById('ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_GrdView');

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

/*$(tblEmail).closest('td:nth-child(2)').click(function(e){
    alert($(e.target).text() + " (SENCOR)");
});*/


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
      console.log('Copying text command was ' + elem);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
}
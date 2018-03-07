u = chrome.extension.getURL('/js/jquery.min.js');
s = chrome.extension.getURL('/js/moment.min.js');
w = chrome.extension.getURL('/js/jquery.dataTables.min.js');
t = chrome.extension.getURL('/js/fix.js');
v = chrome.extension.getURL('/css/style.css');

function loadfile(filename, filetype){
    if (filetype=="js"){
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    console.log(fileref);
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
        
    
}

loadfile(u, "js");
loadfile(s, "js");
loadfile(w, "js");
loadfile(v, "css");
loadfile(t, "js");
/*
v = $('#ctl00_ContentPlaceHolder1_lblResolution').text();
chrome.storage.sync.set({
    "resolution": v;
});*/

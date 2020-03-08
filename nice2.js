
var prefix=null;
var confirm_download=null;
var saveByteArray = function (reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};
function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
 }
 
function exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      fakeClick(save_link);
    } 
    
// exportRaw('template.txt',TXTTEMP)

var download = function(i, byte){
    if(confirm_download==null){
        confirm_download = window.confirm("是否需要下载？");
    }
    if(confirm_download){
        if(prefix==null){
            prefix = window.prompt("请输入保存文件前缀：");
            if(prefix==="")
                prefix = `${Math.floor((new Date()).getTime() / 1000)}`;
        }
        reportName = `${prefix}_${i}.pdf`;
        saveByteArray(reportName, byte);
    }
}



// 输出 https://gateway.keledge.com/transfer/aqr/authorize
var output_prefix = null;
var output_authorize = function(result){
    if(output_prefix==null)
        output_prefix = `${Math.floor((new Date()).getTime() / 1000)}`;
    exportRaw(`${output_prefix}_authorize.txt`, JSON.stringify(result));
}

var passwd_is_download = false
var output_password = function(passwd){
    if(passwd_is_download)
        return
    if(output_prefix==null)
        output_prefix = `${Math.floor((new Date()).getTime() / 1000)}`;
    exportRaw(`${output_prefix}_passwd.txt`, passwd);
    passwd_is_download = true;
}


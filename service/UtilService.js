var UtilService = function () { }

UtilService.prototype.toQueryString = function (params) {
    var t = "";
    if (params && typeof params == 'object' && !Array.isArray(params)) {
        var keys = Object.getOwnPropertyNames(params);
        for (var i = 0; i < keys.length; i++)
            t += (i == 0 ? '?' : '&') + keys[i] + "=" + params[keys[i]];
    }
    return t;
}

UtilService.prototype.response = function (success, message, data) {
    var response = {
        data: data || null,
        message: message || "",
        success: success || false
    }
    return response;
}

UtilService.prototype.getRequest = function (url, params) {
    var _self = this;
    var promise = new Promise(function (resolve, reject) {
        url += _self.toQueryString(params);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                debugger
                if (this.status == 200)
                    resolve(_self.response(true, null, xhttp.responseText));
                else
                    reject(_self.response(false, "[Status: " + this.status + " - " + xhttp.responseText.toString() + "]"));
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
    return promise;
}

UtilService.prototype.errorLog = function (e, showAlert) {
    e = e || "";
    showAlert = showAlert || false;
    console.log("Error: ", e.toString());
    if (showAlert) {
        alert("Error: " + e.toString());
    }
}
var Util = function () { }

Util.prototype.toQueryString = function (params) {
    var t = "";
    if (params && typeof params == 'object' && !Array.isArray(params)) {
        var keys = Object.getOwnPropertyNames(params);
        for (var i = 0; i < keys.length; i++)
            t += (i == 0 ? '?' : '&') + keys[i] + "=" + params[keys[i]];
    }
    return t;
}

Util.prototype.response = function (success, message, data) {
    var response = {
        data: data || null,
        message: message || "",
        success: success || false
    }
    return response;
}

Util.prototype.getRequest = function (url, params) {
    var _self = this;
    var promise = new Promise(function (resolve, reject) {
        url += _self.toQueryString(params);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200)
                    resolve(_self.response(true, null, xhttp.responseText));
                else
                    reject(_self.response(false, "Erro no retorna da requisição [Status: " + this.status + "]", xhttp.responseText));
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
    return promise;
}

Util.prototype.errorLog = function (e) {
    e = e || "";
    alert("Error [" + e.toString() + "]");
    console.log("Error: ", e.toString());
}
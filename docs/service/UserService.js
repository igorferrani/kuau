var UserService = function () {
    this.utilService = new UtilService();
}

UserService.prototype.fetch = function (login) {
    login = login || '';
    var _self = this;
    var promise = new Promise(function (resolve, reject) {
        if (login !== '') {
            var request = _self.utilService.getRequest("https://api.github.com/users/" + login);
            request.then(function (retorno) {
                if (retorno.success) {
                    retorno.data = JSON.parse(retorno.data)
                    if (retorno.data.message) {
                        retorno.message = retorno.data;
                        retorno.success = false;
                        retorno.data = null;
                    }
                }
                resolve(retorno);
            }, function (error) {
                reject(error);
            });
        } else {
            resolve(_self.utilService.response(false, "É preciso informar valor para busca", null));
        }
    });
    return promise;
}

UserService.prototype.fetchAll = function (search) {
    search = search || ''
    var _self = this;
    var filter = "+type:user+in:fullname";
    var promise = new Promise(function (resolve, reject) {
        if (search !== '') {
            var request = _self.utilService.getRequest("https://api.github.com/search/users", { q: search + filter });
            request.then(function (retorno) {
                if (retorno.success) {
                    retorno.data = JSON.parse(retorno.data)
                    if (retorno.data.message) {
                        retorno.message = retorno.data;
                        retorno.success = false;
                        retorno.data = null;
                    }
                }
                resolve(retorno);
            }, function (error) {
                reject(error);
            });
        } else {
            resolve(_self.utilService.response(false, "É preciso informar valor para busca", null));
        }
    });
    return promise;
}
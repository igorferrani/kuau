describe("UtilService", function () {
    var util;

    beforeEach(function () {
        util = new UtilService();
    });

    describe("Chamada para método toQueryString", function () {

        it("Saida simples de query string, chave=valor", function () {
            expect(util.toQueryString({ chave: "valor" })).toEqual("?chave=valor");
        });

        it("Chamada de método sem passagem de valores", function () {
            expect(util.toQueryString()).toEqual("");
        });

        it("Chamada de método passando array como parâmetro", function () {
            expect(util.toQueryString([10, 20, 30])).toEqual("");
        });

        it("Chamada de método passando null como parâmetro", function () {
            expect(util.toQueryString(null)).toEqual("");
        });

        it("Chamada de método passando vazio como parâmetro", function () {
            expect(util.toQueryString("")).toEqual("");
        });

        it("Chamada de método passando string como parâmetro", function () {
            expect(util.toQueryString("{chave:'valor'}")).toEqual("");
        });
    });

    describe("Chamada para método response", function () {

        it("Chamada do método com passagem de todos os parâmetros", function () {
            var success = false;
            var message = "Erro no retorno dos dados"
            var data = {
                chave: "valor"
            }
            var response = {
                data: data,
                message: message,
                success: success
            }
            expect(util.response(success, message, data)).toEqual(response);
        });

        it("Chamada do método sem nenhum prâmetro passado", function () {
            var response = {
                data: null,
                message: "",
                success: false
            }
            expect(util.response()).toEqual(response);
        });

        it("Chamada do método sem passagem do parãmetro message e data", function () {
            var success = false;
            var response = {
                data: null,
                message: "",
                success: success
            }
            expect(util.response(success)).toEqual(response);
        });

        it("Chamada do método sem passagem do parãmetro data", function () {
            var success = false;
            var message = "Erro no retorno dos dados"
            var response = {
                data: null,
                message: message,
                success: success
            }
            expect(util.response(success, message)).toEqual(response);
        });

        it("Chamada do método com todos os parâmetros null", function () {
            var response = {
                data: null,
                message: "",
                success: false
            }
            expect(util.response(null, null, null)).toEqual(response);
        });
    });

    describe("Chamada para método getRequest", function () {
        it("Requisição GET sem passagem de queryString queryString, com retorno OK - 200", function (done) {
            var request = util.getRequest('assets/json/retorno_200.json');
            var data = JSON.stringify({
                "name": "Igor Ferrani",
                "login": "igorferrani"
            }, null, '    ');
            var responseOk = {
                data,
                message: "",
                success: true
            }
            request.then(function (retorno) {
                expect(retorno).toEqual(responseOk);
                done();
            });
        });

        it("Requisição GET com passagem de parâmetro queryString, com retorno OK - 200", function (done) {
            var request = util.getRequest('assets/json/retorno_200.json', { id : "igorferrani" });
            var data = JSON.stringify({
                "name": "Igor Ferrani",
                "login": "igorferrani"
            }, null, '    ');
            var responseOk = {
                data,
                message: "",
                success: true
            }
            request.then(function (retorno) {
                expect(retorno).toEqual(responseOk);
                done();
            });
        });

        it("Requisição GET com passagem de parâmetro queryString objeto vazio, com retorno OK - 200", function (done) {
            var request = util.getRequest('assets/json/retorno_200.json', {});
            var data = JSON.stringify({
                "name": "Igor Ferrani",
                "login": "igorferrani"
            }, null, '    ');
            var responseOk = {
                data,
                message: "",
                success: true
            }
            request.then(function (retorno) {
                expect(retorno).toEqual(responseOk);
                done();
            });
        });

        it("Requisição GET com passagem de parâmetro queryString string vazia, com retorno OK - 200", function (done) {
            var request = util.getRequest('assets/json/retorno_200.json', "");
            var data = JSON.stringify({
                "name": "Igor Ferrani",
                "login": "igorferrani"
            }, null, '    ');
            var responseOk = {
                data,
                message: "",
                success: true
            }
            request.then(function (retorno) {
                expect(retorno).toEqual(responseOk);
                done();
            });
        });

        it("Requisição GET com passagem de parâmetro queryString null, com retorno OK - 200", function (done) {
            var request = util.getRequest('assets/json/retorno_200.json', "");
            var data = JSON.stringify({
                "name": "Igor Ferrani",
                "login": "igorferrani"
            }, null, '    ');
            var responseOk = {
                data,
                message: "",
                success: true
            }
            request.then(function (retorno) {
                expect(retorno).toEqual(responseOk);
                done();
            });
        });
    });
});
describe("UserService", function () {
    var userService;

    beforeEach(function () {
        userService = new UserService();
    });

    describe("Chamada para método fetch", function () {

        it("Chamada de método fetch com passagem de parâmetro string 'igorferrani' ", function (done) {
            var request = userService.fetch('igorferrani');
            request.then(function (retorno) {
                expect(retorno).toEqual(jasmine.any(Object));
                done();
            }, function (error) {
                expect(error).toEqual(jasmine.any(Object));
                done();
            });
        });

        it("Chamada de método fetch sem passagem de parâmetro", function (done) {
            var request = userService.fetch();
            request.then(function (retorno) {
                expect(retorno).toEqual(jasmine.any(Object));
                done();
            }, function (error) {
                expect(error).toEqual(jasmine.any(Object));
                done();
            });
        });
    });

    describe("Chamada para método fetchAll", function () {

        it("Chamada de método fetch com passagem de parâmetro string 'igorferr' ", function (done) {
            var request = userService.fetchAll('igorferr');
            request.then(function (retorno) {
                expect(retorno).toEqual(jasmine.any(Object));
                done();
            }, function (error) {
                expect(error).toEqual(jasmine.any(Object));
                done();
            });
        });

        it("Chamada de método fetch sem passagem de parâmetro", function (done) {
            var request = userService.fetchAll();
            request.then(function (retorno) {
                expect(retorno).toEqual(jasmine.any(Object));
                done();
            }, function (error) {
                expect(error).toEqual(jasmine.any(Object));
                done();
            });
        });
    });
});
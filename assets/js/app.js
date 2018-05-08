const focus = {
    inserted(el) {
        el.focus()
    }
}

new Vue({
    el: '#app',
    data: {
        utilService: new UtilService(),
        userService: new UserService(),
        search: "",
        isSearching: false,
        lastSearch: "",
        lastClickSearch: "",
        tab: 'list-users',
        users: null,
        user: {},
        cacheTimeoutSearch: null,
        cacheTimeoutAlert: null,
        error: {}
    },
    directives: { focus },
    components: {
        "component-user-list-item": ComponentUserListItem
    },
    methods: {
        searchUser() {
            var _self = this;
            _self.users = null;

            clearTimeout(_self.cacheTimeoutSearch);

            _self.cacheTimeoutSearch = setTimeout(function () {

                if (_self.search === "") {
                    _self.lastSearch = _self.search;
                    _self.users = null;
                    return;
                }

                if (_self.search === _self.lastSearch) {
                    return;
                }

                _self.isSearching = true;

                _self.lastSearch = _self.search;
                var request = _self.userService.fetchAll(_self.search);
                request.then(function (retorno) {
                    _self.users = [];
                    _self.isSearching = false;

                    if (retorno.success) {
                        _self.users = retorno.data.items;
                    } else {
                        _self.users = null;
                        _self.errorLog(retorno.message);
                    }
                }, function (retorno) {
                    _self.users = null;
                    _self.isSearching = false;
                    _self.errorLog(retorno.message);
                });

            }, 1000);

        },
        showUserDetail(login) {
            var _self = this;
            _self.lastClickSearch = login;

            var request = _self.userService.fetch(login);
            request.then(function (retorno) {
                if (retorno.success) {
                    _self.user = retorno.data;
                    _self.tab = "user-detail";
                } else {
                    _self.user = {};
                    _self.errorLog(retorno.message);
                }
            }, function (retorno) {
                _self.errorLog(retorno.message);
            });
        },
        errorLog(message, type) {
            var _self = this;

            _self.utilService.errorLog(message, false);
            _self.floatAlert(message);
        },
        floatAlert(message, type) {
            var _self = this;
            _self.error.message = message;
            _self.error.type = type || 1;
            _self.error.visible = true;
            _self.$forceUpdate();

            clearTimeout(_self.cacheTimeoutAlert);
            _self.cacheTimeoutAlert = setTimeout(function () {
                _self.error.visible = false;
                _self.$forceUpdate();
            }, 3000);
        }
    },
    mounted() {

    }
})
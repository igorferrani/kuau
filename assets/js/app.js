var util = new Util();

new Vue({
    el: '#app',
    data: {
        search: "",
        isSearching: false,
        lastSearch: "",
        lastClickSearch: "",
        tab: 'list-users',
        users: null,
        user: {},
        cacheTimeout: null
    },
    components: {
        'component-user-list-item': ComponentUserListItem
    },
    methods: {
        searchUser() {
            var _self = this;

            console.log("search: " + _self.search);

            if (_self.search != '') {

                _self.isSearching = true;

                clearTimeout(_self.cacheTimeout);
                _self.cacheTimeout = setTimeout(function () {

                    if (_self.search != _self.lastSearch) {

                        _self.lastSearch = _self.search;

                        var request = util.getRequest("https://api.github.com/search/users", { q: _self.search + "+type:user" });
                        request.then(function (retorno) {
                            if (retorno.success) {
                                console.log(retorno.data)
                                _self.users = JSON.parse(retorno.data).items
                                _self.isSearching = false;
                            }
                        });
                    } else {
                        _self.isSearching = false;
                    }
                }, 2000);
            } else {
                _self.users = [];
            }
        },
        showUserDetail(login) {
            var _self = this;
            if (login != _self.lastClickSearch) {
                _self.lastClickSearch = login;
                var request = util.getRequest("https://api.github.com/users/" + login);
                request.then(function (retorno) {
                    if (retorno.success) {
                        console.log(retorno.data)
                        _self.user = JSON.parse(retorno.data);
                    }
                });
            }

            this.tab = 'user-detail';
        }
    }
})
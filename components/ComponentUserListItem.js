var ComponentUserListItem = {
    template: `
    <div>
        <div class="media-left">
            <img class="media-object" v-bind:src="user.avatar_url">
        </div>
        <div class="media-body">
            <h4 class="media-heading">{{ user.login }}</h4>
        </div>
    </div>
    `,
    props: ['user'],
    data() {
        return {}
    }
}
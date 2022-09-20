new (function live() {
    this.act = function (args, callback) {
        const agent = this.agent;
        console.log(agent + '- Naive.live');
        callback(agent);
    }
})();
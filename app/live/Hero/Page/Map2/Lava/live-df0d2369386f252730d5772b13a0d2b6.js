new (function live() {
    this.act = async function (args, callback) {
        const agent = this.agent;
		await agent.see('addName', 'Hero/Page/Map1/Lava');
        console.log(agent + '- Naive.live');
        callback(agent);
    }
})();
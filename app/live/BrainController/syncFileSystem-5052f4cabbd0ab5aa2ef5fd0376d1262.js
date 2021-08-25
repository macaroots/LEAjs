new (function syncFileSystem() {
	this.act = async function (bookname, resolve, reject) {
		let FileBrain = (await import('./file_brain.js')).FileBrain;
		let agent = this.agent;
		let inBrain = await agent.see('getLibrary');
		let outBrain = new FileBrain('./live');
		
		let r = await agent.see('merge', [inBrain, outBrain, bookname, true]);
		console.log('FileSystem synced', r);
		resolve();
	};
})();
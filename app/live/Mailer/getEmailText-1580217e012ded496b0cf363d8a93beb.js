new class getEmailText {
	act(mailData, resolve, reject) {
		const agent = this.agent;
		
		resolve(JSON.stringify(mailData));
	}
}();

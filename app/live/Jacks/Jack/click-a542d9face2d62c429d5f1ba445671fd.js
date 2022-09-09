new class click {
	act(args, resolve, reject) {
		$(args.currentTarget).remove();
		resolve();
	}
}();

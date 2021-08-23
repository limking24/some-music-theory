module.exports = {
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = "some-music-theory";
				return args;
			})
	}
}
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/some-music-theory/' : '/',
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = "some-music-theory";
				return args;
			})
	}
}
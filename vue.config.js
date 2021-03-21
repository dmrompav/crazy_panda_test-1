module.export = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/'
}
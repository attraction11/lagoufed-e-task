module.exports = {
  root: process.cwd(),
  host: '127.0.0.1',
  port: '7072',
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 2,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}

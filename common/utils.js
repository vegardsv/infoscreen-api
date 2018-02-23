const sample = (n, xs) =>
  xs
    .map(x => ({ r: Math.random(), val: x }))
    .sort((a, b) => a.r < b.r)
    .map(x => x.val)
    .slice(0, n)

const getPublicURI = req => `${req.protocol}://${req.get('host')}`

module.exports = {
  sample,
  getPublicURI
}

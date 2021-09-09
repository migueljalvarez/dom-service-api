
export default  fn => {
  return async (req, res, next) => {
    try {
      return Promise.resolve(fn(req, res, next))
    } catch (err) {
      res.status(err.status || 500).json(err)
    }
  }
}
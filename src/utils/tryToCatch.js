const tryToCatch = fn => (req, res, next) => fn(req, res, next).catch(next)

export default tryToCatch
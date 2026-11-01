// Minimal in-memory rate limiter (per IP). Swap for express-rate-limit in production.
const hits = new Map();

module.exports = function rateLimit({ windowMs = 60000, max = 5 } = {}) {
  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      return res.status(429).json({ success: false, message: 'Too many submissions. Please wait a minute and try again.' });
    }
    recent.push(now);
    hits.set(req.ip, recent);
    next();
  };
};

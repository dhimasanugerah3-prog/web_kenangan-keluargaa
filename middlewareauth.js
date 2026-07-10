module.exports = {
    isAuth: (req, res, next) => {
        if (req.session && req.session.userId && req.session.otpVerified) {
            return next();
        }
        return res.status(401).json({ message: "Sesi tidak valid atau belum melakukan verifikasi OTP." });
    },
    apiLimiter: require('express-rate-limit')({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti."
    })
};
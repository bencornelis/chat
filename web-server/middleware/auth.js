import jwt from 'jsonwebtoken';

const isUserAuthenticated = (req, res, next) => {
  if (!req.token) {
    res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  let decoded;
  try {
    decoded = jwt.verify(req.token, process.env.SECRET);
  } catch(error) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }

  req.userId = decoded.id;
  next();
}

export default {
  isUserAuthenticated
};

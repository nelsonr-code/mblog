import JWT from 'jsonwebtoken';

export class JWTService {

  generateToken(payload, expiresIn) {

    return JWT.sign(payload, process.env.KEY, { expiresIn: .1 * 60 * 1000 })
  }

  verifyToken(token) {

    return JWT.verify(token, process.env.KEY);
  }
}
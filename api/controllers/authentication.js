const keys = require('../config/keys.js');
const AWS = require('aws-sdk');
AWS.config.update({ region: keys.AWS_REGION });
const Cognito = new AWS.CognitoIdentityServiceProvider();


function isValid(token) {
  const now = Math.floor(new Date() / 1000);
  if (token) {
    return now < getExpiration(token);
  }
  return false;
};

function getExpiration(token) {
  const jwtPayload = token.split('.')[1];
  return JSON.parse(Buffer.from(jwtPayload, 'base64')).exp;
};

class Authentication {
  constructor() {
    this.POOL_ID = keys.AWS_USER_POOL_ID;
    this.POOL_CLIENT_ID = keys.AWS_USER_POOL_CLIENT_ID;
  }

  register(req, res) {
    const params = {
      ClientId: this.POOL_CLIENT_ID,
      Password: req.body.password,
      Username: req.body.email,
      UserAttributes: [
        {
          Name: 'email',
          Value: req.body.email,
        },
        {
          Name: 'given_name',
          Value: req.body.firstName,
        },
        {
          Name: 'family_name',
          Value: req.body.lastName,
        },
      ],
      ValidationData: [
        {
          Name: 'email',
          Value: req.body.email,
        },
      ],
    };

    Cognito.signUp(params, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `An error occurred while creating the user account: ${err, err.stack}`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  };

  confirmRegistration(req, res) {
    const params = {
      ClientId: this.POOL_CLIENT_ID,
      ConfirmationCode: req.body.code,
      Username: req.body.email,
    };

    Cognito.confirmSignUp(params, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `An error occurred while confirming the user account: ${err, err.stack}`,
        });
      } else {
        res.status(200).send(({
          message: 'User successfully confirmed registration.',
        }));
      }
    });
  };

  authenticate(req, res) {
    const params = {
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: req.body.email,
        PASSWORD: req.body.password,
      },
      ClientId: this.POOL_CLIENT_ID,
      UserPoolId: this.POOL_ID,
    };

    Cognito.adminInitiateAuth(params, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `An error occurred while authenticating the user: ${err, err.stack}`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  };

  authenticated(req, res) {
    const token = req.headers.authorization || null;
    res.status(200).send(isValid(token));
  };

  authorized(req, res, next) {
    const token = req.headers.authorization || null;
    if (!token) {
      return res.status(401).send(false);
    }
    if (token && !isValid(token)) {
      return res.status(401).send(false);
    }
    if (token && isValid(token)) {
      next();
    }
  };

  logout(req, res) {
    var params = {
      UserPoolId: this.POOL_ID,
      Username: req.body.username,
    };
    Cognito.adminUserGlobalSignOut(params, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `An error occurred while logging the user out: ${err, err.stack}`,
        });
      } else {
        res.status(200).send('Logged out successfully');
      }
    });
  }
};

module.exports = Authentication;
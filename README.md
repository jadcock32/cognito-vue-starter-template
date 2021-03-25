# cognito-vue-starter-template

Starter template for authentication with AWS Cognito and Vue.  This template provides the ability to quickly fire up authentication using Cognito with a front end framework (Vue in this instance) and a Node backend.

## Installation

First, make sure to create your Cognito User Pool if you haven't already.  If you do not know how, follow the link below for the process of doing so:

https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html

Make sure to install all dependencies on both the app and api folders.

```bash
npm i
```

For hot reloading on the Node server, make sure to globally install nodemon:

```bash
npm i -g nodemon
```

If you do not need/want hot reloading, make sure to update the package.json 'npm run serve' script in the app directory to 'node app.js'.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "serve": "node app.js"
}
```

Update all the appropriate keys in the keys.js file under the config folder in the app directory.
```javascript
module.exports = {
  AWS_USER_POOL_ID: 'Cognito User Pool Id Here',
  AWS_USER_POOL_CLIENT_ID: 'Cognito User Pool Client Id Here',
  AWS_REGION: 'Set region here',
}
```

Once all set up is complete run ```npm run serve``` on both the app folder and api folder.

Enjoy!

## Usage

The processes that are available as of version 1.0.0. are:

- Registering
- Confirming Registration
- Logging In
- Protected Front End Routes
- Protected Back End Routes

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://choosealicense.com/licenses/isc/)

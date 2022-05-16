# Simple Two-Factor-Authenticator App
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This simple application is composed of two main folders: client and server.


## Features

- Sign-up page to create new user
- Email verification after sign-up
- Sign-in to authenticate an existing verified user
- Two-Factor authentication with QR-code and OTP token
- Welcome page: acts as a protected page to be viewed only for logged-in users


##


## For Production

This sample app is not intended for any production environment

No environmental variables are used for simplicity.

## Installation Guide

Open your favorite Terminal and run these commands.

Open cmd in an empty folder, then clone this repo to your machine:

```sh
gh repo clone MohamedRezq/simple-login-with-microsoft-auth
```
Navigate to the project's folder, then install the dependencies:

```sh
npm install
cd client
npm install
cd ..
cd server
npm install
```

Get your PostgreSQL Database ready:

```sh
Download and install PostgreSQL
Create a user with a privilege to create new databases
Check that PostgreSQL server is up an running
```

Apply your configurations:

```sh
Go to /config.js
Apply the configurations needed
```

Run the app:

```sh
Go to the project's folder
> npm run start
```
#### Building for source


## License

MIT

**By MOREZQ!**
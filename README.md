# Tiny (Medium.com Ripoff) using NodeJS

## Requirements
- [NodeJS](https://nodejs.org/en/) `>=v5.2` (Supported [npx](https://www.npmjs.com/package/npx) by default)
- [MongoDB](https://www.mongodb.com)

## Installation
Install NodeJS dependencies by running:

```sh
npm install
```

## Environment
Copy the `.env.example` to `.env` or run

```sh
cp .env.example .env
```

Your `.env` file should look like this:

```
DB_URI=mongodb://localhost:27017
DB_HOST=localhost
DB_PORT=27017
DB_NAME=tinyproject
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET_KEY=
```

### Generate `JWT_SECRET_KEY`
To generate, just run:

```sh
npm run jwt:generate
```

The response would look like:

```sh
$ npm run jwt:generate

> tiny-project-backend@0.1.0 jwt:generate
> node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

xasle1EDrPpbIldJraGImFx91/mRo+Eguqlpq7XXYVrnAqJu4bj6kx8HdJ+1zbF2nUjTtkSPhnLIsXJ9UoIqkZxLzKd+d0tdNBjnBBRh72w0B8utH8FwnwIFXInMvvYWpmrRYRYOBEnqeXrDFBk2tDE3ml7WAlMAB37/ohU/EoIdfhBSGUaD4TsTaPJt2yzttWLMk+jlpu51iaqn/Hb/xCt0K9An1JY6F/JktXF7VSKn0znd3b9UqDVUkcqiZg3IZQqjld+rRXDaYg0dyFvAinEMet7UUsHRSvIj/sEDiv+gSMuYDst+KKDuMCm0I6SeqaPZVMpKpu1pPH8H/bOFkg==
```

Copy the response and paste it to your `.env` file

```
// .env
... // Other environment variables

JWT_SECRET_KEY=xasle1EDrPpbIldJraGImFx91/mRo+Eguqlpq7XXYVrnAqJu4bj6kx8HdJ+1zbF2nUjTtkSPhnLIsXJ9UoIqkZxLzKd+d0tdNBjnBBRh72w0B8utH8FwnwIFXInMvvYWpmrRYRYOBEnqeXrDFBk2tDE3ml7WAlMAB37/ohU/EoIdfhBSGUaD4TsTaPJt2yzttWLMk+jlpu51iaqn/Hb/xCt0K9An1JY6F/JktXF7VSKn0znd3b9UqDVUkcqiZg3IZQqjld+rRXDaYg0dyFvAinEMet7UUsHRSvIj/sEDiv+gSMuYDst+KKDuMCm0I6SeqaPZVMpKpu1pPH8H/bOFkg==
```

## Start server
To start the server, just run

```sh
npm run dev
```

By default, the URL is [http://localhost:3000](http://localhost:3000), but you can change the port by adding `PORT` in your environment variables

```sh
PORT=4000 npm run dev
```

or via `.env` file

```
// .env
...
PORT=4000
```

## Test
To test, just run:

```
npm run test
```

---

###### Created and developed by [Jay Are Galinada](https://jayaregalinada.github.io)

# Recipe API
The backend code for the RecipeProject. This is built using Node JS and is a part of a project in the *Advanced JavaScript*-course @ [EC Utbildning](http://www.ecutbildning.se/utbildningar/javautvecklare).

This is accompanied by a frontend part that can be found [here](https://github.com/MikaelFeher/recipes-ui).

## Project setup
```
npm install
```
Then you need to set up a `.env`-file at the root of your project in which you need 2 constants:

`DB_URL = [YOUR-DATABASE-URL]`

`SECRET_OR_KEY = [YOUR-SECRET-KEY]`

The `seedUser.js` creates an admin user in order to access protected routes. Feel free to change the password.

### Compiles and hot-reloads for development
```
npm run dev
```
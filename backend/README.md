# treasure-hunt-backend

1. Fork this repo
2. On your Terminal or cmd
   - Type `git clone < repo-url >` and `Enter`
   - `cd treasure-hunt-backend` and open it in your prefered Editor.
     > If you are using vs code then, type `code .` and press `Enter`. Which will open up the directory in vs code.
3. After opening the repo in vs code
   - open the vs code terminal
   - Then run `npm install`.
     > `npm install` will install required packages.
4. Create a `config.env` file on the root of the directory.
   - Insert mongoDb database credentials in the `config.env` file.
     > you will get the mongoDb credentials from [MongoDb Atlas](https://account.mongodb.com/account/login)
   - Also insert other required credentials to the `config.env` file.
5. Add the required credentials to `ServiceAccount.json` file and `credentials.json` file from [Firebase](https://firebase.google.com/)
6. Then enter `npm run dev` on vs code terminal.
   > `npm run dev` will run the server using nodemon locally.
7. And that's it, your server is ready to use :tada:

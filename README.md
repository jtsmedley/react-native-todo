# react-native-todo

We will be following this tutorial together and then expanding on it together and separately if time allows.

https://medium.com/@worachote/building-a-todo-list-app-with-react-native-a-step-by-step-guide-7ed7871d3f98

pre reqs:
docker

Setup

```
# git clone the repo
cd react-native-todo
npm install

sudo systemctl status docker
# if docker is not running start it with the following command:
sudo systemctl start docker
# You can enable docker to start on boot with `sudo systemctl enable docker`

# verify that docker is running with `docker ps`

# change examplepassword to your password of choice.
docker run --name my-postgres -e POSTGRES_PASSWORD=examplepassword -p 5432:5432 -d postgres
```

setup an auth0 account at https://auth0.com/

Create a new `Single Page Application` in auth0

- note down your `Domain` and `Client ID` as you will put these into your .env file in a later step
- From the settings page of your `Single Page Application` set the following:

```
Allowed Callback URLs: http://localhost:8081
Allowed Logout URLs: http://localhost:8081
Allowed Web Origins: http://localhost:8081
```

create a .env file with these variables:

```
# Fill in your details from the previous steps in README.md
DATABASE_URL="postgresql://postgres:examplepassword@localhost:5432/mydb?schema=public"
REACT_APP_AUTH0_DOMAIN="your-auth0-domain"
REACT_APP_AUTH0_CLIENT_ID="your-auth0-client-id"
```

Finally:

```
node server/server.js # This starts a local server, in prod you'd want the server running elsewhere.

# open another terminal and from the project directory run:
npm run web
```

Everything should be working. Simply log in and try to add a todo task.

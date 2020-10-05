## Description
Sample project to test the Express package and create a simple API

This project is not production ready, it is a simple showcase of the technology


## Install
You will need to have nodejs installed in your system

Clone the repository and go to the project folder

Install the dependencies
```
npm install
```

Create your '.env' file, an '.env.example' is provided, it should be created at the same level that the example

Init the database and add some users to test the API
```
npm run init-db
npm run add-user EMAIL PASSWORD USER_TYPE
```
Where the type of user can be 'user' or 'admin'

Now you just have to run the application with
```
npm run start
```
And the application will be running in port indicated in you '.env' file


## Application
It is a restful API with two resources 'public' and 'private', the resources have the same two fields and the operations allowed in each one are the same, only the necessary credentials to operate them change.

You can make POST (create), GET (read), PUT (update), DELETE (delete) requests to '/public/:publicId' or '/private/:privateId' to interact with them (if no id provided in read all the resources are returned). See 'src/api/routes/' for further details

Credentials needed for each request are:
|        | public    | private |
|--------|-----------|---------|
| GET    | no needed | admin   |
| POST   | user      | admin   |
| PUT    | user      | admin   |
| DELETE | admin     | admin   |


This app uses JWT (more info in https://jwt.io/) for authorization, to get the token you will need to log in sending a POST request to 'auth/login' with the body (you need to indicate the body is a json in the header too)
```json
{
	"email": "email",
	"password": "password"
}
```
This will give you the token which provides your credentials, you have to add it in the header of the requests like
```json
{
	"Authorization": "Bearer JWT"
}
```
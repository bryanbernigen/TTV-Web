# TTV-Web
Simple TTV Web With Vue, Express, Mongo, and Docker

## Requirements
1. Git
2. Docker

## How to run
1. Clone this repository
```sh
git clone https://github.com/bryanbernigen/TTV-Web
```
2. Go to the directory
```sh
cd TTV-Web
```
3. Add .env file at /BE directory
4. Fill the .env file
```sh
MONGO_URI=<YOUR MONGO DB CONNECTION URI
PORT=5000
JWT_SECRET=<YOUR JWT SECRET>
```
5. Run docker-compose
```sh
docker-compose up
```
6. Open http://localhost:5173 in your browser for the frontend
7. Open http://localhost:5000/api-docs in your browser for the backend

## Important Notes
1. You Could not Register using the frontend, you need to register using the backend API
```
1. Open then backend API docs at http://localhost:5000/api-docs
2. Click the POST /admin/register in the Auth section
3. Click the Try it out button
4. Fill the form with your data
5. Click the Execute button
```

## Features
1. Api Docs
<img src="assets/apidocs.png" alt="api-docs" width="100%">

2. Login
<img src="assets/login.png" alt="login" width="100%">

3. Dashboard
<img src="assets/dashboard.png" alt="dashboard" width="100%">

4. User Management
<img src="assets/users.png" alt="user-management" width="100%">

5. User Detail
<img src="assets/userdetail.png" alt="user-detail" width="100%">

6. Record Management
<img src="assets/records.png" alt="record-management" width="100%">

7. Record Detail
<img src="assets/recorddetail.png" alt="record-detail" width="100%">

## Author
|Name|Contact|Github|LinkedIn|
|----|-------|------|--------|
|Bryan Bernigen | bryanbernigen@gmail.com|<a href="https://www.github.com/bryanbernigen">@bryanbernigen</a>|<a href="https://www.linkedin.com/in/bryanbernigen">bryanbernigen</a>|
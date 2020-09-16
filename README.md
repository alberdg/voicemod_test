# VOICEMOD Full Stack Coding Challenge

## Objective

Generate a CRUD API for users management connected to a database. It must provide the endpoints below. In order to make use of the API the candidate must provide a user interface where Vue's CRUD is preferred but React's or Angular's can be used. The exercise must be run in a Docker containers environment (API, front and database).

- Signup

	Mandatory data

	- Name
	- Lastname
	- Email
	- Password
	- Country
	- Telephone
	- Postcode

- Login

	Mandatory data
	- Email
	- Password

- User update

	Mandatory data

	- Name
	- Lastname
	- Email
	- Password
	- New Password
	- Country
	- Telephone
	- Postcode

- Delete user



## Getting started

### Backend

* Installation

```npm install```

* Running the system under docker

```docker-compose -f voicemod.yml```

* Running the backend

```npm start```

* Running the tests

```npm test```

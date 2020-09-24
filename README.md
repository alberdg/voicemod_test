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


* Demo

The system is hosted in google cloud at http://albertogodar.com

### Backend

Backend is an Express REST Api with MONGODB database. You can find its file structure below

| Name      | Description |
| -----------    | -----------                                        |
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| backend\src   | Contains backend source code|
| backend\src\__mocks__   | Contains redis mock for tests|
| backend\src\constants     | Constants used across the backend|
| backend\src\errors     | Helper classes for error handling|
| backend\src\middlewares     | Express middlewares|
| backend\src\models     | MongoDB models|
| backend\src\redis     | Redis wrapper class|
| backend\src\routes     | Rest api Express routes|
| backend\src\services     | Service helpers|
| test\setup.ts      | Test environment setup|
| app.ts      | App initialization|
| index.ts      | Server and database connection initialization|

### Frontend

Frontend has been developed using ReactJS and Context API as application storage.

| Name      | Description |
| -----------    | -----------                                        |
| package.json      | Revelevant project metadata|
| tsconfig.json      | Typescript configuration file|
| client\public   | Contains frontend public assets|
| client\src   | Contains frontend source code|
| client\src\actions   | Rest API handlers|
| client\src\components   | React components and tests|
| client\src\constants   | Application wide constants|
| client\src\context   | Application contexts|
| client\src\interfaces   | Interface definitions|
| client\src\test   | Test utils|
| client\src\utils   | Application wide utils|

### Infrastructure

The system is deployed using kubernetes and skaffold.

| Name      | Description |
| -----------    | -----------                                        |
| infra\k8s      | Kubernetes yaml files|
| infra\k8s\api-depl.yaml      | Api deployment file|
| infra\k8s\client-depl.yaml      | Client deployment file|
| infra\k8s\ingress-srv.yaml      | Ingress service file|
| infra\k8s\managed-certificate.yaml      | Managed certificate file|
| infra\k8s\mongo-depl.yaml      | Mongodb deployment file|
| infra\k8s\redis-depl.yaml      | Redis deployment file|

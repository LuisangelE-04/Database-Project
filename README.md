# Ship It! Frontend Application

Welcome to the ShipIt frontend appliation! This project is a React-based web application for managing post office services, including employees, tracking, reports and end user functionality for.

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Available Scripts](#available-scripts)
- [Learn More About React](#learn-more)
- [Containerize the Build](#containerize)

## Getting Started

To get a local copy up and running, follow these simple steps. 

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/LuisangelE-04/Database-Project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Database-Project
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

To use the application, follow these steps:

1. Start the backend server which is linked in the repository. You will need a database to run that backend.
2. Start the development server:
   ```sh
   npm start
   ```
3. Open http://localhost:3000 in your browser
4. Ensure connection to the backend throught the Endpoints.js under:
   ```sh
   Database-Project/src/endpoints/Endpoints.js
   ```
5. Done!! Use as you like!!

## Project Structure

```
Database-Project/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── NavBar.js
│   │   ├── Footer.js
│   │   ├── EmployeeReport.js
│   │   ├── TrackingReport.js
│   │   ├── DependentReport.js
│   │   └── ...
│   ├── css/
│   │   ├── AdminReports.css
│   │   ├── Report.css
│   │   └── ...
│   ├── endpoints/
│   │   ├── Endpoints.js
│   │   ├── AuthContext.js
│   │   └── ...
│   ├── pages/
│   │   ├── AdminReports.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── CustomerDashboard.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Dependencies

Relevant Dependencies are:

1. React
2. React Router
3. Axios
4. React Modal

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Containerize

## Containerizing the Application with Docker

To containerize the ShipIt frontend application using Docker, follow these steps:

### Prerequisites

Make sure you have Docker installed on your machine. You can download it from [docker.com](https://www.docker.com/).

### Dockerfile

Here is the Dockerfile used to containerize the application:

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy [package.json](http://_vscodecontentref_/1) and [package-lock.json](http://_vscodecontentref_/2) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
```

### Building the Docker Image

To build the Docker image, navigate to the project directory and run the following command:
   ```sh
   docker build -t shipit-frontend .
   ```

This command builds the Docker image and tags it as shipit-frontend.

# Getting Started with this code challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
But because I wanted to expose the webpack.config and tailwindcss and jest files, I ran the `npm run eject` command

### What will you need (first)?
The pre-requisities for running this application are very straightforward:

- [Node](https://nodejs.org/en/download)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

This application was created using Node v14.17.2 and NPM v6.14.13.\
If you don't have those please install them using the provided links.\
_NOTE: The provided versions are just informative_

### Available Scripts
Pretty much the basic scripts for a CRA application:

#### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload on any changes made; also exposes any lint or execution errors to the console.

#### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
Please ignore this command for now since the application was ejected already, but you know about this script:
This command will remove the single build dependency from your project.

## First time running the application
1. Clone this repository into your machine.
2. Navigate to the repository folder and run `npm install`
3. Once dependencies are installed, run `npm start` — a browser tab will be open with the application

## How this application works?
The application will show you a dashboard — It is actually responsive and it is ussing [tailwindcss](https://tailwindcss.com/).\
But also is using a "theme" approach, very basic but there is one! ([src/assets/css/theme.css](https://github.com/angelsamano/truefort/blob/main/src/assets/css/theme.css))
<img width="800" alt="UI" src="https://user-images.githubusercontent.com/7455604/229587165-acbbf573-6256-4464-9d00-0d5ea8331c53.png">

It uses a [ContextProvider](https://github.com/angelsamano/truefort/blob/main/src/services/ContextProvider.jsx) and simulates an API-provided object, you can see it in the [src/services/MockedAuthenticatedUser.js](https://github.com/angelsamano/truefort/blob/main/src/services/MockedAuthenticatedUser.js) file.\
Please be aware that all the data you add, update or delete will persist because it is using LocalStorage (see [src/services/Storage.jsx](https://github.com/angelsamano/truefort/blob/main/src/services/Storage.jsx)) — if you want to reset the application you can press the "refresh" button, see this screen recording for guidance:\
TBA

### Why I can only edit one record at the time if I select multiple rows?
This is intended; decided to implement this way since the "bulk edit" is not recommended, see this screen recording to see what it means.\
TBA

### Why the User ID field gets highlighted in red when I enter a value?
UserId must be unique; the application will not allow duplications.\
TBA


NOTES: This application was created with the "performance first" mindset, you can see couple of `useRef()` and [useMemo](https://github.com/angelsamano/truefort/blob/main/src/components/Content/Grid/Grid.jsx#L20) hooks instead of the regular `useState` — this because something that does not change often should not rendered again to the app

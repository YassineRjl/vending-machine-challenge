# Vending Machine UI

### General Notes:

This project is the interface to the vending machine backend.

More precisely the buyer UI.

For the sake of submitting the challenge by the requested date: Sunday 17th, and given the time allocated to this since handoff (1 Day). I made sure to include the most important functionalities a buyer will need:

- Authentication with the bonus case included.
- Checking the balance.
- Depositing.
- Purchasing.
- Seeing purchase history.
- And finally logging off.

The current version can be improved in a production environment by including:

- Airbnb Linter synchronized with Prettier.
- Realtime requests using sockets.
- Slightly more efficient calling of some endpoints (eg. Pagination)
- Happy to discuss further other aspects of the project.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

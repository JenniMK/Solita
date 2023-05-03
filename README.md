<h1>Citybikes application</h1>

This application was created using create-react-app with a backend built using Node.js.

<h2>Getting started:</h2>

To use the application, clone the repository and save the separately provided .env files to both the /backend and /src directories.

To start the backend, navigate to the /backend directory and install all dependencies using npm install. You can then start the server with npm start.

For the frontend, navigate to the root directory of the project and install dependencies using npm install. You can then start the application with npm start.

<h2>Directory contents:</h2>

The backend includes two model files that create schemas for a MongoDB database. The /data directory includes two import files for both schemas, as well as an additional update file used to add more data to the database. The connection is created using the database.js file. Note that due to space limitations in MongoDB Atlas, the imported journey data has been limited to 500,000 lines per file.

There are also two controller files to handle API endpoints. The API tests in the backend's /test directory are meant to be run before the database has any data. Therefore, these have been commented out so that running npm test will only test the other functionalities and avoid replacing the data.

In the frontend, there are two service files used to fetch data from the API endpoints. Tests are located in the /components directory.

Styling of components has been combined to one main css-file in /styles directory.

<h2>Application functionality</h2>

The application displays station data in a paginated format, showing 15 lines per page. A map on the right side shows the locations of currently displayed stations. Clicking on the name of a station shows the station's address and the total number of journeys. In the search box, users can start typing the name of the station they want to find and the application will offer suitable options. Clicking on the name of a station displays its data, and a pin on the map shows its location. The back button returns users to the previous list view.

Below the stations' data is paginated journey data, also divided into 15 lines per page.

<h2>Further developments</h2>

To add more functionalities to the application, I would include more calculations, such as the average distance and duration from each station. Journeys' data could be sortable by distance and duration in ascending and descending order. Stations' names could be sorted in alphabetical order. These functionalities would serve the service provider.

For the service user, the map could show all the stations and use the user's current location to show the closest station, or users could search for the closest station near a chosen address. There could also be input fields for the start and end stations, and the distance and average cycling time could be displayed. Since the provided data is in different languages, flag icons could be added to the top of the page to allow users to choose their preferred language.

<h2>Conclusion</h2>

Overall, this was a great assignment, and I plan to develop it further. I will refactor the React code to a more advanced level and create more calculated data for all users. I will also redo the database using SQL.




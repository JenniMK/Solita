<h1>Citybikes application</h1>

<h2>Link to the production version:</h2>

This application was created using create-react-app.

<h2>To start:</h2>

Clone the repository and save the .env-file that was provided separately to the root of backend directory. Install all dependencies by running node index.js.

In frontend also install first dependencies by running npm install. Then run npm start in root.

<h2>Content of directories:</h2>

Backend has two model files that create schemas for MongoDB database. Data directory has two import files for both schemas and additional update file that was used to add more data to database. Connection is created by using database.js file. Note that due to limit of space in MongoDB Atlas, imported lines of journey data has been limited to 500,000 per file. 

There is also two controller files to handle API-endpoints. 

In frontend I have two service files to fetch data from API-endopoints. 

<h2>Application's functionalities</h2>

In browser stations' data has been paginated to display 15 lines per page. Map on the right side shows the locations of currently displayed stations. User can click the name of the station to view station's address and amounts of total journeys. 
In search box usesr can start typing the name of the station they want to find and it offers suitable names. By clicking the name, station's data will be displayed. Also pin on the map shows the location. Back button returns to the previous page.
Below stations' data is paginated data of journeys. It has also been divided 15 lines per page. 

<h2>Further developments</h2>

To apply more functionalities, I would widen the data that is calculated and fetched from stations and journeys, for example average distance and duration from each station. Journeys' data could have possibilities to sort distance and duration to ascending descending order. Also names could be sorted in alphabetical order. These would serve the service provider.

The map could show all the stations and use current location to show the closest station. This could be displayed below the map. This would be useful for the service user instead.

Since the provided data is in finnish and swedish, a flag icons could be added to the top of page and it could have option to choose languege. 

<h2>Last words</h2>Overall, this is a very good assignment and has variety of options how to use the data. I will personally develop it further by adding more calculated data and trying to re-do it also with SQL. 




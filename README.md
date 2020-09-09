# movieRecommender
# MovieRecommeder

MovieRecommender is a feature build in node.js that reads txt data; user data, currentsession data and product-data and converts the txt data into javascript arrays and objects. Based on the curresession data, the productId is used to find the categories of the movie current being watched. The feature then extracts other movies from the product array and recommends some of those to the user.

## Installation

The movieRecommender folder contains the data folder which contains 

data files (currentUserSession.txt, Products.txt, and Users.txt) 
index.js and package.json folder which contains all the dependencies used in the production. To get the project running ensure the latest version of node and npm is installed in your system. Using the terminal navigate to the movieRecommender folder. then run:

```bash
npm install
```
This will install all the dependencies used in the project: csv and nodemon. To read more on these dependencies go to https://www.npmjs.com and search for the specific dependency.

To run the application: simply run this command
```bash
nodemon index.js  or  node index.js
```
nodemon helps in the hot-reloading incase of any changes to the files

## Usage

```node.js
cd/movieRecommender

npm install #install the core node modules and dependencies
nodemon index.js # start the project
```
The project runs entirely on the console.
## Contributing
I have included the file recommender.js which was an attempt to use basic Machine Learning to create the recommender. The javascript machine learning module brain.js was used, but dint quite work as it takes considerable perfomance running the iterations. I will continue to try pursue trying to use this library to create the recommender as it is a better options on a larger scale recommendation engine.

## License
[MIT](https://choosealicense.com/licenses/mit/)
author: Zach Khadudu

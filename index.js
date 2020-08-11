const fs = require("fs"); //a node module to read from the file system
const csv = require("csv"); //a node module to read by streaming a large comma separated file

//Reading the User Data from the data folder using the node filessystem fs module
const usersData = fs.readFileSync("./data/Users.txt", "utf8");
//Converting the read txt file data into javascript objects
const json = usersData
  .split(/\n|\r\n/)
  .map((line) => {
    const values = line.split(",");
    let obj = {}; //creating the object and in the following lines populating it with key-value pairs
    obj[values[0]] = {
      id: values[0],
      name: values[1],
      viewed: values[2],
      purchased: values[3],
    };
    return obj;
  })
  .reduce((acc, current) => Object.assign(acc, current), {});
const usersJsonArr = Object.values(json); //Converting the object of objects created above into an array of user objects
console.log(usersJsonArr);

//Reeading the current user session text data into node using the node filesystem - fs
const currUserSess = fs.readFileSync("./data/CurrentUserSession.txt", "utf8");
//converting the read txt data into a json oject containing the userid and movieid currently being watched
const currUserjson = currUserSess
  .split(/\n|\r\n/)
  .map((line) => {
    const values = line.split(",");
    let obj = {};
    obj[values[0]] = {
      userid: values[0],
      currMovieId: values[1],
    };
    return obj;
  })
  .reduce((acc, current) => Object.assign(acc, current), {});
const jsonArrUser = Object.values(currUserjson);

console.log("------------------------------------------------------");
console.log("The current user session: userid and current movies id:");
console.log("------------------------------------------------------");
console.log(jsonArrUser);

//The keys for the products data read from the product file in the data folder
const keys = [
  "id",
  "name",
  "year",
  "keyword1",
  "keyword2",
  "keyword3",
  "keyword4",
  "keyword5",
  "rating",
  "price",
];
const productArr = [];
const readStream = fs.createReadStream("./data/Products.txt", "utf8"); //Open the stream and read the product data
const parser = csv.parse({ delimiter: "," });
parser.on("data", (array) => {
  productArr[array[0]] = {};
  for (let i = 0; i < array.length; i++) {
    productArr[array[0]][keys[i]] = array[i];
  }
});

//filtering the productArray to return popular products by filtering highly rated movies
parser.on("end", () => {
  const highlyRatedProds = productArr.filter((product) => {
    return product.rating > 2;
  });

  console.log("------------------------------------------------------");
  console.log("The highly rated movies:");
  console.log("------------------------------------------------------");
  console.log(highlyRatedProds);

  //Extracting the genres from the movies, by use of the keywords
  const genres = highlyRatedProds.map((genre) => ({
    genreId: genre.id,
    keyword1: genre.keyword1,
    keyword2: genre.keyword2,
    keyword3: genre.keyword3,
    keyword4: genre.keyword4,
  }));
  //console.log(genres);

  const user1Current = jsonArrUser[0].productId; // user i currently watching 20
  const user2Current = jsonArrUser[1].productId; //user2   31
  const user3Current = jsonArrUser[2].productId; //12
  const user5Current = jsonArrUser[3].productId; //10

  console.log("------------------------------------------------------");
  console.log("The recommendation engine");
  console.log("------------------------------------------------------");

  /*The function checks checks both the current user'session versus the 
  product data. First extracts the movie categories based on the users current session being viewed
  It then extracts from the products data other movies of the same category and recommends those to the user
  */

  function recomendMovies(userCurrSessid, user) {
    const currentGenreUsr1 = highlyRatedProds.filter((product) => {
      if (product.id == userCurrSessid) {
        console.log(
          `${user} now watching movies categorised as: ${product.keyword1},${product.keyword2},${product.keyword3}`
        );
        let obj = highlyRatedProds.filter(
          (o, i) =>
            o.keyword1 === product.keyword1 ||
            product.keyword2 ||
            product.keyword3
        );

        //console.log(obj);
        console.log(
          `${user} is currently watching '${product.name}', which is of genre ${product.keyword2} movies: 
          Check-out other ${product.keyword2} movies like '${obj[0].name}' and '${obj[2].name}' `
        );
      }
    });
  }

  /*calling the recommendMovies function with various parametres to get custom recomenndation based on 
  what the user is currently watching, that is the id */
  recomendMovies(20, "user1");
  recomendMovies(31, "user2");
  recomendMovies(12, "user3");
  recomendMovies(10, "user5");

  const genresin31 = highlyRatedProds.filter((products) => products.id == 31);
  const genresin12 = highlyRatedProds.filter((products) => products.id == 12);
  const genresin10 = highlyRatedProds.filter((products) => products.id == 10);
});

readStream.pipe(parser);

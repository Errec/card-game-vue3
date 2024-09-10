import jsonServer from "json-server"; // Importing json-server in ES module style
import { createRequire } from "module"; // To use require in an ES module
import { dirname, join } from "path"; // ES module-safe imports for path handling
import { fileURLToPath } from "url"; // Required for path handling in ES modules

const require = createRequire(import.meta.url); // Create a CommonJS `require` function
const monstersData = require("./monsters.json"); // Load the JSON file using `require`

// Get the current directory name for safe path handling
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create the server
const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, "db.json")); // Use `__dirname` to join the path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add a timestamp to POST requests
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date().toISOString();
  }
  next();
});

// Define the monsters GET endpoint
server.get("/monsters", (req, res) => {
  return res.json(monstersData.monsters); // Serve the monsters data
});

// Define the battle POST endpoint
server.post("/battle", (req, res) => {
  const { monster1Id, monster2Id } = req.body;

  if (!monster1Id || !monster2Id) {
    return res.status(400).json({ message: "Missing ID" });
  }

  const monster1 = monstersData.monsters.find(({ id }) => id === monster1Id);
  const monster2 = monstersData.monsters.find(({ id }) => id === monster2Id);

  if (!monster1 || !monster2) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const getMonsterSum = (monster) =>
    monster.attack + monster.defense + monster.hp + monster.speed;

  const monster1Sum = getMonsterSum(monster1);
  const monster2Sum = getMonsterSum(monster2);

  if (monster1Sum > monster2Sum) {
    return res.json({ winner: monster1, tie: false });
  }

  if (monster2Sum > monster1Sum) {
    return res.json({ winner: monster2, tie: false });
  }

  return res.json({ winner: null, tie: true });
});

// Start the server and listen on port 8081
server.use(router);
server.listen(8081, () => {
  console.log("JSON Server is running on port 8081");
});

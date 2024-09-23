const data = require("./fake-data");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const { creators, nfts, users } = data;
const app = express();
const port = process.env.PORT || 3000;

const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const validateWithRegex = (text, pattern) => {
  return pattern.test(text);
};

const BASE_URL = "http://localhost:3000/";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images/nfts")); // Set the directory for file uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Welcome our api!");
});

app.get("/api", (req, res) => {
  res.status(200).json([
    {
      method: "GET",
      path: "/api/creators",
      description: "Fetch all creators",
    },
    {
      method: "GET",
      path: "/api/creators/:id",
      urlParams: [
        {
          id: "required - Creator ID",
        },
      ],
      description: "Fetch a specific creator by ID and their NFTs",
    },
    {
      method: "DELETE",
      path: "/api/creators/:id",
      urlParams: [
        {
          id: "required - Creator ID",
        },
      ],
      description: "Delete a specific creator by ID",
    },
    {
      method: "GET",
      path: "/api/nfts",
      queryParams: [
        {
          skip: "optional - Number of items to skip",
        },
        {
          pageSize: "optional - Number of items per page (default: 10)",
        },
        {
          searchStr: "optional - Search string to filter NFTs by name",
        },
      ],
      description: "Fetch a list of NFTs with optional pagination and search",
    },
    {
      method: "POST",
      path: "/api/nfts",
      bodyParams: [
        {
          creatorId: "required",
          priceValue: "required",
          priceCurrency: "required",
          name: "required",
          highestBidValue: "optional",
          highestBidCurrency: "optional",
          image: "required - file (multipart/form-data)",
        },
      ],
      description: "Create a new NFT with an image upload",
    },
    {
      method: "DELETE",
      path: "/api/nfts/:id",
      urlParams: [
        {
          id: "required - NFT ID",
        },
      ],
      description: "Delete a specific NFT by ID and its associated image file",
    },
    {
      method: "POST",
      path: "/api/register",
      bodyParams: [
        {
          email: "required",
          username: "required",
          password: "required",
        },
      ],
      description: "Register a new user",
    },
    {
      method: "POST",
      path: "/api/login",
      bodyParams: [
        {
          username: "required",
          password: "required",
        },
      ],
      description: "User login",
    },
  ]);
});

app.get("/api/creators", (req, res) => {
  res.status(200).json(creators);
});

app.get("/api/creators/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Creator id is required!" });
    }

    const creator = creators.find((creat0r) => creat0r.id == id);
    if (!creator) {
      return res
        .status(404)
        .json({ error: `Creator not found with id: ${id}` });
    }
    creator.nfts = nfts.filter((nft) => nft.creatorId == id);
    res.status(200).json(creator);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.delete("/api/creators/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Creator id is required!" });
    }

    const creatorIdx = creators.findIndex((creator) => creator.id == id);
    if (creatorIdx === -1) {
      return res
        .status(404)
        .json({ error: `Creator not found with id: ${id}` });
    }
    const deletedCreator = creators.splice(creatorIdx, 1)[0];
    res.status(200).json(deletedCreator);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.get("/api/nfts", async (req, res) => {
  try {
    const {
      skip,
      pageSize = 10,
      searchStr,
      sort,
      creators: creatorFilter,
    } = req.query;
    const startIndex = skip ? +skip : 0;
    const endIndex = startIndex + +pageSize;

    const mappedNFTSWithCreator = nfts.map((nft) => ({
      ...nft,
      creator: creators.find((c) => c.id == nft.creatorId),
      creatorId: undefined,
    }));

    // Filter NFTs by search string and creator(s)
    let filteredNFTS = mappedNFTSWithCreator.filter(
      (nft) =>
        (searchStr
          ? nft.name.toLowerCase().includes(searchStr.toLowerCase())
          : true) && nft.creator
    );

    if (creatorFilter) {
      const creatorIds = creatorFilter.split(",").map((id) => id.trim());
      filteredNFTS = filteredNFTS.filter((nft) =>
        creatorIds.includes(nft.creator.id)
      );
    }

    if (sort) {
      const [sortBy, sortOrder] = sort.split("-");
      filteredNFTS.sort((a, b) => {
        let valueA, valueB;
        if (!sortBy || !sortOrder) {
          return 0;
        }

        if (sortBy === "name") {
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
        } else if (sortBy === "price") {
          valueA = parseFloat(a.price.value);
          valueB = parseFloat(b.price.value);
        } else {
          return 0; // Default to no sorting if sortBy doesn't match valid fields
        }

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    const nftsSlice = filteredNFTS.slice(startIndex, endIndex);

    res.status(200).json({
      totalCount: filteredNFTS.length,
      hasMore: endIndex < filteredNFTS.length,
      nfts: nftsSlice,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/nfts", async (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        error: `Multer error: ${err.message}`,
      });
    } else if (err) {
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    const {
      creatorId,
      priceValue,
      priceCurrency,
      highestBidValue,
      highestBidCurrency,
      name,
    } = req.body;

    if (!creatorId || !priceValue || !priceCurrency || !name) {
      return res.status(400).json({
        error:
          "Fields 'creatorId', 'priceValue', 'priceCurrency', and 'name' are required!",
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const creator = creators.find((creator) => creator.id == creatorId);
    if (!creator) {
      return res
        .status(404)
        .json({ error: `Creator not found with id: ${creatorId}` });
    }

    const newNFT = {
      id: uuidv4(),
      creatorId,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
      highestBid: {
        value: highestBidValue || "0",
        currency: highestBidCurrency || "wETH",
      },
      name,
      imgPath: `${BASE_URL}images/nfts/${req.file.filename}`,
    };

    nfts.push(newNFT);

    res.status(201).json(newNFT);
  });
});

app.delete("/api/nfts/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "NFT id is required!" });
    }

    const nftIndex = nfts.findIndex((nft) => nft.id == id);
    if (nftIndex === -1) {
      return res.status(404).json({ error: `NFT not found with id: ${id}` });
    }

    const nftToDelete = nfts[nftIndex];
    const imgPath = path.join(
      __dirname,
      "public/",
      nftToDelete.imgPath.replace(BASE_URL, "")
    );

    console.log(`Deleting image file at: ${imgPath}`);

    fs.access(imgPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.warn(`File not found at: ${imgPath}, skipping file deletion.`);

        const deletedNFT = nfts.splice(nftIndex, 1)[0];
        return res.status(200).json(deletedNFT);
      }

      fs.unlink(imgPath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `Error deleting image: ${err.message}` });
        }

        const deletedNFT = nfts.splice(nftIndex, 1)[0];
        res.status(200).json(deletedNFT);
      });
    });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json({ error: "Fields 'username' and 'password' are required!" });
    }

    const user = users.find(
      (user) => user.password === password && user.username === username
    );

    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found! Wrong email or password." });
    }

    res.status(200).json({ ...user, password: undefined });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.post("/api/register", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Fields 'username', 'email' and 'password' are required!",
      });
    }
    if (!validateWithRegex(email, EMAIL_REGEX)) {
      return res.status(400).json({
        error: "Email is not valid!",
      });
    }
    if (!validateWithRegex(password, PASSWORD_REGEX)) {
      return res.status(400).json({
        error: "Password is not valid!",
      });
    }

    const isUsernameAlreadyUsed = users.some(
      (user) =>
        user.username.toLowerCase().trim() === username.toLowerCase().trim()
    );

    if (isUsernameAlreadyUsed) {
      return res.status(400).json({
        error: "Username is already used!",
      });
    }
    const isEmailAlreadyUsed = users.some(
      (user) => user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (isEmailAlreadyUsed) {
      return res.status(400).json({
        error: "Email is already used!",
      });
    }

    const newUser = {
      id: uuidv4(),
      email,
      username,
      password,
    };

    users.push(newUser);

    res.status(200).json({ ...newUser, password: undefined });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error! ${error}` });
  }
});

app.listen(port, () => {
  console.log(`NFT Marketplace server app listening on port ${port}`);
});

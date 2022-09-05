var mongoUtil = require("../db/mongo");

exports.addProduct = async (req, res) => {
  console.log("############# In addProduct Route ###############");
  let db = mongoUtil.getDb();
  let data = req.body;

  let auth = await db.collection("users").findOne({ role: "Admin" });

  if (!auth) {
    console.log("User is not a Admin User");
    res
      .status(200)
      .send({ success: false, message: "Only Admin can add Products." });
  } else {
    data.productID = await getProductID();

    let db1 = await db.collection("products").insertOne(data);

    if (data.insertedId === 0) {
      res
        .status(400)
        .send({ success: false, message: "Unable to add product." });
    } else {
      res
        .status(200)
        .send({ success: true, message: "Product added successfully." });
    }
  }
};

exports.getAllProducts = async (req, res) => {
  console.log("############# In getAllProducts Route ##############");
  let db = mongoUtil.getDb();

  const filterObj = {
    productName: req.query.productName ? new RegExp(req.query.productName,'i') : /[a-z0-9]+/i,
    productCategory: req.query.productCategory ? new RegExp(req.query.productCategory,'i') : /[a-z0-9]+/i,
  };

  let products = await db.collection("products").find(filterObj).project({_id:0}).toArray();

  if (products === []) {
    res.status(404).send({ success: false, message: "No Products found." });
  } else {
    res.status(200).send(products);
  }
};

const getProductID = (req, res) => {
  let now = Date.now().toString(); // '1492341545873'
  now += now + Math.floor(Math.random() * 10);
  var length = now.length;
  return [now.slice(3, 9), now.slice(length - 2, length)].join("");
};

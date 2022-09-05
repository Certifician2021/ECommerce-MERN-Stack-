var mongoUtil = require("../db/mongo");
var bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  console.log("############# In Customer SignUp Route ###############");
  let db = mongoUtil.getDb();
  let { firstName, lastName, username, password, mobileNo } = req.body;

  var admin = await db.collection("users").findOne({ role: "Admin" });
  
  var adminExist = await db.collection("users").findOne({username:username, role: "Admin" });

  let exists = await db
    .collection("users")
    .findOne({ username: username, role: "Customer" });

  if (exists || adminExist) {
    console.log("customer already exists ...");
    res.status(200).send({
      success: false,
      message: "Customer already exists. Please try logging in.",
    });
  } else {
    console.log("registering customer");
    var passwordHash = bcrypt.hashSync(password, 10);
    userID = getUserID();
    let dbObj = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      mobileNo: mobileNo,
      adminID: admin.userID,
      userID: userID,
      password: passwordHash,
      role: "Customer",
      products: [],
    };

    let dbInsert = await db.collection("users").insertOne(dbObj);

    if (dbInsert.insertedId === 0) {
      console.log("Unable to create user, please try again later...");
      res.status(400).send({
        success: false,
        message: "Unable to create user, please try again later",
      });
    } else {
      console.log("successfully created customer...");
      res.status(200).send({
        success: true,
        message: "Successfully Created Customer Profile.",
      });
    }
  }
};

exports.givePermission = async (req, res) => {
  console.log("############# In givePermission Route ##############");
  let db = mongoUtil.getDb();
  let data = req.body;

  let auth = await db.collection("users").findOne({ role: "Admin" });

  if (!auth) {
    console.log("User is not a Admin User");
    res
      .status(200)
      .send({ success: false, message: "Only Admin can give Permissions." });
  } else {
    let userExists = await db
      .collection("users")
      .findOne({ userID: data.userID });

    if (!userExists) {
      res.status(200).send({
        success: false,
        message: "Cannot give permissions to User, user doesn't exists.",
      });
    } else {

      let updatedDb = await db
        .collection("users")
        .updateOne(
          { userID: data.userID, role: "Customer" },
          { $set: { products: data.products } }
        );

      if (updatedDb.modifiedCount === 0) {
        res
          .status(200)
          .send({
            success: false,
            message: "Unable to give permissions. Please try again later.",
          });
      } else {
        res
          .status(200)
          .send({ success: true, message: "Permission granted successfully." });
      }
    }
  }
};

exports.getAllUsers = async(req, res) => {
  const db = mongoUtil.getDb();

  const filterObj = {
    firstName: req.query.firstName ? new RegExp(req.query.firstName,'i') : /[a-z]+/i,
    username: req.query.username ? new RegExp(req.query.username,'i') : /[a-z0-9]+/i,
  };

    const users = await db.collection('users').find(filterObj,{role:"Customer"}).project({_id:0,password:0}).toArray();
    if(!users){
      console.log("######### No Users Found ########");
      res.status(404).send({success:false,message:"No Users Found at this moment"})
    }else{
      res.status(200).send(users)
    }
}

const getUserID = (req, res) => {
  let now = Date.now().toString(); // '1492341545873'
  now += now + Math.floor(Math.random() * 10);
  var length = now.length;
  return [now.slice(3, 9), now.slice(length - 2, length)].join("");
};

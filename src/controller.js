const fs = require("fs").promises;
const { createReadStream, appendFile } = require("fs");
const { DEFAULT_HEADER } = require("./util/util");
const path = require("path");
var qs = require("querystring");
const db = require("../database/data.json");
const ejs = require("ejs");
const formidable = require("formidable");
const util = require("util")

const controller = {
  getHomepage: async (request, response) => {
    const username = db[0].username; // john123
    const photo = db[0].photos;
    const data = await ejs.renderFile(__dirname + "/views/index.ejs", {
      username,
      db,
      photo
    });
    response.end(data);
  },
  getFormPage: (request, response) => {
    return response.end(`
    <h1>Hello world</h1> <style> h1 {color:red;}</style>
    <form action="/form" method="post">
    <input type="text" name="username"><br>
    <input type="text" name="password"><br>
    <input type="submit" value="Upload">
    </form>
    `);
  },
  sendFormData: (request, response) => {
    var body = "";

    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      var post = qs.parse(body);
      console.log(post);
    });
  },

  getFeed: async (request, response) => {
    // console.log(request.url); try: http://localhost:3000/feed?username=john123
    const username = db[0].username; // john123
    const photo = db[0].photos;
    const posts = db[0].stats.posts
    const followers = db[0].stats.followers
    const following = db[0].stats.following
    const profilePic = db[0].profile
    const description = db[0].description
    const pic1 = db[0].photos[0]
    const pic2 = db[0].photos[1]
    const data = await ejs.renderFile(__dirname + "/views/feed.ejs", {
      username,
      db,
      photo,
      posts,
      followers,
      following,
      profilePic,
      description,
      pic1,
      pic2
    });
    response.end(data);
  },

  uploadImages: (request, response) => {
    let form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write("received")
        res.end(util.inspect({fields: fields, files: files}));  
    })
    return;
  },
};

module.exports = controller;

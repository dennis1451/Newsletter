const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()

var HOME_PAGE = "/"

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.mail


  var data = {
    members:[ {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
  }
]
}
  const jsonData = JSON.stringify(data)

  const url = "https://us17.api.mailchimp.com/3.0/lists/86c0a27bec"

  const options = {
    method: "POST",
    auth: "DennisB:06357264caf569e21319c7d8426c278f-us17"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode == 200){
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
      console.log(response);
    }


    response.on("data", function() {
      console.log(jsonData);

    })
  })
  request.write(jsonData)
  request.end()
})

app.post("/failure.html", function (req, res){
  res.redirect(HOME_PAGE)

})

app.listen(process.env.PORT || 3000, function(res) {
  console.log("App is listening on port 3000");
})
//
// // Api Key : 06357264caf569e21319c7d8426c278f-us17
// //List id : 86c0a27bec

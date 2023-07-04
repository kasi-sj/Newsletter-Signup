const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT||3000 , function(req){
    console.log("server is running on 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fn = req.body.fn;
    const ln = req.body.ln;
    const em = req.body.em;

    const data = {
        members :[
            {
                email_address : em,
                status:"subscribed",
                merge_fields : {
                    FNAME: fn,
                    LNAME: ln,
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/505934aafd";
    const options = {
        method : "POST",
        auth:"kasi:a888cf439ed0231500e1dc98e963b5b47-us21"
    }
    
    var request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data" , function(data){
            // console.log(data);
        })
    });

    request.write(jsondata);
    request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/");
})
//api key
//888cf439ed0231500e1dc98e963b5b47-us21

//list id
//505934aafd
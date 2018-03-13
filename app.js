const express = require('express');
const bodyParser = require('body-parser');
const path = require ('path');
// const  fs = require('fs');
// const folders = fs.readFileSync('./data/data.json');
let data = require ('./data/data.json');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/api/data', function (req, res)  {
  res.send(data);

});


 // POST
app.post('/api/data', function(req, res)
{
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;



    res.send(data);
});
//
//
//PUT
app.post('/api/data/update', function (req, res)
 {
  let id = req.params.id;
  let name = req.params.name;
  let age = req.params.age;

  for (let i = 0; i < data.length; ++i)
  {
    if(id == data[i].id)
    {
      data[i].name = req.body.name;
      res.send(data[i]);
      return;
    }
  }

  res.send(data);
});
//
//
//DELETE
app.get('/api/data/delete', function (req, res) {
  ;
   for (let i=0; i<data.length; ++i)
   {
      if(data[i].id == data.id) {
         data.splice(i , 1);

    }
    res.send(data);
   }

}
);


app.listen(3007, function () {
console.log ('server started on port 3007*')
});
//
// app.post('/data', function(req, res){
//     // store in memory
//     data.push(req.body);
//     // send it back, updated, in json
//     res.setHeader('Content-Type', 'users/json');
//     res.send(data);
//   });
//
//   app.get('/data', function(req, res){
//     res.setHeader('Content-Type', 'users/json');
//     // stored in session ?
//     res.send(req.session.data || []);
//     // stored in memory ?
//     // res.send(data);
//   });


// app.get('/', function(req, res) {
//   var folders = fs.readdirSync(users.json)
//   var objArray = [];
//     res.send('index', { data: JSON.stringify(objArray) });
// });
//
//
//

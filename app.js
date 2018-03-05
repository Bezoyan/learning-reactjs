const express = require('express');
const bodyParser = require('body-parser');
const path = require ('path');
// const  fs = require('fs');
// const folders = fs.readFileSync('users.json');
let data = require ('./public/data.json');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/api/data', function (req, res)  {
  res.send(data);

});


 // POST
app.post('/api/:id', function(req, res)
{
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;


    res.send(data);
});
//
//
// //PUT
// app.put('/users/:id', function (req, res)
//  {
//   let id = req.params.id;
//   console.log(req.body.name);
//   for (let ix = 0; ix < users.length; ++ix)
//   {
//     if(id == users[ix].id)
//     {
//       users[ix].name = req.body.name;
//       res.send(users[ix]);
//       return;
//     }
//   }
//
//   res.send(user);
// });
//
//
// //DELETE
// app.delete('/user', function (req, res)
//  {
//    users.remove({
//             id: req.params.id
//         }, function(err, users) {
//             if (err)
//                 res.send(err);
//             else
//             res.send('Got a DELETE request at /user')
// });

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
// data.forEach((folder) => {
//     var obj    = {};
//     var files  = fs.readdirSync('users.json' + folder);
//
//     obj.folder = folder;
//     obj.files  = files;
//     objArray.push(obj);
// });

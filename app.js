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
app.post('/api/data/submit', function(req, res)
{
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let new_user = {
      id: id,
      name: name,
      age: age
    }
    data.push(new_user)

    res.send(data);

});
//
//
//PUT
app.post('/api/data/update/:id', function (req, res){
  let id = req.params.id;
  let name = req.body.name || null;
  let age = req.body.age || null;
  let changes = {};
  if (name != null) {
    changes.name = name;
  }
  if (age != null) {
    changes.age = age;
  }


   function updateUser(id, changes) {
     //check id
   	for (let i = 0; i < data.length; ++i)
   	{
   		if (data[i].id == id) {
   			data[id].name = name;
   			data[id].age = age;

        return data[id];
   		}

   	}
       return null;
   }

   let us = updateUser(req.params.id, changes);
   res.send(us || 'there are not user in your id');



  // let id = req.params.id;
  // let name = req.params.name;
  // let age = req.params.age;
  //
  // for (let i = 0; i < data.length; ++i)
  // {
  //   if(data.id == data[i].id)
  //   {
  //    console.log(id);
  //     res.send(data[i]);
  //     return;
  //   }
  // }
  //
  // res.send(data);

});


//DELETE
app.get('/api/data/delete/:id', function (req, res) {

  var id = req.params.id;

  function userDelete (id) {
	for(let i = 0; i < data.length; ++i) {
        if (data[i].id == id) {
            data.splice(id,1);
			return (data);
        }
    }
    return null;

}

let n = userDelete(req.params.id);
    res.send(n || "no found");

});


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

const express = require('express');
const path = require ('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//my data
 const users[
   {
     id:7,
     Name:'John',
     Age: 34
   },
   {
     id:6,
     Name:'John',
     Age: 34
   },
   {
     id:5,
     Name:'John',
     Age: 34
   },

 ];

 //GET
 app.get('/users/:id',function(req,res) {
     let id = req.params.id;
     for (let ix = 0; ix < users.length; ++ix) {
         if (users[ix].id == id) {
             return res.send(users[ix]);
         }
     }
     return res.send('not found');
 });


 // POST
app.post('/users/:id', function(req, res)
{
    let id = req.body.id;
    let name = req.body.name;
    age: req.body.age,


    res.send(user);
});


//PUT
app.put('/users/:id', function (req, res)
 {
  let id = req.params.id;
  console.log(req.body.name);
  for (let ix = 0; ix < users.length; ++ix)
  {
    if(id == users[ix].id)
    {
      users[ix].name = req.body.name;
      res.send(users[ix]);
      return;
    }
  }

  res.send(user);
});


//DELETE
app.delete('/user', function (req, res)
 {
   users.remove({
            id: req.params.id
        }, function(err, users) {
            if (err)
                res.send(err);
            else
            res.send('Got a DELETE request at /user')
});



 

app.listen(3007, function () {
console.log ('server started on port 3007*')
});

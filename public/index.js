//global variables
 var data =[];
 var style = {color: "#ffaaaa"};


var messageDialog = function (rootElementIdName, message){
  var mDialog = $("#"+rootElementIdName).find("#w_message");
  mDialog.find("p").html(message);
  mDialog.removeClass("hidden");
  mDialog.show();
  setTimeout(function(){mDialog.addClass("hidden")},4000);
}
var notifyChange = function(){
  var evt = document.createEvent('Event');
  evt.initEvent('changeUsers', true, true);
  document.getElementById('user').dispatchEvent(evt);
}




 //User adding form
 var AddUser = React.createClass ({

   getInitialState: function(){
     return {
       name: '',
       age: '',
       id: ''
    };
   },

   //
   // handleNameChange: function(e) {
   //   this.setState({name: e.target.value});
   // },
   // handleAgeChange: function(e) {
   //   this.setState({age: e.target.value});
   // },


  componentDidMount: function() {
      document.addEventListener("showAddUser",this.handleSubmitEvent);
    },

     handleSubmitEvent: function(e) {
      e.preventDefault();
      var user = this.props.user;
      // var id = this.state.user.length + 1
      var name = this.state.name.trim();
      var age = this.state.age.trim();
      if (!name || !age) {
        return;
      }
      // this.props.onUserSubmit({name: name, age: age});
      this.setState({name: name, age: age});
    },

   //  handleChange: function(e) {
   //    var self = this;
   //    var xmlhttp = new XMLHttpRequest();
   //    xmlhttp.open("GET", "/api/data");
   //    xmlhttp.onreadystatechange = function(){
   //        if (http.readyState == HttpRequest.DONE)
   //
   //    http.send();
   //   }
   // },


     setName: function(e){
       this.setState({name: e.target.value});
     },

     setAge: function(e){
       this.setState({age: e.target.value});
     },

   addUser: function(){
       // if (this.state.name.length == 0 || this.state.age.length == 0 ){
       //   messageDialog("AddUserModal", 'Fill up all fields');
       //   return false;
       // }
       var new_user = {
         id: function () {
            return '_' + Math.random().toString(36).substr(2, 9);
          },

       }
       new_user.name = this.state.name;
       new_user.age = this.state.age;

        console.log('new user == ', new_user);
       $.post('/api/data/submit', new_user, function()
       {
         $('#AddUserModal').modal('hide');
         notifyChange();
         return false;
       }).fail(function(data)
       {
         var msg = {};
         try{
            msg =  JSON.parse(data.responseText);
         }catch(e){
           messageDialog("AddUserModal");
           return false;
         }
         UserTable.update(data);
         messageDialog("AddUserModal", msg.message);
       });

     },

   render: function () {

     return (
     <div id="AddUser" className="modal fade" role="dialog" tabIndex="-1">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <button type="button" className="close" data-dismiss="modal">&times;</button>
             <h4 className="modal-title">Add User </h4>
           </div>

           <div className="modal-body">
             <table>
             <tbody>
               <tr>
                 <td>
                   <div  className="form-group multiple-form-group input-group">
                     <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
                     <input placeholder="User name" className="form-control" type="text" onChange={this.setName} />
                   </div>
                   <div  className="form-group multiple-form-group input-group">
                     <span className="input-group-addon span-min-width" id="sizing-addon2">Age</span>
                     <input placeholder="User age" className="form-control" type="number" onChange={this.setAge} />
                   </div>

                 </td>


               </tr>

               </tbody>
              </table>
           </div>

           <div id='w_message' className="alert alert-warning hidden">
              <strong>Warning!</strong> <p ></p>
           </div>

           <div className="modal-footer">
             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
             <button type="button" className="btn btn-primary" onClick={this.addUser} >Add</button>
           </div>

         </div>
       </div>
     </div>
   );

   }

 });




var EditUserModal = React.createClass({
  getInitialState: function() {
           return {

             name: "",
             age: "",
             editId:''

           };
  },

  componentDidMount: function() {
    document.addEventListener("showEditUserDialog", this.handleUserEdit);
  },


  handleUserEdit: function(data) {

    var user = this.props.user;
    var id = data.detail.id;
    this.state.editId = id;

  // setName: function(e){
  //   this.setState({name: e.target.value});
  // },
  //
  // setAge: function(e){
  //   this.setState({age: e.target.value});
  // },
  //
  //   this.setState({user: data});
},

setName: function(e){
  this.setState({name: e.target.value});
},

setAge: function(e){
  this.setState({age: e.target.value});
},

  // this.setState({user: data});

  editUser: function(){

    var self = this;
    var changes={};

    changes.age = this.state.age;
    changes.name = this.state.name;
    changes.id = this.state.editId;
    console.log(changes);
    console.log(this.state.editId);
    var id = this.state.editId;

    $.post('/api/data/update/' +id, changes, function()
    {

      $('#EditUserModal').modal('hide');
      notifyChange();
      return false;
    }).fail(function(data)
    {
      var msg = {};
      try{
         msg =  JSON.parse(data.responseText);
      }catch(e){
        messageDialog("EditUserModal");
        return false;
      }
      messageDialog("EditUserModal", msg.message);
    });

  },

 render: function() {


   return (
    <div id="EditUserModal" className="modal fade" role="dialog" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Edit User Model</h4>
          </div>

          <div className="modal-body">
            <table>
            <tbody>
              <tr>
                <td>
                  <div  className="form-group multiple-form-group input-group">
                    <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
                    <input placeholder="User name" className="form-control"
                    value={this.state.name} type="text"
                    onChange={this.setName} />
                 </div>
                 <div  className="form-group multiple-form-group input-group">
                   <span className="input-group-addon span-min-width" id="sizing-addon2">Age</span>
                   <input placeholder="User age" className="form-control"
                   value={this.state.age} type="number"
                   onChange={this.setAge} />
                </div>
                </td>

              </tr>

              </tbody>
             </table>
          </div>

          <div id='w_message' className="alert alert-warning hidden">
             <strong>Warning!</strong> <p ></p>
          </div>

          <div className="modal-footer">

            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={this.editUser} >Update</button>
          </div>

        </div>
      </div>
    </div>
  );
  }

});
//
var DeleteUserModal = React.createClass({
  getInitialState: function() {
           return {
              currentId:''

           };
  },

  componentDidMount: function() {
    document.addEventListener("showDeleteUserDialog", this.handleUserDelete);
  },

  handleUserDelete: function(data) {

     var user = this.props.user;
     var id = data.detail.id;
     this.state.currentId = id;

      this.setState({user: data});
    },


  deleteUser: function(){
    console.log(this.state.currentId)
      var id = this.state.currentId

    $.get('/api/data/delete/' + id, function(data){

        $("#DeleteUserModal").modal('hide');
        notifyChange();
    }).fail(function(data)
    {
      var msg = {};
      try{
         msg =  JSON.parse(data.responseText);
      }catch(e){
        messageDialog("DeleteUserModal");
        return false;
      }
      messageDialog("DeleteUserModal", msg.message);
    });

  },




  render: function()
  {
    return(
      <div id="DeleteUserModal" className="modal fade" role="dialog" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Delete User <a >{this.props.user.id}</a></h4>
            </div>

            <div className="modal-body">
              <p>Are you sure to deleting ?</p>
            </div>
            <div id='w_message' className="alert alert-warning hidden">
               <strong>Warning!</strong> <p ></p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={this.deleteUser}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});



// var AddUserModal = React.createClass({
//   getInitialState: function() {
//            return {
//
//              data:[]
//            };
//   },
//
//   componentDidMount: function() {
//     document.addEventListener('changeUsers',this.handleChange);
//   },
//
//   handleChange: function(e) {
//     var self = this;
//     var xmlhttp = new HMLHttpRequest();
//     xmlhttp.open("GET", "/data/data.json");
//     xmlhttp.onreadystatechange = function(){
//         if (http.readyState == HttpRequest.DONE)
//
//     http.send();
//    }
//   },
//
//
//   setUserName: function(event){
//     userName: event.target.value;
//     },
//   setUserAge: function(event){
//     userAge: event.target.value;
//   },
//
//   addUser: function(){
//     if (this.state.userName.length == 0 || this.state.userAge.length == 0 ){
//       messageDialog("AddUserModal", 'Fill up all fields');
//       return false;
//     }
//
//     var jsonData = {userName: this.state.userName, userAge: this.state.userAge};
//
//     $.post('/user/users/add/user', JSON.stringify(jsonData), function()
//     {
//       $('#AddUserModal').modal('hide');
//       notifyChange();
//       return false;
//     }).fail(function(data)
//     {
//       var msg = {};
//       try{
//          msg =  JSON.parse(data.responseText);
//       }catch(e){
//         messageDialog("AddUserModal");
//         return false;
//       }
//       messageDialog("AddUserModal", msg.message);
//     });
//
//   },
//
//  render: function() {
//
//
//
//    return(
//     <div id="AddUserModal" className="modal fade" role="dialog" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="close" data-dismiss="modal">&times;</button>
//             <h4 className="modal-title">Add User </h4>
//           </div>
//
//           <div className="modal-body">
//             <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <div  className="form-group multiple-form-group input-group">
//                     <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
//                     <input placeholder="User name" className="form-control" type="text" onChange={this.setUserName} />
//                   </div>
//                   <div  className="form-group multiple-form-group input-group">
//                     <span className="input-group-addon span-min-width" id="sizing-addon2">Age</span>
//                     <input placeholder="User age" className="form-control" type="text" onChange={this.setUserAge} />
//                   </div>
//
//                 </td>
//
//
//               </tr>
//
//               </tbody>
//              </table>
//           </div>
//
//           <div id='w_message' className="alert alert-warning hidden">
//              <strong>Warning!</strong> <p ></p>
//           </div>
//
//           <div className="modal-footer">
//             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary" onClick={this.addUser} >Add</button>
//           </div>
//
//         </div>
//       </div>
//     </div>
//   );
//   }
//
// });

// User row with name and age
var UserRow = React.createClass ({

  handleChange: function(e) {
    var self = this;
    $.get("api/data"+e.detail.id+".json" , function(){

          self.setState({

            name: e.detail.name,
            age : e.detail.age,
            id: e.detail.id
          });

    });

  },

  showDeleteUserDialog: function(data)
    {

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent("showDeleteUserDialog", true, true, data);
      // document.dispatchEvent(evt);
      document.getElementById('delete').dispatchEvent(evt)
      $("#DeleteUserModal").modal('toggle');


    },

    showEditUserDialog: function(data){
      // console.log(data);
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent("showEditUserDialog", true, true, data);
      document.getElementById('edit').dispatchEvent(evt);
      $("#EditUserModal").modal('toggle');
    },

    render: function () {


        var status_style="label label-success";
        var row_style="";
        var deleteBtn="";
        var editBtn="";
        var rows=[];
        var user = this.props.user;
        var name = user.name;
        var age = user.age;
        var id  = user.id;




      return (

              <tr className={row_style}>

                  <td>{user.name}</td>
                  <td>{user.age}</td>

                   <td className="text-right">
                     <div className="btn-group">
                       <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Action
                       <span className="caret"></span></button>
                       <ul className="dropdown-menu" role="menu">
                          <li><a href="#"
                           className="btn-default"
                           onClick={this.showDeleteUserDialog.
                             bind(this, {id:this.props.user.id,
                               name:this.props.user.name,
                               age:this.props.user.age,})}>
                               <span className="glyphicon glyphicon-trash">
                               </span>&nbsp;Delete</a></li>

                           <li><a href="#"
                             className="btn-default"
                             onClick={this.showEditUserDialog.
                               bind(this, {id:this.props.user.id,
                                 name:this.props.user.name,
                                 age:this.props.user.age})}>
                                 <span className="glyphicon glyphicon-edit">
                                 </span>&nbsp;Edit</a></li>
                        </ul>
                       </div>
                   </td>
                 </tr>

    );
  }

});

//Users table outputs users list
var UserTable = React.createClass({
    getInitialState: function() {

             return {users:this.props.users};

    },

    showAddUser: function(){
      console.log(data);
          var evt = document.createEvent('Event');
          evt.initEvent("showAddUser", true, true, data);
          document.getElementById('add').dispatchEvent(evt);
          $("#AddUser").modal('toggle');

        },

    updatePage: function(data) {
      console.log('aaaaaaaaaaaaaaaaaaa');
      this.setState({
        rows: data
      })
    },

  render: function() {

    this.state = {
      rows: []
    }

     this.props.data.map((user) => {

       this.state.rows.push(
       <UserRow user = {user}
          key={user.id} />

     );
      // console.log(user.id);

     });
//      if (this.props.data.length > 0 ){
//    console.log(this.props);
// }
    return (

      <div className="container">
            <div className="row">

              <div className="panel panel-default filterable">
                  <div className="panel-heading">
                    <h3 className="panel-title"> Users List</h3>
                      <div className="pull-right">
                          <button className="btn btn-success btn-xs" onClick={this.showAddUser}>
                          <span className="glyphicon glyphicon-plus"></span> Add User</button>

                      </div>
                  </div>
                  <table className="table table-striped custab">
                    <thead>
                       <tr className="filters">
                           <th><input type="text" className="form-control" placeholder="Name" disabled/></th>
                           <th><input type="text" className="form-control" placeholder="Age" disabled/></th>
                       </tr>
                    </thead>
                   <tbody>

                   {this.state.rows}
                   </tbody>

                  </table>
              </div>
            </div>
          </div>
        );
}
});


// Application table
var AppTable = React.createClass ({

  loadUsersFromServer: function () {
    $.ajax ({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // //submit to server and refresh list
  // handelUserSubmit: function (user) {
  //   var users = this.state.data;
  //   user.id = Date.now();
  //   var newUsers = users.concat([user]);
  //   this.setState({data: newUsers});
  //   $.ajax ({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: user,
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       this.setState({data: users});
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  //
  // },

      getInitialState: function() {
        return {data: []};

      },

  componentDidMount: function() {
    this.loadUsersFromServer();

  },

  render: function () {


  return (
    <div>

      <UserTable data = {this.state.data}  />
      <AddUser data = {this.handelUserSubmit}/>
      <EditUserModal data = {this.state.data} />
      <DeleteUserModal user = {this.state.data} />


    </div>
  );
}

});




//ReactDom render
ReactDOM.render(
  <AppTable  url="/api/data"/>,
  document.getElementById('user')
);

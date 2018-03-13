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
     return {name: '', age: ''};
   },
   // handleNameChange: function(e) {
   //   this.setState({name: e.target.value});
   // },
   // handleAgeChange: function(e) {
   //   this.setState({age: e.target.value});
   // },


   handleSubmitEvent: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var age = this.state.age.trim();
    if (!name || !age) {
      return;
    }
    this.props.onUserSubmit({name: name, age: age});
    this.setState({name: '', age: ''});
  },

  componentDidMount: function() {
      document.addEventListener('changeUsers',this.handleChange);
    },

    handleChange: function(e) {
      var self = this;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "api/data");
      xmlhttp.onreadystatechange = function(){
          if (http.readyState == HttpRequest.DONE)

      http.send();
     }
   },


      //
      //   $.post('/api/data', JSON.stringify(data), function()
      //   {
      //     $('#AddUser').modal('hide');
      //     notifyChange();
      //     return false;
      //   }).fail(function(data)
      //   {
      //     var msg = {};
      //     try{
      //        msg =  JSON.parse(data.responseText);
      //     }catch(e){
      //       messageDialog("AddUser");
      //       return false;
      //     }
      //     messageDialog("AddUser", msg.message);
      //   });
      //
      // },

    // componentDidMount: function() {
    //   document.addEventListener('changeUsers',this.handleSubmitEvent);
    // },


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
                     <input placeholder="User age" className="form-control" type="text" onChange={this.setAge} />
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
             id: ""

           };
  },

  componentDidMount: function() {
    document.addEventListener('changeUsers', this.handleChange);
  },




  setName: function(e){
    this.setState({name: e.target.value});
  },
  setAge: function(e){
    this.setState({age: e.target.value});
  },


  editUser: function(){
    // if (this.state.name.length == 0 || this.state.age.length == 0){
    //   messageDialog("EditUserModal", 'Fill up all fields');
    //   return false;
    // }


    var self = this;
    var changes={};
    changes.add=[];
    changes.age=this.state.age;
    changes.name=this.state.name;
    changes.id=this.state.id;



   console.log(changes);

    $.post('api/data/update', JSON.stringify(changes), function()
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

  deleteUser: function(){
    //  undefined
    $.get('api/data/delete',+ this.props.user.id, function(data){

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
              <h4 className="modal-title">Delete User <a >{this.props.user.name}</a></h4>
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

      $("#DeleteUserModal").modal('toggle');
    },

    showEditUserDialog: function(data){
      // console.log(data);
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent( true, true, data);
      document.getElementById('edit').dispatchEvent(evt);
      $("#EditUserModal").modal('toggle');
    },

    render: function () {


        var status_style="label label-success";
        var row_style="";
        var deleteBtn="";
        var editBtn="";
        // var rows=[];
        var user = this.props.user;
        var name = this.props.user.name;
        var age = this.props.user.age;
        var id  = this.props.user.id;




      return (

              <tr className={row_style}>

                  <td>{this.props.user.name}</td>
                  <td>{this.props.user.age}</td>

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

             return {user:this.props.user};

    },

    showAddUser: function(){
          var evt = document.createEvent('Event');
          evt.initEvent( true, true, data);
          document.getElementById('add').dispatchEvent(evt);
          $("#AddUser").modal('toggle');
          console.log (AddUser);
        },

  render: function() {
console.log(user);
     var rows = [];

     this.props.data.map((user) => {

       rows.push(
       <UserRow
          user = {user}
          key={user.id} />

     );
      // console.log(user.id);

     });

     console.log(user.id);
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

                   {rows}
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
      <UserTable data = {this.state.data} />
      <AddUser data = {this.handelUserSubmit}/>
      <EditUserModal data = {this.state.data} />
      <DeleteUserModal user = {this.state.data} />


    </div>
  );
}

});



 // var LoadEditUserDialog = function (){
 //    $.get( url="/api/data", function(data) {
 //      var a=0;
 //      data=[];
 //      ReactDOM.render(
 //
 //        <EditUserModal user={data} userId={a}/>,
 //        document.getElementById('edit')
 //      );
 //    });
 //  }

  // var LoadDeleteUserModalDialog = function (){
  //   $.get("", function() {
  //     ReactDOM.render(
  //       <DeleteUserModal user={data}/>,
  //       document.getElementById('delete')
  //     );
  //   });
  // }

//ReactDom render
ReactDOM.render(
  <AppTable  url="/api/data"/>,
  document.getElementById('user')
);

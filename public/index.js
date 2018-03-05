// var AddUserModel = React.createClass ({
//   getInitialState: function() {
//            return {
//               user:this.props.user,
//              name: '',
//               age: ''
//
//            };
//   },
//
//   componentDidMount: function() {
//     document.addEventListener( this.handleChange);
// },
//
// handleChange: function(e) {
//     var self = this;
//     var http = new HttpRequest();
//     http.open("GET", "./../data/data.json");
//     http.onreadystatechange = function() {
//         if (http.readyState == HttpRequest.DONE) {
//             if(http.status == 200){
//                 self.setState({
//                   user: JSON.parse(http.responseText),
//
//                 });
//             }else{
//                 console.log('Error: ' + http.statusText )
//             }
//         }
//     }
//     http.send();
// },
//
//
// setName: function(event){
//   this.state.Name = event.target.value;
//   },
//
// setAge: function (event){
//   this.state.Age = event.target.value;
// },
//
// addUser: function(){
//     if (this.state.Name.length == 0 ||  this.state.Age.length == 0 ){
//       messageDialog("AddUserModal", 'Fill up all fields');
//       return false;
// }
//
// var jsonData = {Name: this.state.Name, Age: this.state.Age};
//
// $.post('/user/instances/add/user', JSON.stringify(jsonData), function()
//    {
//      $('#AddUserModal').modal('hide');
//      notifyChange();
//      return false;
//    }).fail(function(data)
//    {
//      var msg = {};
//      try{
//         msg =  JSON.parse(data.responseText);
//      }catch(e){
//        messageDialog("AddUserModal", 'Unknown error');
//        return false;
//      }
//      messageDialog("AddUserModal", msg.message);
//    });
//
// },
//
// render: function() {
//
//   return(
//     <div id="AddUserModal" className="modal fade" role="dialog" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="close" data-dismiss="modal">&times;</button>
//             <h4 className="modal-title">Add User</h4>
//           </div>
//
//           <div className="modal-body">
//             <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <div  className="form-group multiple-form-group input-group">
//                     <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
//                     <input placeholder="name" className="form-control" type="text" onChange={this.setName} />
//                  </div>
//                  <div  className="form-group multiple-form-group input-group">
//                    <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
//                    <input placeholder="name" className="form-control" type="text" onChange={this.setAge} />
//                 </div>
//
//                 </td>
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
//  }
// });
//
//
// var EditUserModal = React.createClass ({
//   getInitialState: function() {
//         return {
//              user:this.props.user,
//             Name: '',
//              Age: ''
//
//         };
//
// },
// componentDidMount: function() {
//         document.addEventListener('changePortCheckBoxEdit', this.handleChange);
//     },
//
//     handleChange: function(e) {
//         var self = this;
//
//           $.get("data/free-ports.json", function(user){
//               self.setState({
//
//                 Name: e.detail.name,
//                 Age : e.detail.age
//               });
//           });
//
//
//     },
//
//
// setName: function(event){
//     this.setState({Name: event.target.value});
// },
//
// setAge: function(event){
//     this.setState({Age: event.target.value});
// },
//
// editUser: function(){
//     if (this.state.Name.length == 0 ||  this.state.Age.length == 0 ){
//       messageDialog("EditUserModal", 'Fill up all fields');
//       return false;
// }
// changes.Name=this.state.Name;
// changes.Age=this.state.Age;
//
// $.post('/user/instances/edit/user', JSON.stringify(changes), function()
//    {
//      $('#EditUserModal').modal('hide');
//      notifyChange();
//      return false;
//    }).fail(function(data)
//    {
//      var msg = {};
//      try
//      {
//         msg =  JSON.parse(data.responseText);
//      }catch(e)
//      {
//        messageDialog("EditUserModal", 'Unknown error');
//        return false;
//      }
//      messageDialog("EditUserModal", msg.message);
//    });
//
// },
//
// render: function() {
//   return(
//     <div id="EditUserModal" className="modal fade" role="dialog" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="close" data-dismiss="modal">&times;</button>
//             <h4 className="modal-title">Edit User Model</h4>
//           </div>
//
//           <div className="modal-body">
//             <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <div  className="form-group multiple-form-group input-group">
//                     <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
//                     <input placeholder="yor name" className="form-control" value={this.state.Name} type="text" onChange={this.setServerName} />
//                  </div>
//                  <div  className="form-group multiple-form-group input-group">
//                    <span className="input-group-addon span-min-width" id="sizing-addon2">Name</span>
//                    <input placeholder="your age" className="form-control" value={this.state.Age} type="text" onChange={this.setServerName} />
//                 </div>
//                 </td>
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
//
//             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary" onClick={this.editUser} >Update</button>
//           </div>
//
//         </div>
//       </div>
//     </div>
//   );
//   }
//
// });
//
//
// var DeleteModalDialog = React.createClass ({
//   deleteUser: function(){
//     $.get('/user/instances/delete/server/' + this.props.server.id, function(data){
//         $("#DeleteUserModal").modal('hide');
//         notifyChange();
//     }).fail(function(data)
//     {
//       var msg = {};
//       try{
//          msg =  JSON.parse(data.responseText);
//       }catch(e){
//         messageDialog("DeleteUserModal", 'Unknown error');
//         return false;
//       }
//       messageDialog("DeleteUserModal", msg.message);
//     });
//
// },
//
// render: function()
//   {
//     return(
//       <div id="DeleteServerModal" className="modal fade" role="dialog" tabIndex="-1">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <button type="button" className="close" data-dismiss="modal">&times;</button>
//               <h4 className="modal-title">Delete User <a >{this.props.user.name}</a></h4>
//             </div>
//
//             <div className="modal-body">
//               <p>Are you sure to delete ?</p>
//             </div>
//             <div id='w_message' className="alert alert-warning hidden">
//                <strong>Warning!</strong> <p ></p>
//             </div>
//
//             <div className="modal-footer">
//               <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-danger" onClick={this.deleteUser}>Delete</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }
// });

var AssignedUserRow = React.createClass({

  render: function() {
      var row=[];
      if (this.props.AssUser)
      {
          var tmp = this.props.AssUser.split(' ');

          if (~~tmp[1] == 0)
          {
            row = <p> {tmp[0]}</p>
          }else{
            row = <p><b>{tmp[0]} </b> [ANYCAST]</p>
          }
      }else{
        row="<p></p>"
      }
    return(

        <div >{row}</div>

    );
  }
});

var UserRow = React.createClass({

//   showDeleteUserDialog: function(user)
//     {
//       console.log(server);
//       LoadDeleteUserModalDialog(user);
//       $("#DeleteUserModal").modal('toggle');
// },
//
// showEditServerDialog: function(user){
//       var evt = document.createEvent('CustomEvent');
//       evt.initCustomEvent("changePortCheckBoxEdit", true, true, user);
//       document.getElementById('edit-server-modal-dialog').dispatchEvent(evt);
//       $("#EditUserModal").modal('toggle');
// },

 render: function() {

   var user = this.props.user;
   var name = user.name;
   var id = user.id;
   var age = user.age;
   var row_style="";
   var deleteBtn="";
   var editBtn="";
   var rows = [];
   var counter = 0;

  user.forEach(function(item)

 {
     rows.push(<AssignedUserRow User={item} key={counter}/>);
     counter++;
});

deleteBtn=<li><a href="#"
className="btn-default"
onClick={this.showDeleteServerDialog
  .bind(this, {id:this.props.mInstance.id,
   name:this.props.mInstance.instance_name})}>
   <span className="glyphicon glyphicon-trash">
   </span>&nbsp;Delete instance</a></li>

editBtn=<li><a href="#"
className="btn-default"
onClick={this.showEditServerDialog
  .bind(this, {id:this.props.mInstance.id,
  name:this.props.mInstance.instance_name})}>
  <span className="glyphicon glyphicon-edit">
  </span>&nbsp;Edit instance</a></li>


  return (
        <tr className={row_style}>
            <td>{rows}</td>
            <td> {ports_row} </td>
            <td className="text-right">
              <div className="btn-group">
                <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Action <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#" className="btn-default">
                      <span className="glyphicon glyphicon-plus"></span>&nbsp;Edit
                    </a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    <a href="#" className="btn-default" >
                      <span className="glyphicon glyphicon-minus"></span>&nbsp;Delete
                    </a>
                   </li>
                   {editBtn}
                   {deleteBtn}
                  </ul>
              </div>
            </td>
          </tr>
);
 }
});

var UserTable = React.createClass({
  getInitialState: function() {
             return {instances:this.props.Instances};
},

componentDidMount: function() {
      document.addEventListener('changeInstances', this.handleChange);
},

// _showAddUser: function(){
//       var evt = document.createEvent('Event');
//       evt.initEvent('changePortCheckBox', true, true);
//       document.getElementById('add-user-modal-dialog').dispatchEvent(evt);
//       $("#AddUserModal").modal('toggle');
// },

handleChange: function(e) {
      var self = this;
      var http=new HttpRequest();
      http.open("GET", "data.json");
      http.onreadystatechange = function() {
          if (http.readyState == HttpRequest.DONE) {
              if(http.status == 200){
                  self.setState({instances: JSON.parse(http.responseText)});
              }else{
                  console.log('Error: ' + http.statusText )
              }
          }
      }
      http.send();
},

render: function() {
      var rows = [];
      var lastCategory = null;
      this.state.instances.forEach(function(item) {
        rows.push(<InstanceRow mInstance={item} key={item.id}/>);
      });

      return (

        <div className="container">
          <div className="row">

            <div className="panel panel-default filterable">
                <div className="panel-heading">
                    <h3 className="panel-title">.:</h3>
                    <div className="pull-right">
                        <button className="btn btn-success btn-xs" onClick={this._showAddUser}><span className="glyphicon glyphicon-plus"></span> Physical Server</button>

                    </div>
                </div>
                <table className="table table-striped custab">
                  <thead>
                     <tr className="filters">
                         <th><input type="text" className="form-control" placeholder="Name" disabled/></th>
                         <th><input type="text" className="form-control" placeholder="Age" disabled/></th>
                         <th></th>

                     </tr>
                  </thead>
                <tbody>{rows}</tbody>

                </table>
            </div>
          </div>
        </div>
      );
}
});

var LoadContent = function (){
    $.get( "/data.json", function( data ) {
      ReactDOM.render(
        <UserTable instance={data} />,
        document.getElementById('dContent')
      );

    });

}

// var LoadAddUserDialog = function (){
//     $.get( "./../data/user.json", function( data ) {
//
//       ReactDOM.render(
//         <AddUserModal User={data}/>,
//         document.getElementById('add-user-modal-dialog')
//       );
//     });
// }
//
// var LoadEditUserDialog = function (){
//     $.get( "", function(data) {
//       var a=0;
//       data=[];
//       ReactDOM.render(
//
//         <EditUserModal User={data} instanceId={a}/>,
//         document.getElementById('edit-user-modal-dialog')
//       );
//     });
// }
//
// var LoadDeleteUserModalDialog = function (data={name:"",id:0}){
//     $.get("", function() {
//       ReactDOM.render(
//         <DeleteModalDialog server={data}/>,
//         document.getElementById('delete-user-modal-dialog')
//       );
//     });
// }

LoadContent();
// LoadDeleteUserModalDialog();
// LoadAddUserDialog();
// LoadEditUserDialog();

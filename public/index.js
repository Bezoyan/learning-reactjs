var AddUserModal = React.createClass({
  getInitialState: function() {
           return {

             userName:"",
             userAge: ""

           };
  },

  componentDidMount: function() {
    document.addEventListener('changeUsers',this.handleChange);
  },

  handleChange: function(e) {
    var http = new HttpRequest();
    http.open("GET", "/data/data.json");
    http.onreadystatechange = function(){
        if (http.readyState == HttpRequest.DONE)

    http.send();
   }
  },




  setUserName: function(event){
    this.state.userName = event.target.value;
  },
  setUserAge: function(event){
    this.state.userAge = event.target.value;
  },

  addUser: function(){
    if (this.state.userName.length == 0 || this.state.userAge.length == 0 ){
      messageDialog("AddUserModal", 'Fill up all fields');
      return false;
    }

    var jsonData = {userName: this.state.userName, userAge: this.state.userAge};

    $.post('/user/users/add/user', JSON.stringify(jsonData), function()
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
      messageDialog("AddUserModal", msg.message);
    });

  },

 render: function() {



   return(
    <div id="AddUserModal" className="modal fade" role="dialog" tabIndex="-1">
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
                    <input placeholder="User name" className="form-control" type="text" onChange={this.setUserName} />
                  </div>
                  <div  className="form-group multiple-form-group input-group">
                    <span className="input-group-addon span-min-width" id="sizing-addon2">Age</span>
                    <input placeholder="User age" className="form-control" type="text" onChange={this.setUserAge} />
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

             userName:"",
             userAge:""

           };
  },

  componentDidMount: function() {
    document.addEventListener('changeUsers', this.handleChange);
  },

  handleChange: function(e) {
    var self = this;
    $.get("data/userid-"+e.detail.id+".json" , function(){

          self.setState({

            userName: e.detail.name,
            userAge : e.detail.age,
            userId: e.detail.id
          });

    });

  },


  setUserName: function(event){
    this.setState({userName: event.target.value});
  },
  setAgeName: function(event){
    this.setState({userAge: event.target.value});
  },


  editUser: function(){
    if (this.state.userName.length == 0 || this.state.userAge.length == 0){
      messageDialog("EditUserModal", 'Fill up all fields');
      return false;
    }


    var self = this;
    var changes={};
    changes.del=[];
    changes.add=[];
    changes.userAge=this.state.userAge;
    changes.userName=this.state.userName;
    changes.userId=this.state.userId;





    $.post('/user/users/edit/user', JSON.stringify(changes), function()
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
                    value={this.state.userName} type="text"
                    onChange={this.setUserName} />
                 </div>
                 <div  className="form-group multiple-form-group input-group">
                   <span className="input-group-addon span-min-width" id="sizing-addon2">Age</span>
                   <input placeholder="User age" className="form-control"
                   value={this.state.userAge} type="text"
                   onChange={this.setUserAge} />
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

var DeleteModalDialog = React.createClass({

  deleteUser: function(){
    $.get('/user/users/delete/user/' + this.props.user.id, function(data){
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


  var UserRow = React.createClass({

    showDeleteUserDialog: function(user)
    {
      console.log(user);
      LoadDeleteUserModalDialog(user);
      $("#DeleteUserModal").modal('toggle');
    },

    showEditUserDialog: function(data){
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent( true, true, data);
      document.getElementById('edit-user-modal-dialog').dispatchEvent(evt);
      $("#EditUserModal").modal('toggle');
    },

    render: function() {
      var status_style="label label-success";
      var row_style="";
      var deleteBtn="";
      var editBtn="";
      var rows=[];
      var user = this.props.user;
      var name = user.name;
      var age = user.age;
      var id  = user.id;



    deleteBtn=<li><a href="#"
      className="btn-default"
      onClick={this.showDeleteUserDialog.
        bind(this, {id:this.props.user.id,
          name:this.props.user.name,
          age:this.props.user.age})}>
          <span className="glyphicon glyphicon-trash">
          </span>&nbsp;Delete</a></li>
    editBtn=<li><a href="#"
      className="btn-default"
      onClick={this.showEditUserDialog.
        bind(this, {id:this.props.user.id,
          name:this.props.user.name,
          age:this.props.user.age})}>
          <span className="glyphicon glyphicon-edit">
          </span>&nbsp;Edit</a></li>



      return (
        <tr className={row_style}>

            <td>{rows}</td>

            <td className="text-right">
              <div className="btn-group">
                <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Action
                <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#" className="btn-default">
                      <span className="glyphicon glyphicon"></span>&nbsp;{editBtn}
                    </a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    <a href="#" className="btn-default" >
                      <span className="glyphicon glyphicon"></span>&nbsp;{deleteBtn}
                    </a>
                   </li>

                  </ul>
              </div>
            </td>
          </tr>
      );
    }
  });



  var UsersTable = React.createClass({
    getInitialState: function() {
             return {users:this.props.users};
    },

    componentDidMount: function() {
      document.addEventListener('changeUsers', this.handleChange);
    },

    _showAddUser: function(){
      var evt = document.createEvent('Event');
      evt.initEvent( true, true);
      document.getElementById('add-user-modal-dialog').dispatchEvent(evt);
      $("#AddUserModal").modal('toggle');
    },

    handleChange: function(e) {
      var self = this;
      var http=new HttpRequest();
      http.open("GET", "users.json");
      http.onreadystatechange = function() {
          if (http.readyState == HttpRequest.DONE) {
              if(http.status == 200){
                  self.setState({users: JSON.parse(http.responseText)});
              }else{
                  console.log('Error: ' + http.statusText )
              }
          }
      }
      http.send();
    },


    render: function() {
      var rows = [];
     this.state.users.map((user) => {
       rows.push(
       <UserRow
          user={user}
          key={user.id} />
        );
      });

      return (

        <div className="container">
          <div className="row">

            <div className="panel panel-default filterable">
                <div className="panel-heading">
                    <h3 className="panel-title"> Users List</h3>
                    <div className="pull-right">
                        <button className="btn btn-success btn-xs" onClick={this._showAddUser}>
                        <span className="glyphicon glyphicon-plus"></span> Add User</button>

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

var data = [];
  var LoadContent = function (){
    $.get( "data/users.json", function( data ) {
      ReactDOM.render(
        <UsersTable users={data} />,
        document.getElementById('content')
      );

    });

  }

  var LoadAddUserDialog = function (){
    $.get( "data/data.json", function( data ) {

      ReactDOM.render(
        <AddUserModal jsonData={data}/>,
        document.getElementById('add-user-model-dialog')
      );
    });
  }


  var LoadEditUserDialog = function (){
    $.get( "", function(data) {
      var a=0;
      data=[];
      ReactDOM.render(

        <EditUserModal jsonData={data} userId={a}/>,
        document.getElementById('edit-user-modal-dialog')
      );
    });
  }

  var LoadDeleteUserModalDialog = function (data={name:"",id:0}){
    $.get("", function() {
      ReactDOM.render(
        <DeleteModalDialog user={data}/>,
        document.getElementById('delete-user-modal-dialog')
      );
    });
  }

  LoadContent();
  LoadDeleteUserModalDialog();
  LoadAddUserDialog();
  LoadEditUserDialog();

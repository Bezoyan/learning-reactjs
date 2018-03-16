var App = React.createClass({
  getInitialState: function() {
    return {
      text:'',
      isEdit: 0,
      users: [
        {id:1, text: 'Karen', age: 12},
        {id:2, text: 'Maren', age: 24},
        {id:3, text: 'Varen', age: 26}
      ]
        }
  },

  render: function(){
    return(
      <div>
         <UserForm
         {...this.state}
         changeText = {this.  handleChangeText}
         onUserUpdate = {this.handleUserUpdate}
         onUserAdd = {this.handleUserAdd}
         />

         <UserList
         {...this.state}
         editUser = {this.handleUserEdit}
         deleteUser = {this.handleUserDelete}
         />

      </div>


    );
  },

  handleUserAdd: function(text) {
    var newUser = {
      id: this.state.users.length + 1,
      text: text,


    }
    this.setState({users:this.state.users.concat(newUser)})
  },

  handleUserDelete: function(user) {
   var users = this.state.users;
   for(let i  = 0; i< users.length; ++i){
     if (users[i].id == user.id) {
       users.splice(i, 1);
     }
   }
    this.setState({users: users});
  },

  handleUserEdit: function(user) {

    this.setState({
      text: user.text,
      isEdit: user.id
    });
  },

  handleChangeText: function(text) {
    this.setState({text: text});
  },

  handleUserUpdate: function(user) {
   var users = this.state.users;
   for(var i  =0; i< users.length; ++i){
     if (users[i].id == user.id) {
       users.splice(i, 1);
     }
   }
    users.push(user);
    this.setState({users: users});
  }
});

var UserList = React.createClass({

  render: function(){
    var deleteBtn="";
    var editBtn="";

    return(
    <div className="container">
      <div className="row">
        <div className="panel panel-default filterable">
          <div className="panel-heading">
              <div className="panel-title">
                <h3> Users List</h3>

                <button className="btn btn-success btn-xs" >
                <span className="glyphicon glyphicon-plus"></span> Add User</button>

              </div>

              <table className="table table-striped custab">
                <thead>
                   <tr className="filters">
                       <th><input type="text" className="form-control" placeholder="Name" disabled/></th>

                   </tr>
                </thead>


              </table>
              <div className="list-group">
             {
               this.props.users.map((user) =>{
                 return <li className="list-group-item"
                 user={user} key={user.id}> <span
                   onClick={ console.log(user.id), this.editUser.bind(this, user)}>
                   {user.text} </span>
                    <a onClick={this.onDelete.bind(this, user)}
                   className = "delete" href="#">DELETE</a></li>



               })
             }
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  onDelete: function(user) {
    this.props.deleteUser(user);
  },

  editUser: function(user) {
    this.props.editUser(user);

  }

});

var UserForm = React.createClass({

  render: function(){
    return(


          // <div className="modal fade" id="contact_dialog" role="dialog">
          //   <div className="modal-dialog">
          //       <div className="modal-content">
          //           <div className="modal-header">
          //               <button type="button" className="close" data-dismiss="modal">&times;</button>
          //               <h4 className="modal-title">Enter your name</h4>
          //           </div>
          //               <div className="modal-body">
          //                   <form id="contact_form" >
          //                       Name: <input type="text" name="first_name"/><br/>
          //
          //                   </form>
          //               </div>
          //               <div className="modal-footer">
          //                   <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          //                   <button type="button" id="submitForm" className="btn btn-default">Send</button>
          //               </div>
          //           </div>
          //       </div>
          //   </div>

      <div>
         <form onSubmit = {this.onSubmit}>
           <div className= "form-group">
              <label> AddUser </label>
              <input type="text" ref="text" value={this.props.text} onChange={this.onChange}
               className="form-control"/>
            </div>
         </form>
      </div>
    );
  },
  onChange: function (e) {
    this.props.changeText(e.target.value);
  },

  onSubmit: function(e){
    e.preventDefault();
    var text = this.refs.text.value.trim();
    if(!text){
      alert('Please enter a user');
      return;
    }

    if(this.props.isEdit) {
      var updatedUser = {
        id:this.props.isEdit,
        text: text
      }

      this.props.onUserUpdate(updatedUser);
    } else {
      this.props.onUserAdd(text);
    }


   this.refs.text.value = '';
}
});



ReactDOM.render(
  <App />,
  document.getElementById('user')
);

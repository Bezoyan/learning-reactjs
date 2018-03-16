var UserRow = React.createClass ({

    render: function () {
    var user = this.props.user;
    var id  = user.id;
    var deleteBtn = "";
    var editBtn = "";


    return (
      <tr>
        <td>{user.name}</td>

        <td className="text-right">
          <div className="btn-group">
            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Action
            <span className="caret"></span></button>
          </div>
        </td>

      </tr>
    );
  }

});

var UserTable = React.createClass({

  render: function() {

     var rows = [];
     this.props.users.map((user) => {
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
                      <button className="btn btn-success btn-xs" >
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

var AddUser = React.createClass ({

   getInitialState: function(){
     return {name: ''};
   },
  render: function () {
    return (
      <div>
         <form onSubmit= {this.onSubmit}>
           <div className = "form-group">
              <lable> Add User </lable>
                <input type="text" ref="name" onChange = {this.onChange} className = "form-control"/>

            </div>
          </form>
       </div>
    );
  },
  onChange: function() {
    console.log('changing text');
  },
  onSubmit: function(e) {
   e.preventDefault();

   var name = this.refs.name.value.trim();
      if (!name) {
        alert('Please enter a name');
        return;
   }

   this.props.onUserAdd(user);
   this.refs.name.value="";


  }
});

var AppTable = React.createClass ({

  render: function () {
  return (
    <div>
      <UserTable users={this.props.users} />
      <AddUser onUserAdd={this.handelUserAdd} />
    </div>
  );
},


  handelUserAdd: function (name) {

     var newUser = {
       id:this.state.users.length + 1,
       name: name

     }
     this.setState({users: this.state.users.concat(newUser)});
  }

});

var users =
[
  {id: 1, name: 'Karen'},
  {id: 2, name: 'Karen'}


];

ReactDOM.render(
  <AppTable users={users} />,
  document.getElementById('user')
);

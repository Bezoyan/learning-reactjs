// User row with name and age
var UserRow = React.createClass ({

    render: function () {
    var user = this.props.user;
    var name = user.Name;
    var id  = user.id;
    var action = user.action
      // <span style={{color: 'blue'}}>
      //   {user.name}
      // </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{user.Age}</td>
      </tr>
    );
  }

});

//Users table outputs users list
var UserTable = React.createClass({

  render: function() {

     var rows = [];
     this.props.data.map((user) => {
       rows.push(
       <UserRow
          user={user}
          key={user.id} />
     );

     });

    return (

    <div className="container">
       <div className = "well">
         <h2> Users list </h2>
         <div className="pull-right">
          <button className="btn btn-success btn-xs">
           <span className= "glyphicon glyphicon-plus">
           </span>
          </button>
         </div>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>
                  <div className="btn-group">
                    <button type="button" className="btn btn-primary">Action</button>
                    <button type="button" className="btn btn-primary dropdown-toggle"
                     data-toggle="dropdown">
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="#">Edit</a></li>
                      <li><a href="#">Delete</a></li>
                    </ul>
                  </div>
                </th>

              </tr>
            </thead>
            <tbody>{rows}</tbody>
         </table>
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
  //submit to server and refresh list
  handelUserSubmit: function (user) {
    var users = this.state.data;
    user.id = Date.now();
    var newUsers = users.concat([user]);
    this.setState({data: newUsers});
    $.ajax ({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: users});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },

      getInitialState: function() {
        return {data: []};

      },
  componentDidMount: function() {
    this.loadUsersFromServer();
    setInterval(this.loadUsersFromServer, this.props.pollInterval);
  },

  render: function () {
  return (
    <div>
      <UserTable data = {this.state.data} />
      <AddUser onUserSubmit = {this.handelUserSubmit} />
    </div>
  );
}

});

//global variable
 var data =[];


 //User adding form
 var AddUser = React.createClass ({
   getInitialState: function(){
     return {Name: '', Age: ''};
   },
   handleNameChange: function(e) {
     this.setState({Name: e.target.value});
   },
   handleAgeChange: function(e) {
     this.setState({Age: e.target.value});
   },

   handleSubmitEvent: function(e) {
     e.preventDefault();
     var Name = this.state.Name.trim();
     var Age = this.state.Age.trim();
     if (!Name || ! Age) {
       return;
     }
     this.props.onUserSubmit({Name:Name, Age:Age})
     this.setState({Name:'', Age: ''});
   },
   render: function () {
     return (
       <form className="addUser" onSubmit={this.handleSubmitEvent}>
          <input
            type = "text"
            placeholder="Your name"
            defaultValue={this.state.Name}
            onChange={this.handleNameChange}
          />
          <input
            type = "number"
            placeholder="Your age"
            defaultValue={this.state.Age}
            onChange={this.handleAgeChange}
          />
          <input type = "submit" value="Create"/>
          <input type = "cancel" value="Cancel"/>
       </form>
     );
   }

 });

//ReactDom render
ReactDOM.render(
  <AppTable  url="data.json" pollInterval={2000}/>,
  document.getElementById('user')
);

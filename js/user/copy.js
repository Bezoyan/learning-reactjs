// User row with name and age
var UserRow = React.createClass ({

    render: function () {
    var user = this.props.user;
    var id  = user.id;
    var editBtn = "";
    var deleteBtn = "";

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td className="text-right">
          <div className="btn-group">
            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Action
            <span className="caret"></span>
            </button>

          </div>
         </td>
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
         <h3> Users list </h3>
         <div className="pull-right">
           <button className="btn btn-success btn-md">
            <span className= "glyphicon glyphicon-plus">
             <b> User</b>
            </span>
           </button>
         </div>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
         </table>
        </div>
      </div>

    );
  }

});


// Application table(main general table)
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
      data: user,
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
    </div>
  );
}

});

//global variables
 var data =[];
 var style = {color: "#ffaaaa"};




//ReactDom render
ReactDOM.render(
  <AppTable  url="/api/data" pollInterval={2000}/>,
  document.getElementById('user')
);

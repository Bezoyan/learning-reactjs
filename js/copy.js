// User row with name and age
var UserRow = React.createClass ({

    render: function () {
    var user = this.props.user;
    var name = user.name;
    var id  = user.id;
    var action = user.action
      // <span style={{color: 'blue'}}>
      //   {user.name}
      // </span>;



    return (
      <tr>
        <td>{name}</td>
        <td>{user.age}</td>
        <td>{user.action}</td>
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


           <button className="btn btn-success btn-md">
            <span className= "glyphicon glyphicon-plus">
             <b>User </b>
           </span>
          </button>
         </div>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>name</th>
                <th>age</th>
                <th>
                   <div className="pull-right">
                     <div className="btn-group">
                      <button type="button" className="btn btn-primary btn-md">Action</button>
                      <button type="button" className="btn btn-primary btn-lg dropdown-toggle"
                       data-toggle="dropdown">
                        <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href="#">Edit</a></li>
                        <li><a href="#">Delete</a></li>
                      </ul>
                    </div>
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
      <AddUser onUserSubmit = {this.handelUserSubmit} />
    </div>
  );
}

});

//global variables
 var data =[];
 var style = {color: "#ffaaaa"};


 //User adding form
 var AddUser = React.createClass ({
   getInitialState: function(){
     return {name: '', age: ''};
   },
   handleNameChange: function(e) {
     this.setState({name: e.target.value});
   },
   handleAgeChange: function(e) {
     this.setState({age: e.target.value});
   },


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

   render: function () {
     return (
         <form onSubmit={this.handleSubmitEvent}
         action="action_page" >
          <div className="container">
            <h3> Add User </h3>
            <p>create an account</p>
            <hr/>
             <div className="form-group">
                 <label htmlFor="name">name </label>
                 <input type="text"
                 className="form-control"
                 placeholder="your name" required
                 value={this.state.name}
                 onChange={this.handleNameChange}
                 />
             </div>
             <div className="form-group">
                 <label htmlFor="age">age </label>
                 <input type="number"
                 className="form-control"
                 placeholder="your age" required
                 value={this.state.age}
                 onChange={this.handleAgeChange}

                 />

             </div>
             <div className="clearfix">
               <button type="button" className="cancelbtn">Cancel</button>
               <button type="submit" classNaame="signupbtn">Create</button>
             </div>
            </div>
           </form>
         )

   }

 });

//ReactDom render
ReactDOM.render(
  <AppTable  url="/api/data" pollInterval={2000}/>,
  document.getElementById('user')
);

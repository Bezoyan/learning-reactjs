


var UserRow = React.createClass ({

    render: function () {
    var user = this.props.user;
    var name = user.Name;
    var id  = user.id;
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

var UserTable = React.createClass({

  render: function() {

     var rows = [];
     this.props.users.forEach((user) => {
       rows.push(
       <UserRow
          user={user}
          key={user.id} />
     );

     });
      //   rows.push(
      //   <UserRow user={users[0]}
      //     key={users[0].id} />
      // );
    return (
      <div className="well">
         <table>
          <thead>
            <tr>
              <th> Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

});



var AppTable = React.createClass ({
  render: function () {
  return (
    <div>
      <UserTable users={this.props.users} />
    </div>
  );
}

});



var users =
[
  {id: 1, Name: 'Karen',Age: 23},
  {id: 2, Name: 'Karen',Age: 23}



];

ReactDOM.render(
  <AppTable users={users} />,
  document.getElementById('user')
);

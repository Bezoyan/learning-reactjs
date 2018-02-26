var style = {color: "#ffaaaa"};
var AddUser = React.createClass({



    handleSubmitEvent: function (event) {
    event.preventDefault();
       var values = {
       name:this.refs.name.value.trim(),
       age: this.refs.age.value.trim()
      };
     this.props.addUsersData (values);
//     localStorage.setItem('Users', JSON.stringify(values));
//
  },


render: function() {

  return (
      <form onSubmit={this.handleSubmitEvent}>
          <div className="form-group">
              <label htmlFor="name">Name <span style={style}>*
              </span></label>
              <input type="text" id="name" className="form-control"
              placeholder="your name" required/>
          </div>
          <div className="form-group">
              <label htmlFor="age">Age <span style={style}>*
              </span></label>
              <input type="text" id="age" className="form-control"
              placeholder="your age" required/>
          </div>
          <div className="btn-group">
              <button type="create" className="btn btn-primary">
              Create</button>
              <button type="reset" className="btn btn-link">
              cancel</button>
          </div>
        </form>
      )

    }// render
  });



ReactDOM.render(
  <AddUser/>,
  document.getElementById('AddUserForm')
    );

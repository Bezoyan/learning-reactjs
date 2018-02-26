var style = {color: "#ffaaaa"};
var AddUsersDataForm = React.createClass({

  getInitialState: function () {
    return {
      data: {}
    };
  },
  updateData: function (newData) {
    this.setState({
      data: newData
    });
  },

  addUsersData: function (item) {
    var data = this.state.data;

    data[item] = item;

    this.updateData(newData);
  },
 render: function () {
    var items = this.state.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Data items={items} />
            <AddUser addUsersData={this.addUsersData} />
          </div>
        </div>
      </div>
    );
  }
});

var Data = React.createClass({

  getDataOfIds: function (items) {
    return Object.keys(items);
  },

  createDataElements: function (items) {
    var item;

    return (
      this
      .getDataOfIds(items)
      .map(function createDataItemElement(itemId) {
        item = items[itemId];
        return (<DataPanel item={item} />);//key={item.id}
      }.bind(this))
      .reverse()
    );
  },
    render: function () {
    var items = this.props.items;
    var dataItemElements = this.createDataElements(items);

    return (
      <div className={dataItemElements.length > 0 ? "":"info"}>
          {dataItemElements.length > 0 ? listItemElements : "nothgin canged"}
      </div>
    );
  }
});





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
    <AddUsersDataForm />,
    document.getElementById('AddUserForm')
  );

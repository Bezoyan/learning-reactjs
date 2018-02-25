var Users = React.createClass({
    render: function () {
        return (
            <div className="users">
                <h3>{this.props.children}</h3><hr />
                <h3>{this.props.choldren}</h3><hr />
            </div>
        );
    }
});

ReactDOM.render(Users, document.getElementById('users'));

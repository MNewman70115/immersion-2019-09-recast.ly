class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchBar(event) {
    this.setState({
      query: event.target.value
    });
    this.handleSearch(event);
  }

  handleSearch(event) {
    // calls search function (from App component) and passes query into it
    // when search btn is clicked

    // search youtube with value inside our search
    this.props.search(this.state.query);
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" val={this.state.query} onChange={this.handleSearchBar} />
        <button className="btn hidden-sm-down" onClick={this.handleSearch} >
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;

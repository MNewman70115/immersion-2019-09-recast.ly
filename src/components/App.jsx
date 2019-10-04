class App extends React.Component {

  // initilize() {
  // this.props.searchYouTube();
  // }

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      video: {}
    };

    this.changeVideo = this.changeVideo.bind(this);
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    var self = this;

    this.props.searchYouTube({}, function (videos) {
      self.setState({
        videos: videos,
        video: videos[0]
      });
    });

  }

  changeVideo(video) {

    this.setState({
      video: video
    });

  }

  search(query) {

    var self = this;

    this.props.searchYouTube({
      query: query
    }, function (videos) {

      self.setState({
        videos: videos
      });

    });

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search search={this.search} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} changeVideo={this.changeVideo} />
          </div>
        </div>
      </div>

    );
  }

}
  // In the ES6 spec, files are "modules" and do not share a top-level scope
  // `var` declarations will only exist globally where explicitly defined
  window.App = App;
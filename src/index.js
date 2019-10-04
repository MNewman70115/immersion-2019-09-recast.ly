// TODO: Render the `App` component to the DOM
// const throttledSearch = _.throttle(searchYouTube, 500);
// ReactDOM.render(<App video={} search={throttledSearch} />, document.getElementById('app'));

ReactDOM.render(<App searchYouTube={searchYouTube} />, document.getElementById('app'));
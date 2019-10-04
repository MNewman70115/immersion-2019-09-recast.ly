describe('App', function() {
  const {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  let app;

  beforeEach(function() {
    app = renderIntoDocument(
      <App searchYouTube={() => {}}/>
    );
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  it('should render a single VideoPlayer component', function() {
    const videoPlayer = findRenderedDOMComponentWithClass(app, 'video-player');
    expect(videoPlayer).to.exist;
  });

  it('should render a single VideoList component', function() {
    const videoList = findRenderedDOMComponentWithClass(app, 'video-list');
    expect(videoList).to.exist;
  });

  it('should update the video player when a video entry\'s title is clicked', function() {
    // This test will only works once `App` is refactored into a stateful class component
    // because `renderIntoDocument` does not work with stateless class components
    expect(React.Component.isPrototypeOf(App)).to.be.true;

    const videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');

    videoEntryTitleElements.forEach((videoEntryTitle) => {
      Simulate.click(videoEntryTitle);
      const player = findRenderedDOMComponentWithClass(app, 'video-player');
      const playerTitle = player.querySelector('.video-player-details h3');

      // This test assumes that if you can successfully update the video player's title,
      // you can also update the video and description
      expect(playerTitle.innerHTML).to.equal(videoEntryTitle.innerHTML);
    });
  });

  describe ('when rendering live data from YouTube', function() {
    let searchYouTubeStub;

    beforeEach(function() {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.yields(window.fakeVideoData);
      app = renderIntoDocument(
        <App searchYouTube={searchYouTubeStub} />
      );
    });

    it('should call `searchYouTube` when app is initialized', function() {
      expect(searchYouTubeStub.called).to.be.true;
    });

    it('should load live data when app is initialized', function() {
      expect(searchYouTubeStub.called).to.be.true;

      const videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');

      videoEntryTitleElements.forEach((videoEntryTitle, i) =>
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title)
      );
    });
  });
});

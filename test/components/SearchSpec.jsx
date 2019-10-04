describe('Search', function() {
  const {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  let app;
  let searchYouTubeStub;

  describe ('when rendering live data from YouTube', function() {
    beforeEach(function() {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.onCall(0).yields(window.fakeVideoData);
      searchYouTubeStub.onCall(1).yields(window.moreFakeVideoData);

      app = renderIntoDocument(
        <App searchYouTube={searchYouTubeStub} />
      );
    });

    it('should load live data when app is initialized', function() {
      const videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });
    });

    it('should update the video list when typing into the input box', function() {
      const videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });

      const searchInputElement = findRenderedDOMComponentWithClass(app, 'form-control');
      Simulate.change(searchInputElement, {target: {value: 'React tutorial'}});

      const newVideoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      newVideoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.innerHTML).to.equal(moreFakeVideoData[i].snippet.title);
      });
    });
  });
});

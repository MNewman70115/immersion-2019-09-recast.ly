// const searchYouTube = (options, callback) => {
//   // TODO
//   var url = 'https://www.googleapis.com/youtube/v3/search';

//   $.ajax({
//     url: url,
//     type: 'GET',
//     data: {
//       part: 'id,snippet',
//       q: options.query,
//       id: options.vidId,
//       maxResults: 5,
//       type: 'video',
//       key: window.YOUTUBE_API_KEY,
//       videoEmbeddable: true,
//     },
//     dataType: 'jsonp',
//     success: function (data) {
//       //console.log('successful fetch from server: ', data);
//       callback(data);
//     },
//     error: function (data) {
//       console.error('failed to send ajax request', data);
//     }
//   });

// };

// var searchYouTube = (options, callback) => {
//   let url = 'https://www.googleapis.com/youtube/v3/search';
//   let hasCallback = typeof callback === 'function';
//   let videos = [];

//   $.get('https://www.googleapis.com/youtube/v3/search',
//     {
//       part: 'snippet',
//       maxResults: options.max,
//       q: options.query,
//       key: options.key,
//       type: 'video',
//     }
//   ).done((data) => { callback(data.items); console.log('I twas successful!'); }).fail(function () { console.log('i failed'); });


// };

const searchYouTube = ({ key, query, max = 5 }, callback) => {
  console.log(key, query);
  $.get('https://www.googleapis.com/youtube/v3/search', {
    part: 'snippet',
    key: key,
    q: query,
    maxResults: max,
    type: 'video',
    videoEmbeddable: 'true'
  })
    .done(({ items }) => {
      if (callback) {
        console.log(items);
        callback(items);
      }
    })
    .fail(({ responseJSON }) => {
      responseJSON.error.errors.forEach((err) =>

        console.error(err)
      );
    });
};

window.searchYouTube = searchYouTube;

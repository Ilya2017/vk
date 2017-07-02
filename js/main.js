//что бы не писать console каждый раз... просто log
window.log = function() {
  try {
    return console.log.apply(console, arguments);
  } catch (_error) {}
};

var controller=new Controller();

$('#set_id_btn').on('click', controller.setId);


$('#create_album_btn').on('click', controller.createAlbum);
$('#set-id-album').on('click', controller.setAlbumId);
$('#analyze_url_btn').on('click', controller.analyzeUrl);
$('#copy_btn').on('click', controller.copyPhotos);

var test=new Test();
$('#test_btn').on('click', test.executeTest);


/*строка для получения access_token
https://oauth.vk.com/authorize?client_id=6046710&display=page&redirect_uri=&scope=friends,photos,wall&response_type=token&v=5.52
*/


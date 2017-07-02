var Model=function() {
    var my_id,
        my_album_id,
        self=this;

    this.setId=function(id) {
        my_id=id;
    }

    this.setDestinationAlbum=function(album_id) {
        my_album_id=album_id;
    }

    this.getAlbum=function() {
        return my_album_id;
    }

    function getUrl(method, params) {
        if (!method) throw new Error("Вы не указали метод");
        var params=params || {};
        params['access_token']='d21b592bd0c517191a5f94d8761bcd6b358258724457c988a6ca2d591412b742888ebf3a7e9dcdb03dff4';
        params['v']='5.64';
        return 'https://api.vk.com/method/'+method+'?'+$.param(params);
    }

    function sendRequest(method, params, callback) {
        return $.ajax({
                type: 'GET',
                url: getUrl(method, params),
                dataType: 'jsonp',
                success: callback
        }); 
    }

    this.createAlbum=function(title) {
       return sendRequest(
            "photos.createAlbum",
            {
                title: title,
                description : 'Test',
                privacy_view : 'nobody / only_me'
            }
        )
    }


    this.copyPhotos=function(owner_id, album_id) {
       getPhotos(owner_id, album_id, getPhotoHandler);
    }

    function getPhotos(owner_id, album_id, success_callback) {
        return sendRequest(
            "photos.get",
            {
                 owner_id: owner_id,
                 album_id: album_id
            },
            success_callback
        )
    }

  /*  function get_photo_callback(data) {
        //запустить с 20 эл-ми 
        //подождать 20 сек и повторить
         getPhotoHandler(data.response);
         

        /*var photos=data.response.items;
        var count=20;
        var position=0;
        while(photos.length!=0) {
            var twentyPhotos=photos.splice(position*count, 20);
            getPhotoHandler(twentyPhotos);
            position++;
            //вот здесь делать паузу в 5 сек.     
            setTimeout("log('Мы ждали 5 секунд, что бы обойти капчу')", 5000);
        }*  /
    };*/

    function getPhotoHandler(data)
    {
        var photos=data.response.items;
        var limit=photos.length-1;
            i=-1;
        log(photos);
  
        timer = setInterval(intervall, 1200);
        function intervall (){
            i++;
            log(i);
            log(photos[i].id);

            copyPhoto(photos[i]);

            if (i==limit) {
                clearInterval(timer);
            };
        }         
    }

    
    function timeout(time){
        var d=$.Deferred();
        setTimeout(function() {
            d.resolve();
        }, time);
        return d.promise();
    }

    function copyPhoto(photo) {
        log("photo in copyPhoto");
        log(photo);
         $.when(copy(photo.owner_id, photo.id))
         .then(function(result) {
            move(result.response);
            return result.response
         })
         .then(function(result){
              var t=timeout(400).done(function(){
                 edit(result, photo.text);
              })
         })
    }

    function copy(owner_id, photo_id) {
        return sendRequest(
            "photos.copy",
            { 
                owner_id: owner_id,
                photo_id: photo_id
            }
        );
    }

    function move(photo_id) {
       log('from move');
       log(my_id);
       log(my_album_id);
       return sendRequest(
            "photos.move", 
            {   
                owner_id: my_id, 
                target_album_id : my_album_id,
                photo_id: photo_id
            }
        ); 
    }

    function edit(photo_id, caption) {
        return sendRequest(
            "photos.edit",
            {
                owner_id: my_id,
                photo_id: photo_id,
                caption: caption
            }
        );
    }

};
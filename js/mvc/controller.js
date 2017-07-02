var Controller=function() {

    var view=new View(),
        model=new Model(),
        source_album_id,
        source_user_id,
        self=this;

    this.setId=function() {
        var id=view.getMyId();
        if(!hasOnlyDigits(id)) return;
        model.setId(id);
        view.showCreateAlbm();
    }

    this.setAlbumId=function() {
        var album_id=view.getDestinationAlbum();
        if(!hasOnlyDigits(album_id)) return;
        model.setDestinationAlbum(album_id);
        view.showCheckUrl();
    }

    this.createAlbum=function() {
        var title=view.getAlbumTitle();
        if (hasOnlySpaces(title)) return;
        
        $.when(model.createAlbum(title))
        .then(
            function(data) {
                if (data.response) {
                    view.setResultOfCreateAlbum('id='+data.response.id); 
                    model.setDestinationAlbum('244293678'); 
                }
                else {
                    view.setResultOfCreateAlbum('error: '+data.error.error_msg);
                }
            }
        )
    }

    function hasOnlySpaces(str) {
        var reg_spaces=/[^\s]+/g;
        if (reg_spaces.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }

    this.analyzeUrl=function() {
        var url=view.getSourceUrl();
        if (hasOnlySpaces(url)) return;
        var id=getIds(url);
        source_user_id=id.source_user;
        source_album_id=id.source_album;
        view.setAnalyzeResult(source_user_id, source_album_id);
    }

    function hasOnlyDigits(id) {
        var only_digits=/^\d+$/g;
        return only_digits.test(id);
    }

    function getIds(url) {
        var obj={};
        var result = url.match(/id(\d+)/);
        obj.source_user=result[1];

        result=url.match(/album\d+_(\d+)/);
        obj.source_album=result[1];
        return obj;
    }

    this.copyPhotos=function() {
        model.copyPhotos(source_user_id, source_album_id);
    }

    this.copy=function(owner_id, photo_id) {
        model.copy(owner_id, photo_id);
    }

    this.checkId=function(){
        var my_id=view.getMyId();
        var album_id=view.getDestinationAlbum();

        if (!hasOnlyDigits(my_id)) {
            view.setCheckResult('В вашем id должны быть только цифры!');
            view.hideCheckUrl();
            return;
        }
        if (!hasOnlyDigits(album_id)) {
            view.setCheckResult('В id альбома должны быть только цифры!');
            view.hideCheckUrl();
            return;
        }
        else {
            model.setId(my_id);
            model.setDestinationAlbum(album_id);
            view.setCheckResult('Отлично, работаем дальше!');
            view.showCheckUrl();
        }

    }

};
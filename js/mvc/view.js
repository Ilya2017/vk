var View=function() {

    this.getAlbumTitle=function() {
        return $('#album_name').val();
    }

    this.setResultOfCreateAlbum=function(response) {
        $('#album_res').text(response);
        $('#my-album').val(response);
    }

    this.getSourceUrl=function() {
        return $('#source_url').val();
    }

    this.setAnalyzeResult=function(user_id, album_id){
        $('#analyze_res').text('Пользователь с которого копируешь ='+user_id
        +' альбом - '+album_id);
        $('#copy_btn').show();
    }
    
    this.getMyId=function(){
        return $('#my-id').val();
    }

    this.getDestinationAlbum=function() {
        return $('#my-album').val();
    }

    this.setCheckResult=function(msg) {
        $('#id_res').text(msg);
    }

    this.hideCheckUrl=function() {
        $('#check-url').hide();
    }

    this.showCheckUrl=function() {
        $('#check-url').show();
    }

    this.showCreateAlbm=function() {
        $('#album').show();
    }
}
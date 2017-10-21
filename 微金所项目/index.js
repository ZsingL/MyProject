/**
 * Created by Zsing on 2017/9/22.
 */
$(function () {
    //changeImageUrl();
    $(window).on("resize",changeImageUrl);
    $(window).trigger('resize');
    function changeImageUrl(){
        var windowWidth = $(window).width();
        $('#wjs_banner .item').each(function(index,value){
            var $item = $(value);
            var imageUrl = $item.data("lg-img");
            $item.css({backgroundImage:'url('+imageUrl+')'})
            if (windowWidth <= 720){
                var imageUrl = $item.data("sm-img");
                console.log(imageUrl);
                var img = '<img src = '+imageUrl+'>';
                $item.empty();
                $item.append(img);
            }else{
                $item.empty();

            }
        });

    }
})
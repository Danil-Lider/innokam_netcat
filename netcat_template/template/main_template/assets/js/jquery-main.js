$(document).ready(function() {

    $(document).on('click', '.item-two .item-btn-bottom', function (e) {
        e.preventDefault()
        $( ".modal-question" ).show();
    })
  
    $(document).on('click', '.detail-link', function (e) {
        e.preventDefault()
        $( ".modal-news" ).show();
    })

    $(document).on('click', '.modal__thanks .modal__btn .btn', function (e) {
        $( ".modal" ).hide();
    })


    $(document).on('click', '.modal__close', function(e){
        var $this = $(this);
        $this.parent().parent().parent().hide();
    })


    $(document).on('click', '.modal', function(e){
    
        var $this = $(this)

        var div = $( ".modal-dialog" );

        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
        $(this).hide(); // скрываем его
        }

        var modal_close = $(this).find('.modal__close');


        modal_close.click(function (e) {

        $this.hide()
        
        })

    })  



$('.form-query').submit(function(e) {

    e.preventDefault(); 
    var $form = $(this);

    console.log(123)

    $.ajax({
        type: $form.attr('method'),
        cache: false,
        dataType: 'json',
        data: $form.serialize(),
        url: '/',
        success: function(msg) {
            // console.log(msg);
            console.log($form.parent())
            $form.parent().hide();
            $form.parent().siblings('.modal__thanks').show();
            // $('.modal-question').show();

        }
    });

});

});
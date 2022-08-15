//  ПОЛУЧАЕМ ВСЕ ЭЛЕМЕНТЫ
let items = document.querySelectorAll('.item-btn-check');

items.forEach(element => {

    element.addEventListener( "click" , function(e){

        items.forEach(el => {console.log(el.classList.remove('active'))});   
        element.classList.add('active')

        var active_id = this.getAttribute('data-block_id')
        var active_block = document.querySelector('.block_id-'+ active_id);

        document.querySelectorAll('.Our-support-methods').forEach(element => { element.style.display = "none";})
        active_block.style.display = "block";

    });
});





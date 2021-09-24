function events() {
   $('.select')
      .unbind('click')
      .on('click', function (e) {
         e.preventDefault();
         let cas = $(this).attr('id');
         let id = cas.substring(2, cas.length);
         selection(id);
      });

   $('.options > .option')
      .unbind('click')
      .on('click', function (e) {
         e.preventDefault();
         let obj = $(this);
         let cas = $(this).parent().attr('id');
         let id = cas.substring(2, cas.length);
         sel_option(id, obj);
      });
}

function selection(id) {
   $(`#S-${id}`).toggleClass('active');
   $(`#O-${id}`).toggleClass('active');
}

function sel_option(id, obj) {
   $(`#S-${id}`).toggleClass('active');
   $(`#O-${id}`).toggleClass('active');
   $(`#S-${id} .select-container`).html(obj.html());
   $(`#I-${id}`).val(obj.attr('data-content'));
}

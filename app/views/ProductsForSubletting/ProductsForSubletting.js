const guid = uuidv4();

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   setDatePicker($('#txtStartDate'));
   setDatePicker($('#txtEndDate'));
}

function setDatePicker(selector) {
   let fecha = moment(Date()).format('DD/MM/YYYY');
   $(selector).daterangepicker({
      singleDatePicker: true,
      autoApply: true,
      locale: {
         format: 'DD/MM/YYYY',
         daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
         monthNames: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
         ],
         firstDay: 1,
      },
      minDate: fecha,
      startDate: fecha,
      opens: 'left',
      drops: 'auto',
   });
}

function uuidv4() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}

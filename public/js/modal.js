$('#nameModal').modal('toggle');

$('#save-btn').on("click", function(e){
    e.preventDefault(); 

    var name = $('#chat-name-input').val() != "" ? $('#chat-name-input').val() : "Anonymous" ;

    $('#name').val(name);
    $('#nameModal').modal('toggle');
});
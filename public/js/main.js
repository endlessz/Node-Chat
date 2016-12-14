$(function(){
	var socket = io.connect();

    //Status
    socket.on('status', function(data){
        $('#status').text(data);
    });

    //Received messages
    socket.on('messages', function(data){
        if(data.length){
            for(var i = data.length - 1; i >= 0 ; --i){
                var list = $(document.createElement('li'));
                list.addClass('left clearfix');

                var header = $(document.createElement('div'));
                header.addClass('header');

                var name = $(document.createElement('strong'));
                name.addClass('primary-font');
                name.text(data[i].name);

                var message = $(document.createElement('p'));
                message.addClass('pull-left');
                message.text(data[i].message);

                header.append(name);
                list.append(header);
                list.append(message);

                $('#chat').append(list);
            }

            scrollDown();
        }
    });

    //Send message
    function sendMessage(){
        socket.emit('input', {
            name: $('#name').val(),
            message: $('#message').val()
        });

        $('#message').val('');
    }

    $('#message').keypress(function(event) {
        if(event.which == 13 && event.shiftKey === false){
            event.preventDefault();

            sendMessage();
        }
    });

    $('#chat-form').submit(function(event){
        event.preventDefault();

        sendMessage();
    })

    function scrollDown() {
        $(".panel-body").animate({ scrollTop: $(document).height() }, "slow");

        return false;
    }
});
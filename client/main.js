const socket = io.connect('yourlocalIP:6677', {'forceNew':true});

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map( (message, index) => {
        return (`
        
        <div class="message">
            <strong> Nickname: ${message.nickname}</strong>        
            <p>${message.text}</p>
        </div>

        `);
    }).join(' ');

    let div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
    

}

function addMessage(e){
    let payload = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', payload);

    return false;
}
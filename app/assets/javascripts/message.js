$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__info">
            <div class="message-list__name">
              ${message.user_name}
            </div>
            <div class="message-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__text">
            ${message.content}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__info">
            <div class="message-list__name">
              ${message.user_name}
            </div>
            <div class="message-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__text">
            ${message.content}
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.new_message')[0].reset();
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('.submit-btn').removeAttr('disabled');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  
});
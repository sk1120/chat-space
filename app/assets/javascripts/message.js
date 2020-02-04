$(function(){
  var buildHTML = function(message){
    if ( message.content && message.image ) {
      var html = `<div class="message-list" data-message-id=` + message.id + `>` +
        `<div class="message-list__info">` +
          `<div class="message-list__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-list__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-list__text">` +
          message.content +
          `<img src="` + message.image + `" class="message-list__text" >` +
        `</div>` +
      `</div>`   
    } else if (message.content) {
      var html = `<div class="message-list" data-message-id=` + message.id + `>` +
        `<div class="message-list__info">` +
          `<div class="message-list__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-list__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-list__text">` +
          message.content +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message-list" data-message-id=` + message.id + `>` +
        `<div class="message-list__info">` +
          `<div class="message-list__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-list__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-list__text">` +
          `<img src="` + message.image + `" class="message-list__text" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

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

  var reloadMessages = function() {
    last_message_id = $('.message-list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message').append(insertHTML);
        $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("メッセージの更新に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
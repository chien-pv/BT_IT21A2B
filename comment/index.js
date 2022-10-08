getData();
function getData() {
    $.ajax({
        url: '/comment',
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var content = '';
            response.forEach(item => {
                content += `<li class="box_result row">
                    <div class="avatar_comment col-md-1">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar" />
                    </div>
                    <div class="result_comment col-md-11">
                        <h4>${item['user_name']}</h4>
                        <p>
                            ${item['comment_content']}</p>
                        <div class="tools_comment">
                            <a class="like" href="#">Like</a>
                            <span aria-hidden="true"> · </span>
                            <a class="replay" href="#">Reply</a>
                            <span aria-hidden="true"> · </span>
                            <i class="fa fa-thumbs-o-up"></i> <span class="count">1</span>
                            <span aria-hidden="true"> · </span>
                            <span>26m</span>
                        </div>
                        <ul class="child_replay"></ul>
                    </div>
                </li>`;
            })
            $("#list_comment").html(content);

        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            alert(err.Message);
        }
    });
}
function getComment(data) {
    console.log(data);
}
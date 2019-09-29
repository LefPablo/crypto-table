var xhr = new XMLHttpRequest();

function table() {
    xhr.open(
        'GET',
        'http://localhost:3012/symbols',
        true
    )

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return
        }
        console.log(xhr.status);
        if (xhr.status === 200) {
            var a = [];
            a = JSON.parse(xhr.response);
            var html = '<table width="97%"><tbody>';
            html += '<thead><tr><th>Name</th><th>Course</th></tr></thead>';
            a.forEach(function (json) {
                html += '<tr>';
                html += '<td>';
                html += json['_id'];
                html += '</td>';
                html += '<td>';
                html += json['last'];
                html += '</td>';
                html += '</tr>';
            });
            html += '</tbody></table>';
            document.getElementById("table").innerHTML = html;
        } else {
            console.log('err', xhr.responseText)
        }
    }
}

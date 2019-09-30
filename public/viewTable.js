function tableUp() {
    const xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'http://localhost:8080/table',
        true
    );

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return
        }
        if (xhr.status === 200) { //get response, table of symbols
            var a = [];
            a = JSON.parse(xhr.response);
            var htmlData = '<table width="97%"><tbody>';
            htmlData += '<thead><tr><th>Name</th><th>Course</th></tr></thead>';
            b = 0;
            a.forEach(function (json) { // create table of symbols and rates
                if (b == 1) {
                    b--;
                } else {
                    b++;
                }
                htmlData += ('<tr ' + 'class="tr' + b + '">');
                htmlData += '<td>';
                htmlData += json['symbol'];
                htmlData += '</td>';
                htmlData += '<td>';
                htmlData += json['last'];
                htmlData += '</td>';
                htmlData += '</tr>';
            });
            htmlData += '</tbody></table>';
            document.getElementById("table").innerHTML = htmlData;
        } else {
            console.log('err', xhr.responseText)
        }
    }
}

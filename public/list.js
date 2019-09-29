function upSelect() {
    var xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'http://localhost:3012/symbols',
        true
    );

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return
        }
        console.log('end');
        if (xhr.status === 200) {
            var a = [];
            a = JSON.parse(xhr.response);
            var htmlData = '<table width="97%"><tbody>';
            htmlData = '';
            a.forEach(function (json) {
                htmlData += '<option>';
                htmlData += json['_id'];
                htmlData += '</option>';
            });
            document.getElementById("selectSymbol").innerHTML = htmlData;
        } else {
            console.log('err', xhr.responseText)
        }
    }
}


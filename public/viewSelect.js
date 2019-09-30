function selectUp() {
    const xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'http://localhost:8080/symbols',
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
            htmlData = '';
            a.forEach(function (json) { //creat list of cryptocurrency symbols
                htmlData += '<option>';
                htmlData += json['symbol'];
                htmlData += '</option>';
            });
            document.getElementById("selectSymbol").innerHTML = htmlData;
        } else {
            console.log('err', xhr.responseText)
        }
    }
}
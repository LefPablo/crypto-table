function createRate() {
    const xhr = new XMLHttpRequest();

    var form = document.forms.form;
    var formData = {
        symbol: form.symbol.value,
        rate: form.rate.value
    }

    var json = JSON.stringify(formData);

    xhr.open(
        "POST",
        'http://localhost:8080/rates',
        true
    );
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return
        }
        if (xhr.status === 200) { //get response
            console.log(xhr.responseText);
        } else {
            console.log('err', xhr.responseText);
        }
    }
}




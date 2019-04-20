$(function () {
    $('input#nameFF, input#contactFF, input#telFF, textarea#projectFF').unbind().blur(function () {
        let id = $(this).attr('id');
        let val = $(this).val();

        switch (id) {
            case 'nameFF':
                (val.length > 2) ? noError(this) : showErrorMsg(this);
                break;

            case 'contactFF':
                const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+$/i;
                (val !== '' && emailPattern.test(val)) ? noError(this) : showErrorMsg(this);
                break;

            case 'telFF':
                const telPattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/;
                (val.length > 2 && val !== '' && telPattern.test(val)) ? noError(this) : showErrorMsg(this);
                break;

            case 'projectFF':
                (val.length < 250) ? noError(this) : showErrorMsg(this);
                break;
        }

        enableButton();

    });

    function enableButton() {
        let emptyField = 0;
        let submitButton = $("button[type=submit]");
        let inputs = $('input:not([type=file])');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                emptyField++;
            }
        }
        (emptyField === 0 && isError === false) ?
            submitButton.removeAttr("disabled") :
            submitButton.attr("disabled", "disabled");
    }

    let isError = true;

    function noError(self) {
        $(self).next('.error-box').text('');
        isError = false;
    }

    function showErrorMsg(self) {
        isError = true;
        let type = $(self).attr('type');
        let error = $(self).next('.error-box')
            .animate({'marginLeft': '3rem'}, 400)
            .animate({'marginLeft': '2.5rem'}, 400);
        (type === 'text') ? error.html("Введіть не менше трьох символів") :
            (type === 'email') ? error.html('Неправильно введений email') :
                (type === 'tel') ? error.html("Введіть номер телефону") :
                    error.html("Помилка, спробуйте ще раз");
    }

    document.getElementById('contact-form').addEventListener('submit', function (evt) {
        const http = new XMLHttpRequest();
        let th = $(this);
        evt.preventDefault();
        if (!isError) {
            http.open("POST", "contact.php", true);
            http.onreadystatechange = function () {
                if (http.readyState === 4 && http.status === 200) {
                    alert(http.responseText);
                    th.trigger("reset");
                }
            };
            http.onerror = function () {
                alert('Помилка, спробуйте ще раз');
            };
            http.send(new FormData(this));
        }
    }, false);

});
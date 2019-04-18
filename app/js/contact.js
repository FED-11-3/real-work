$(function () {
    $('input#nameFF, input#contactFF, input#telFF, textarea#projectFF').unbind().blur(function () {
        let id = $(this).attr('id');
        let val = $(this).val();

        switch (id) {
            case 'nameFF':
                if (val.length > 2) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html("Введіть ім'я не менше двох символів")
                        .css('color', 'red')
                        .animate({'marginLeft': '3rem'}, 400)
                        .animate({'marginLeft': '2.5rem'}, 400);
                }
                break;

            case 'contactFF':
                const rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+$/i;
                if (val !== '' && rv_email.test(val)) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html('Неправильно введений email')
                        .css('color', 'red')
                        .animate({'marginLeft': '3rem'}, 400)
                        .animate({'marginLeft': '2.5rem'}, 400);
                }
                break;

            case 'telFF':
                const rv_tel = /^\d[\d\(\)\ -]{4,14}\d$/;

                if (val.length > 2 && val !== '' && rv_tel.test(val)) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html("Введіть номер телефону")
                        .css('color', 'red')
                        .animate({'marginLeft': '3rem'}, 400)
                        .animate({'marginLeft': '2.5rem'}, 400);
                }
                break;

            case 'projectFF':
                if (val !== '' && val.length < 5000) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html('поле "Повідомлення" не заповнено')
                        .css('color', 'red')
                        .animate({'marginLeft': '3rem'}, 400)
                        .animate({'marginLeft': '2.5rem'}, 400);
                }
                break;
        }
    });

    document.getElementById('contact-form').addEventListener('submit', function (evt) {
        const http = new XMLHttpRequest();
        let th = $(this);
        evt.preventDefault();

        if ($('.not_error').length === 4) {

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
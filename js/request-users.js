'use strict';
function request()
{
    var val = $('.person_name')[0].value;
    if(val)
    {
        var URL = 'https://api.github.com/search/users?q=' + val;
        $.ajax({
            url: URL,
            cache: false,
            contentType: false,
            processData: false,
            type: 'GET',
            success: function (response) {
                    console.log(response);
                    fillTable(response.items);
            },
            error: function (e) {
                console.log(e);
            },
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                return xhr;
            }
        }).done(function (res) {
            $('.hidden-button')[0].style.display = 'inline';
            $('.hidden-button')[0].addEventListener('click', sub_request);
            $('.person_name')[0].value = '';
        });
    }
}

function  fillTable(arr) {
    var size = arr.length > 100?100:arr.length;
    console.log(arr.length);
    var temp, i, j;
    for(i = 0; i<size; i++)
        for(j = i+1; j<size; j++)
            if(arr[i].folowers > arr[j].folowers)
            {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

    for(i = 0; i<size; i++)
        fillSlide(arr[i]);
}

function fillSlide(data)
{
    $('.table-output')[0].innerHTML +=
        '<div class="infobox"><p>Login: '+
        '<a href="https://github.com/'+data.login+'">'+
        data.login+'</a>  ID: '+data.id+'</p></div>';
}

function sub_request()
{
    $.ajax({
        url: 'https://api.github.com/zen',
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET',
        success: function (response) {
            alert(response);
        },
        error: function (e) {
            alert("AN ERROR OCCUREED");
            console.log(e);
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            return xhr;
        }
    });
}
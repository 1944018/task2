var localStorage = window.localStorage;

(function () {
    $('.person-button')[0].addEventListener('click', request);
    google.maps.event.addDomListener(window, 'load', initialize);
    for(var i in localStorage)
    {
       add_item(i);
    }
    addListener("keydown");
    addListener("click");
    $('.button')[1].style.background = "#f00";
    $('.button')[1].addEventListener('click', function () {
        return false;
    });
})();

function initialize() {
    var input = document.getElementById('select-town');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function save_user(obj) {
   var name = obj.login;
   localStorage.setItem(name, JSON.stringify(obj));
   add_item(name);
}

function add_item(i)
{
    var item = JSON.parse(localStorage[i]);
    if(item.login)
    {
        var tech = item.technologies.split(' ');
        var tags = "";
        for(var it in tech)
        {
            if(tech[it]!="")
                tags += '<span class="tag">'+tech[it]+'</span>';
        }
        $('.localdata')[0].innerHTML +=
            '<div class="infobox"><label>Local</label><b>Login: </b>'+item.login+'<b>   Email: </b>'+item.email+
            '<b>   Name: </b>'+item.name+'<b>   Company: </b>'+item.company+
            '<b>   Personal page: </b>'+'<a href="'+item.link+'" >'+item.link+'</a><b>   Adress: </b>'+item.adress+
            '<br><br>'+tags+'<br><br><code>'+localStorage[i]+'</code>'+'</div>'
    }
}

function addListener(ev_name)
{
    $(window).on(ev_name, function (e) {
        if(e.which==13){
            e.preventDefault();
        }
        var obj = {
            'name': $('.name')[0].value,
            'company': $('.company')[0].value,
            'link': $('.page_link')[0].value,
            'login': $('.login')[0].value,
            'email': $('.email')[0].value,
            'degree': $("input[name=degree]:checked").val(),
            'adress': $('.adress')[0].value,
            'technologies': ""
        };
        for(var i = 0; i < $('.input-tag').length; i++)
        {
            var val = $('.input-tag')[i].innerText;
            obj.technologies = obj.technologies + " "+val.substr(0, val.length-1);
        }
        var valid = true;
        for(var item in obj)
        {
            if(obj[item] === ""){
                valid = false;
            }
        }
        const str = obj.email.trim();
        const correct_mail = str.length >= 6
            && str.includes('@')
            && str.includes('.');
        var testLink = new RegExp(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i);
        const correct_link = testLink.test(obj.link);

        if(!correct_mail||!correct_link)
        {
            valid = false;
        }
        if(!valid)
        {
            $('.button')[1].style.background = "#f00";
            $('.button')[1].addEventListener('click', function () {
                return false;
            });
        }
        else
        {
            $('.button')[1].style.background = "#90c843";
            $('.button')[1].addEventListener('click', save_user(obj));
        }
    });
}


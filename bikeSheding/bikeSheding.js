function initHRouter(inst) {
    console.log('hRouter ready');
    hasher.changed.add(inst._onUrlChanged, inst);
    hasher.initialized.add(inst._onUrlChanged, inst);
    hasher.prependHash = '!';
    hasher.init();
}

var viewDir;

function open(ht, id, cb_) {
    console.log(viewDir);
    $.get(viewDir + ht + '.html', function (resp_) {
        console.log(ht);
        $('#' + id).append(resp_);

        if (cb_)
            cb_();
    });
}

function forward(ht, id, cb_) {
    $.get(viewDir + ht + '.html', function (resp_) {
        $('#kontainer').append(resp_);
        var cur = $('#' + id);
        var gid = id + Math.floor(Math.random() * 9999999);
        cur.attr('id', gid);
        if (!cur.attr('id'))
            throw new Error('id not found');
        try  {
            var t = $('header').height();
            var b = $('footer').position().top;
            cur.height(b - t);
            console.log(ht, cur.attr('id'));
        } catch (err) {
            console.log(err);
        }
        if (cb_)
            cb_(gid);
    });
}

function cleanUpViews() {
    var views = $('#kontainer').children();

    while (views.length > 1) {
        var old = views.get(0);
        old.parentNode.removeChild(old);
        views = $('#kontainer').children();
    }
}

function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getGuerryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function loadScript(src, cb) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            if (cb)
                cb();
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parent.insertBefore(s, t);
}
//@ sourceMappingURL=bikeSheding.js.map

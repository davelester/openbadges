(function (a) {
    "use strict";
    var b = '[data-toggle="socialshare"]',
        c = ".socialshare",
        d = '.socialshare.open[data-type="small-bubbles"] .share-options div.fb-like iframe',
        e, f = '<div class="dropdown-toggle" data-toggle="socialshare">    <div class="share-link"><div>        <div class="heart"></div>        <p class="text">Share This</p>        <div class="caret"><div></div></div></div>    </div><div class="clear"></div><div class="share-options">    <ul>        <li><div class="fb-like"></div></li>        <li><div class="g-plusone"></div></li>        <li><a href="https://twitter.com/share" class="twitter-share-button"></a></li>    </ul></div><div id="fb-root"></div>',
        g, h = {
            facebook: {
                id: "facebook-jssdk",
                src: "//connect.facebook.net/en_US/all.js#xfbml=1&appId=255566051148260",
                selector: ".fb-like",
                "small-bubbles": {
                    "data-send": "false",
                    "data-layout": "button_count",
                    "data-width": "105",
                    "data-show-face": "false"
                },
                bubbles: {
                    "data-send": "false",
                    "data-layout": "box_count",
                    "data-width": "12",
                    "data-show-faces": "false"
                },
                small: {
                    "data-send": "false",
                    "data-width": "85",
                    "data-show-face": "false"
                }
            },
            googleplus: {
                id: "gplus-api",
                src: "https://apis.google.com/js/plusone.js",
                selector: ".g-plusone",
                "small-bubbles": {},
                bubbles: {
                    "data-size": "tall"
                },
                small: {
                    "data-size": "small",
                    "data-annotation": "none"
                }
            },
            twitter: {
                id: "twitter-wjs",
                src: "//platform.twitter.com/widgets.js",
                selector: ".twitter-share-button",
                "small-bubbles": {
                    "data-via": "firefox",
                    "data-related": "firefox"
                },
                bubbles: {
                    "data-via": "firefox",
                    "data-count": "vertical",
                    "data-related": "firefox"
                },
                small: {
                    "data-via": "firefox",
                    "data-count": "none",
                    "data-related": "firefox"
                }
            }
        }, i = function () {
            a(b).parent().removeClass("open")
        }, j = function (b) {
            var c = a(b).on("click.dropdown.data-api", this.toggle);
            a("html").on("click.dropdown.data-api", function () {
                c.parent().removeClass("open")
            })
        };
    j.prototype = {
        constructor: j,
        scripts_loaded: !1,
        toggle: function (b) {
            var c = a(this).parent(),
                f = c.hasClass("open");
            return i(), f || c.toggleClass("open"), e = a(d).css("width", h.facebook["small-bubbles"]["data-width"]), j.prototype.load_sharing(), !1
        },
        load_sharing: function () {
            if (!this.scripts_loaded) {
                for (var a in h) this.load_script(h[a].src, h[a].id);
                this.scripts_loaded = !0
            }
        },
        load_script: function (a, b) {
            var c = document.getElementsByTagName("script")[0],
                d = document.getElementById(b);
            d || (d = document.createElement("script"), d.id = b, c.parentNode.insertBefore(d, c)), d.src = a
        }
    }, a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("dropdown");
            d || c.data("dropdown", d = new j(this)), typeof b == "string" && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = j;
    var k = function (a, b) {
        h.twitter["small-bubbles"][a] = b, h.twitter.bubbles[a] = b
    };
    a(function () {
        a("html").on("click.dropdown.data-api", i), a("body").on("click.dropdown.data-api", b, j.prototype.toggle), e = a(c);
        var d = e.attr("data-tweet-at");
        d && k("data-via", d);
        var g = a('meta[property="og:title"]');
        g && k("data-text", g.attr("content"));
        var l = a('meta[property="og:url"]');
        l && k("data-url", l.attr("content")), e.append(f);
        for (var m in h) e.find(h[m].selector).attr(h[m][e.attr("data-type")]);
        a(document).keypress(function (a) {
            a.which === 0 && e.hasClass("open") && i()
        })
    })
})(window.jQuery);

$('.share-badge-on-fb').click(function() {
	var badge_url = document.URL;
	console.log(badge_url);
	
	FB.api(
		'/me/open-badges:award',
		'post',
	{ badge: badge_url },
	function(response) {
		if (!response || response.error) {
			console.log(response.error);
			alert('An error occurred.');
		} else {
			alert('Your badge was shared! You are awesome!! Action ID: ' + response.id);
		}
	});
});

window.fbAsyncInit = function() {
	FB.init({
		appId      : '268806889891263',
		status     : true,
		cookie     : true,
		xfbml      : true 
	});
	
	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;
			$('.share-badge').replaceWith('<p><a href="#" class="share-badge-on-fb">Share on Facebook</a></p>');
	  } else if (response.status === 'not_authorized') {
	  } else {
	  }
	}, true);
};

// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));
$(document).ready(function() {
	hello.on('auth.login', function(auth) {
		hello(auth.network).api('/me').then(function(r) {
	    window.FruumData = window.FruumData || [];
	    window.FruumData.push({
	      user: {
					network: auth.network,
	        id: r.id,
	        username: r.login || r.name,
	        displayname: r.displayName || r.name,
					email: r.email || '',
	        avatar: r.thumbnail
	      }
	    });
			$('#login').fadeOut('fast');
			if (window.Fruum && window.Fruum.launch) {
				window.Fruum.launch();
			}
		});
	});

	hello.init({
		github: (window.location.host == 'fruum.github.io')?'7771e099483aa300bc02':'7d4f94583d9a8f453d59',
		google: '298118064193-lsuue7safe22e0qgjgpv5vvkb8ublc31.apps.googleusercontent.com'
	}, {redirect_uri: '/'});

	$('#login [data-auth]').click(function(event) {
		event.preventDefault();
		hello($(event.target).closest('[data-auth]').data('auth')).login({ scope: 'email' });
	});
	$('#login .popup-close').click(function(event) {
		event.preventDefault();
		$('#login').fadeOut('fast');
	});
});

function login() {
	$('#login').fadeIn('fast');
}

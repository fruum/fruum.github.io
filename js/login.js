$(document).ready(function() {
  hello.on('auth.login', function(auth) {
    $('#login').fadeOut('fast');
    window.FruumData = window.FruumData || [];
    //get basic info
    hello(auth.network).api('/me').then(function(r) {
      var user_payload = {
        network: auth.network,
        id: r.id,
        username: r.login || r.name,
        displayname: r.displayName || r.name,
        email: r.email || '',
        avatar: r.thumbnail
      }
      if (!r.email && auth.network === 'github') {
        //try to get email
        hello(auth.network).api('/user/emails').then(function(r2) {
          if (r2 && r2.data && r2.data.length) {
            _.each(r2.data, function(entry) {
              if (entry.email && entry.primary) {
                user_payload.email = entry.email;
              }
            });
          }
          window.FruumData.push({ user: user_payload });
          if (window.Fruum && window.Fruum.launch) window.Fruum.launch();
        });
      }
      else {
        window.FruumData.push({ user: user_payload });
        if (window.Fruum && window.Fruum.launch) window.Fruum.launch();
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

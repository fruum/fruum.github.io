

hello.on('auth.login', function(auth) {
	hello(auth.network).api('/me').then(function(r) {
    window.FruumData = window.FruumData || [];
    window.FruumData.push({
      user: {
        id: r.id,
        username: r.login,
        displayname: r.name,
        avatar: r.avatar_url
      }
    });
	});
});

hello.init({
	github: (window.location.host == 'fruum.github.io')?'7771e099483aa300bc02':'7d4f94583d9a8f453d59'
}, {redirect_uri: '/'});

function login() {
  hello('github').login();
}

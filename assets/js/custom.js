window.fbAsyncInit = function() {
 FB.init({ appId: "1926787667543799", cookie: true, version: "v2.2" }); // This is important, it's not enabled by default
};

function call() {
    FB.login(function(response) {
       if (response.status === "connected") {
         FB.getLoginStatus(function(response) {
         	console.log('Facebook response:', response);
         	const access_token = response.authResponse.access_token;
         	const wallPost = {
         		url: 'https://dashboard.info-shermandodge.com/img/donation_thankyou.png',
         		access_token: access_token,
         		message: 'Hi there, you are in right place!'
         	};

         	$.ajax({
         		type: 'post',
         		url: 'https://graph.facebook.com/1926787667543799/photos?access_token=' + access_token,
         		data: wallPost,
         		success: function(data) {
         			console.log(data)
         		}
         	});

     	    FB.api('/albert.keith.5832/photos', 'post', wallPost, function(response) {
                if (!response || response.error) {
                	console.log('failed to post', response)
                } else {
                	console.log("Success, please check it");
                	console.log(response);
                }
            })
			// FB.api("/me?fields=id,name,email,picture", function(user) {
			// 	console.log("user information:" , user);
			// });
         });
       } else {
         console.log("User cancelled login or did not fully authorize.");
       }
 	}, { scope: "public_profile, email" });
}


(function(d, s, id) {
     var js,
       fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {
       return;
     }
     js = d.createElement(s);
     js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   })(document, "script", "facebook-jssdk");
window.fbAsyncInit = function() {
 FB.init({ appId: "1926787667543799", cookie: true, version: "v2.2" }); // This is important, it's not enabled by default
};

function call() {
    FB.login(function(response) {
       if (response.status === "connected") {
         FB.getLoginStatus(function(response) {
           FB.api("/me?fields=id,name,email,picture", function(user) {
             user["photoURL"] = user.picture.data.url;
             delete user.picture;
             $.ajax({
               type: "post",
               url: "/user/facebooksignup",
               dataType: "JSON",
               data: user,
               success: function(res) {}
             });
           });
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
var mFirestore = firebase.firestore();
var desktop;

checkScreenSize();

var url_string = window.location.href;
var url = new URL(url_string);
var mode = url.searchParams.get("mode");
var verifyCode = url.searchParams.get("verifyCode");
var uid = url.searchParams.get("uid");

mFirestore.collection("emailManager").doc(uid)
			.get().then(function(doc) {
			    if (doc.exists) {
		  			var emailManager = doc.data();
		  			if (emailManager.verifyCode === verifyCode) {

						mFirestore.collection("usersData").doc(emailManager.userId).update( {
							accountVerifiedEmail: true
						});

						mFirestore.collection("emailManager").doc(emailManager.userId).delete();


						setTimeout(
						  () => {
						  		if (!desktop) {
									window.open("https://zeoflow.github.io/m/login?emailVerified=" + emailManager.email, "_top");
						  		}

						  },
						  3 * 1000
						);

				  	} else if (emailManager.verifyCode !== verifyCode) {
				  		if (!desktop) {
				  			window.open("https://zeoflow.github.io/m/login?emailVerified=" + emailManager.email, "_top");
				  		}
		  			}
			    } else {
			    	if (!desktop) {
			    		window.open("https://zeoflow.github.io/m/login", "_top");
			    	}
			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});

function onResize() {

	checkScreenSize();

}

function checkScreenSize() {

	if (window.screen.width <= 600) {
		desktop = false;
	} else {
		desktop = true;
	}

}

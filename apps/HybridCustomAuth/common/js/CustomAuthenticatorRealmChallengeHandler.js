/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/
var customAuthenticatorRealmChallengeHandler = WL.Client.createChallengeHandler("CustomAuthenticatorRealm");

customAuthenticatorRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON) {
        return false;
    }
    
    if (response.responseJSON.authStatus) 
    	return true;
    else 
    	return false;
};

customAuthenticatorRealmChallengeHandler.handleChallenge = function(response){
	var authStatus = response.responseJSON.authStatus;
	
	if (authStatus == "required"){
		$('#AppDiv').hide();
		$('#AuthDiv').show();
		$("#AuthInfo").empty();
		$('#AuthPassword').val('');
        if (response.responseJSON.errorMessage){
        	$("#AuthInfo").html(response.responseJSON.errorMessage);
        }
	} else if (authStatus == "complete"){
		$('#AppDiv').show();
		$('#AuthDiv').hide();
		customAuthenticatorRealmChallengeHandler.submitSuccess();
	}
};

customAuthenticatorRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = customAuthenticatorRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	customAuthenticatorRealmChallengeHandler.handleChallenge(response);
    } 
};

$('#AuthSubmitButton').bind('click', function () {
    var reqURL = '/my_custom_auth_request_url';
    var options = {};
    options.parameters = {
        username : $('#AuthUsername').val(),
        password : $('#AuthPassword').val()
    };
    options.headers = {};
    customAuthenticatorRealmChallengeHandler.submitLoginForm(reqURL, options, customAuthenticatorRealmChallengeHandler.submitLoginFormCallback);
});

$('#AuthCancelButton').bind('click', function () {
	$('#AppDiv').show();
	$('#AuthDiv').hide();
	customAuthenticatorRealmChallengeHandler.submitFailure();
});



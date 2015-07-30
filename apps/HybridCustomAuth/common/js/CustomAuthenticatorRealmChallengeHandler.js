/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
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



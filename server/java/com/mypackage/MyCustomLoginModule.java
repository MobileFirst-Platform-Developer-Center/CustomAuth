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

package com.mypackage;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.worklight.server.auth.api.MissingConfigurationOptionException;
import com.worklight.server.auth.api.UserIdentity;
import com.worklight.server.auth.api.WorkLightAuthLoginModule;

public class MyCustomLoginModule implements WorkLightAuthLoginModule {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4094493300577236864L;
	private String USERNAME;
	private String PASSWORD;
	
	public void init(Map<String, String> options) throws MissingConfigurationOptionException {
	}

	public boolean login(Map<String, Object> authenticationData) {
		USERNAME = (String) authenticationData.get("username");
		PASSWORD = (String) authenticationData.get("password");

		if (USERNAME.equals("user") && PASSWORD.equals("password")) 
			return true;
		else 
			throw new RuntimeException("Invalid credentials");
	}

	
	public UserIdentity createIdentity(String loginModule) {
		HashMap<String, Object> customAttributes = new HashMap<String, Object>();
		customAttributes.put("AuthenticationDate", new Date());
		
		UserIdentity identity = new UserIdentity(loginModule, USERNAME, null, null, customAttributes, PASSWORD);
		return identity;
	}
	


	public void logout() {
		USERNAME = null;
		PASSWORD = null;
	}

	public void abort() {
		USERNAME = null;
		PASSWORD = null;
	}

	@Override
    public MyCustomLoginModule clone() throws CloneNotSupportedException {
        return (MyCustomLoginModule) super.clone();
    }

}

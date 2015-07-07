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

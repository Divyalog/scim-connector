const express = require('express');

const app = express();

app.use(express.json());

//  https://scim-connector.herokuapp.com/test

app.post('/scim/v2/Users', (request, response) => {
    
    const getUserSuccess = {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "Resources": []
    };
      const createUserSuccess = {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
        "userName": "test.user@okta.local",
        "name": {
            "givenName": "Test",
            "familyName": "User"
        },
        "emails": [{
            "primary": true,
            "value": "test.user@okta.local",
            "type": "work"
        }],
        "displayName": "Test User",
        "locale": "en-US",
        "externalId": "00ujl29u0le5T6Aj10h7",
        "active": true,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    };
      console.log('Entering method post method');
      const payload=request.body
      const username = payload.userName;
      if(username !== "")
      {
        console.log("SUCCESS")
        response.send(getUserSuccess);
      }
      else{
      console.log("FAILURE")
      response.send(createUserSuccess);
      }
});

app.get('/', (req, res) => {
    response = {
        "name": "Divya",
        "role": "developer"
    }
    console.log(response);
    res.send(response);
});

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));
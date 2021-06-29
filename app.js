const express = require('express');

const app = express();

app.use(express.json());
   
    const getUserFailure = {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
        "detail": "User not found",
        "status": 404
    };

    const getUserSuccess = {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "Resources": [{
            "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
            "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
            "userName": "test.user@okta.local",
            "name": {
                "givenName": "Test",
                "middleName": "",
                "familyName": "User"
            },
            "active": true,
            "emails": [{
                "primary": true,
                "value": "test.user@okta.local",
                "type": "work",
                "display": "test.user@okta.local"
            }],
            "groups": [],
            "meta": {
                "resourceType": "User"
            }
        }]
    };

    const getGroupSuccess = {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
        "displayName": "Test SCIMv2",
        "members":  [{
            "value": "b1c794f24f4c49f4b5d503a4cb2686ea",
            "display": "SCIM 2 Group A"
        }],
        "meta": {
            "resourceType": "Group"
        }
    };

      const updateUserSuccess = {
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Another",
        "middleName": "Excited",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
};

app.get('/scim/v2/Users/:userId', (request, response)=> {
    const userId = request.params.userId;
    if(userId !== ' ')
    {
        console.log('success');
        response.send(getUserSuccess);
    }else{
        console.log('failure');
        response.send(getUserFailure);
    }
});

app.get('/scim/v2/Groups', (request, response)=> {
        console.log('success');
        response.send(getGroupSuccess);
});

app.put('/scim/v2/Users/:userId', (request, response) => {
      console.log('Entering method post method');
      const payload = request.body
      const username = payload.userName;
      if(username !== '')
      {
        console.log('SUCCESS')
        response.send({ getUserSuccess, updateUserSuccess });
      }
      else{
      console.log('FAILURE')
      response.send(getUserFailure);
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
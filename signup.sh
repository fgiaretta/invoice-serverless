#!/bin/bash

# Set the endpoint URL
ENDPOINT_URL="https://la1j3jdzu1.execute-api.us-east-1.amazonaws.com/dev/user"

# Set email and password variables
EMAIL="fgiaretta42@gmail.com"
PASSWORD="paSsword123#"
CODE="875202"

# Signup
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" $ENDPOINT_URL/signup

# Login
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" $ENDPOINT_URL/login

# Confirm
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"code\":\"$CODE\"}" $ENDPOINT_URL/confirm

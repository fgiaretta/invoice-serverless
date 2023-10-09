#!/bin/bash

# Set the endpoint URL
ENDPOINT_URL="https://la1j3jdzu1.execute-api.us-east-1.amazonaws.com/dev/user/signup"

EMAIL="fgiaretta42@gmail.com"
PASSWORD="password123"

curl -X POST \
    -H "Content-Type: application/json" \
    -d "{"email":"$EMAIL","password":"$PASSWORD"}" \
    $ENDPOINT_URL

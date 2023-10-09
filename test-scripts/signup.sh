#!/bin/bash

# This script signs up a user by sending a POST request to the API_BASE_URL/user/signup endpoint.
# The user's email and password are passed as arguments.
# Usage: ./signup.sh API_BASE_URL EMAIL PASSWORD

# Get the API_BASE_URL, EMAIL, and PASSWORD from the arguments
API_BASE_URL="$1"
EMAIL="$2"
PASSWORD="$3"

# Check if the arguments are set
if [[ -z "$API_BASE_URL" || -z "$EMAIL" || -z "$PASSWORD" ]]; then
    echo "API_BASE_URL, EMAIL, and PASSWORD must be set"
    exit 1
fi

signup() {
    local email="$1"
    local password="$2"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$email\",\"password\":\"$password\"}" "$API_BASE_URL/user/signup")
    echo "$response"
}
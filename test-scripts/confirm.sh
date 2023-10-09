#!/bin/bash

# Set email and password variables
API_BASE_URL="$1"
EMAIL="$2"
CODE="$3"

if [ -z "$API_BASE_URL" ] || [ -z "$EMAIL" ] || [ -z "$CODE" ]; then
    echo "Missing arguments. Usage: ./confirm.sh API_BASE_URL EMAIL CODE"
    exit 1
fi

confirm() {
    local email="$1"
    local code="$2"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$email\",\"code\":\"$code\"}" "$API_BASE_URL/user/confirm")
    echo "$response"
}

confirm "$EMAIL" "$CODE"

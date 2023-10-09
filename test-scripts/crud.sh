#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: $0 <api_base_url> <email> <password>"
    exit 1
fi

API_BASE_URL="$1"
EMAIL="$2"
PASSWORD="$3"

login() {
    local email="$1"
    local password="$2"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"email\":\"$email\",\"password\":\"$password\"}" "$API_BASE_URL/user/login")
    echo "$response"
}

create_invoice() {
    local data="$1"
    local token="$2"
    response=$(curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$data" "$API_BASE_URL/invoices")
    echo "$response"
}

list_invoices() {
    local token="$1"
    response=$(curl -s -X GET -H "Authorization: Bearer $token" "$API_BASE_URL/invoices")
    echo "$response"
}

get_invoice() {
    local id="$1"
    local token="$2"
    response=$(curl -s -X GET -H "Authorization: Bearer $token" "$API_BASE_URL/invoices/$id")
    echo "$response"
}

update_invoice() {
    local id="$1"
    local token="$2"
    local data="$3"
    response=$(curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$data" "$API_BASE_URL/invoices/$id")
    echo "$response"
}

delete_invoice() {
    local id="$1"
    local token="$2"
    response=$(curl -s -X DELETE -H "Authorization: Bearer $token" "$API_BASE_URL/invoices/$id")
    echo "$response"
}

# Log in user
response=$(login "$EMAIL" "$PASSWORD")
token=$(echo "$response" | jq -r '.token')

# Create mock invoice
mock_invoice='{
    "invoiceNumber": "INV-2023-002",
    "client": {
        "name": "John Doe",
        "phone": "+1234567890",
        "email": "johndoe@example.com"
    },
    "items": [
        {
            "value": 100.00,
            "description": "Product A",
            "time": "2023-10-08T12:00:00Z"
        },
        {
            "value": 75.50,
            "description": "Product B",
            "time": "2023-10-08T13:30:00Z"
        }
    ],
    "dueDate": "2023-11-01",
    "status": "pending"
}'

# Create invoice
create_response=$(create_invoice "$mock_invoice" "$token")
echo -e "\n\n\n***************************************\n"
echo -e "*** Creating new invoice ***\n"
echo "$create_response" | jq

# List invoices
list_response=$(list_invoices "$token")
first_id=$(echo "$list_response" | jq -r '.[0].id')
count=$(echo "$list_response" | jq length)
echo -e "\n\n\n***************************************\n"
echo -e "*** Number of items in list: $count ***"

# Get invoice
echo -e "\n***************************************\n"
echo -e "*** Getting invoice with ID: $first_id *** \n"
get_invoice "$first_id" "$token" | jq

# Update invoice
echo -e "\n\n\n***************************************\n"
echo -e "*** Updating invoice with ID: $first_id *** \n"
update_invoice "$first_id" "$token" '{
    "status": "paid",
    "dueDate": "2023-12-31"
}' | jq

# Get updated invoice
echo -e "\n\n\n***************************************\n"
echo -e "*** Getting updated invoice with ID: $first_id ***\n"
get_invoice "$first_id" "$token" | jq

# Delete invoice
echo -e "\n\n\n***************************************\n"
echo -e "*** Deleting invoice with ID: $first_id ***\n"
delete_invoice "$first_id" "$token" | jq
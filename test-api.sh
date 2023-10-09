#!/bin/bash


# API_BASE_URL="http://localhost:3000/dev/"
API_BASE_URL="https://la1j3jdzu1.execute-api.us-east-1.amazonaws.com/dev"

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

# Function to create a new invoice
create_invoice() {
    local data="$1"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$API_BASE_URL/invoices")
    echo "$response"
}

# Function to list all invoices
list_invoices() {
    response=$(curl -s -X GET "$API_BASE_URL/invoices")
    echo "$response"
}

# Function to get an invoice by ID
get_invoice() {
    local id="$1"
    response=$(curl -s -X GET "$API_BASE_URL/invoices/$id")
    echo "$response"
}

# Function to update an invoice by ID
update_invoice() {
    local id="$1"
    local data="$2"
    response=$(curl -s -X PUT -H "Content-Type: application/json" -d "$data" "$API_BASE_URL/invoices/$id")
    echo "$response"
}

# Function to delete an invoice by ID
delete_invoice() {
    local id="$1"
    response=$(curl -s -X DELETE "$API_BASE_URL/invoices/$id")
    echo "$response"
}

echo -e "\n\n\n***************************************\n"
echo -e "*** Creating new invoice ***\n"
create_response=$(create_invoice "$mock_invoice")
echo "$create_response" | jq

list_response=$(list_invoices)
first_id=$(echo "$list_response" | jq -r '.[0].id')
count=$(echo "$list_response" | jq length)

echo -e "\n\n\n***************************************\n"
echo -e "*** Number of items in list: $count ***"

echo -e "\n***************************************\n"
echo -e "*** Getting invoice with ID: $first_id *** \n"
get_invoice "$first_id" | jq

echo -e "\n\n\n***************************************\n"
echo -e "*** Updating invoice with ID: $first_id *** \n"
update_invoice "$first_id" '{
    "status": "paid",
    "dueDate": "2023-12-31"
}' | jq

echo -e "\n\n\n***************************************\n"
echo -e "*** Getting updated invoice with ID: $first_id ***\n"
get_invoice "$first_id" | jq

echo -e "\n\n\n***************************************\n"
echo -e "*** Deleting invoice with ID: $first_id ***\n"
delete_invoice "$first_id" | jq
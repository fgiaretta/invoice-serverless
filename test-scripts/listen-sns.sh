#!/bin/bash

# Set the topic ARN
topic_arn="arn:aws:sns:us-east-1:759718024884:sns-topic-notify-users-invoices"
email="fgiaretta42@gmail.com"

aws sns subscribe --topic-arn $topic_arn --protocol email --notification-endpoint $email
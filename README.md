# Invoice Serverless

This project creates a serverless invoicing system for a small business. The system allows users to perform CRUD (Create, Read, Update, Delete) operations on invoices. It utilizes AWS services and is deployed using the Serverless Framework.

## Prerequisites

Before you start using this project, you should have the following set up:

- [Node.js](https://nodejs.org/) installed on your machine.
- [AWS CLI](https://aws.amazon.com/cli/) configured with your AWS credentials.
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed.

## Installation and Development

Follow these steps to set up and use the project:

1. Clone this repository:

  ```bash
  git clone https://github.com/fgiaretta/invoice-serverless.git
  ```

2. Navigate to the project directory:

  ```bash
  cd invoice-serverless
  ```

3. Install dependencies:

  ```bash
  npm install
  ```

4. Deploy the project to your AWS account:

  ```bash
  serverless deploy
  ```

  If you use AWS profiles, add the `--aws-profile $profile_name` flag to the `serverless deploy` command.

## Usage

Once the project is deployed, you can perform CRUD operations on invoices using the API endpoints provided by the project. You can find the API endpoint URLs in the output of the `serverless deploy` command.
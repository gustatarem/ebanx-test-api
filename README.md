# EBANX Software Engineer Take Home Assignment

This project implements a simple API as a response for the EBANX take-home assignment for the Software Engineering role. The API consists of three endpoints to check balance, post events and reset state.

> **Note**: This API is designed to handle requests in a temporary, stateless manner.

## Features

- **GET /balance**: Retrieve the current balance from an existing account.
- **POST /event**: Post an event that affects the balance (depositing, withdrawing and transfering).

## Requirements

- Programming language and technologies of choice (Typescript, Node, Fastify and Jest)

## Project Structure

- **No persistence**: No database is required; data is handled in-memory.
- **Endpoints**: `GET /balance`, `POST /event` and `POST /reset`.
- **Automated Testing**: Jest is used for automated testing.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gustatarem/ebanx-test-api.git
   cd ebanx-test-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Running the API

1. **Run Locally**

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`.

## Endpoints

### 1. **GET /balance?accountId=1**

- **Description**: Returns the current balance.
- **Example**:
  ```http
  GET /balance
  ```
- **Response**:
  ```json
  90
  ```

### 2. **POST /event**

- **Description**: Posts an event to add or subtract funds.
- **Example**:
  ```http
  POST /event
  ```
- **Request Body**:
  ```json
  {
    "type": "deposit",
    "destination": "1",
    "amount": 100
  }
  ```
- **Response**:

  ```json
  {
    "destination": {
      "id": "1",
      "balance": 100
    }
  }
  ```

  ### 3. **POST /reset**

  - **Description**: Reset the temporary memory.

## Testing Locally

1. **Run tests**

   ```bash
   npm test
   ```

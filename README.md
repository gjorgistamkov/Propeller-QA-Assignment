# Propeller API Assignment

This repository contains automated test cases for the Propeller GraphQL API (https://graphqlzero.almansi.me/api) implemented using Cypress.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Setup Instructions](#setup-instructions)  
- [Running the Tests](#running-the-tests)  
- [Folder Structure](#folder-structure)  
- [Custom Commands & Helpers](#custom-commands--helpers)  
- [Test Coverage](#test-coverage) 

---

## Project Overview

This project implements end-to-end testing for a public GraphQL API (`https://graphqlzero.almansi.me/api`) using Cypress. It covers:

- User queries and mutations  
- Album queries and mutations  
- Error handling and validation  

---

## Setup Instructions

To run these tests on your local machine, follow the steps below:

### Prerequisites

- [Node.js (v14 or higher)](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js) package manager  
- GraphQL API endpoint  

### Installation

1. **Clone this repository**

```

git clone <repository-url>
cd <repository-folder>

```


2. **Install dependencies**

Using npm:

```

npm install

```


3. **Verify Cypress is installed**

You should have Cypress installed as a dev dependency. To open Cypress test runner:

```

npx cypress open

```

---

## Running the Tests

### Through Cypress Test Runner (Interactive Mode)

Run the following command to open the Cypress UI:


```

npx cypress open

```


Then, select the test files from the UI and run them interactively in your browser.

---

### Headless Mode (CI/CD or terminal)

Run all tests in headless mode with this command:

```

npx cypress run

```


This will execute all test suites and output the results in the terminal.

### Test API

Run this command


```

npm run test:api

```


---

## Folder Structure

- `cypress/e2e/` — Cypress test specification files, categorized by features (Users, Albums, Errors)  
- `cypress/support/` — Custom commands, helper functions, and utilities  
- `cypress.config.js` — Cypress configuration file  
- `package.json` — Project dependencies and scripts  

---

## Custom Commands & Helpers

### Custom GraphQL Command

A custom `cy.graphql` command is defined to streamline sending GraphQL queries and mutations, handling headers, and error flagging consistently.

### Helpers

Reusable validation helpers are provided for:

- `validateUser` / `validateUsers` — Validates user objects and arrays 
- `validateAlbum` / `validateAlbums` — Validates album objects and collections

These helpers can be parameterized to support different validation rules and are used extensively across test cases to ensure modular and maintainable code.

---

## Test Coverage

The tests cover the following aspects of the API:

- **Queries**  
- **Mutations**   
- **Errors**  


---

> **Created and maintained by [Gjorgi Stamkov](https://github.com/gjorgistamkov).**


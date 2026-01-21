# Foreca_POM_Playwright

[![Playwright Logo](https://img.shields.io/badge/Playwright-v1.57-brightgreen?logo=playwright&style=for-the-badge)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.11-green?logo=node.js&style=for-the-badge)](https://nodejs.org/)
[![Test Status](https://img.shields.io/badge/Status-Smoke%20Tests-yellow?style=for-the-badge)](https://foreca.com/)

## Project Overview

This project is an automated **Smoke Test** suite for the **[Foreca.com](https://foreca.com/)** website.

It is built using the **Playwright** library for robust end-to-end testing and implements the **Page Object Model (POM)** design pattern for better code organization, reusability, and maintainability. All code is written in **TypeScript**.

---

## Technology Stack

* **Playwright** - The core framework for browser automation.
* **TypeScript** - Used to provide static typing and enhance code quality.
* **Node.js & npm** - The runtime environment and package manager.
* **Page Object Model (POM)** - The architectural pattern used to separate test logic from page logic.

---

## Prerequisites

Before running the project, please ensure you have the following installed:

* **Node.js** (version 16 or newer recommended)
* **npm** (comes bundled with Node.js)
* **Git**

---

## Installation and Execution

Follow these steps to set up and run the tests on your local machine.

### 1. Clone the Repository

```bash
git clone [https://github.com/ivan-milutinovic/Foreca_POM_Playwright.git](https://github.com/ivan-milutinovic/Foreca_POM_Playwright.git)
cd Foreca_POM_Playwright


2. Install Dependencies
Install all necessary Node.js packages and the required Playwright browser drivers:

Bash
npm install
npx playwright install

3. Running Tests
Tests can be executed using the Playwright Command Line Interface (CLI).

Run all tests (across all configured browsers):
Bash
npx playwright test

Run tests on a specific browser (e.g., Chromium):
Bash
npx playwright test --project=chromium

Run tests in UI mode (interactive debugging):
Bash
npx playwright test --ui

4. Viewing the Test Report
After execution, you can view the detailed HTML report by running:
Bash
npx playwright show-report

Project Structure
The project follows a standard Playwright structure with the Page Object Model implemented:

.
├── .github/workflows/    # CI/CD configuration (e.g., GitHub Actions setup)
├── data/                 # Data files (e.g., JSON) used by tests
├── fixtures/             # Custom Playwright fixtures
├── pages/                # Implementation of the Page Object Model classes
├── tests/                # Main test files (using the POM classes)
├── utils/                # Helper functions and utilities
├── playwright.config.ts  # Main Playwright configuration file
└── package.json          # Project dependencies

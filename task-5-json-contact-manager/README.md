# ContactFlow — JSON Contact-List Application

A responsive, accessible contact manager built with **HTML5, CSS, and vanilla JavaScript**. It demonstrates JSON parsing, dynamic DOM construction, form validation, adding contacts, case-insensitive removal by name, filtering, and safe output through `textContent`.

## Features

- Three initial contacts stored as valid JSON text
- `JSON.parse()` conversion to a JavaScript array
- Dynamic table rendering through `renderContacts()`
- Add-contact form with required fields and email constraint validation
- Case-insensitive removal by exact name
- Clear success/error messages with an ARIA live region
- Safe DOM creation without injecting user-controlled HTML
- Responsive design, subtle animations, and reduced-motion support
- No libraries, server, database, or build process

## Run locally

1. Download or clone the repository.
2. Open `index.html` directly in a modern browser.
3. Add a contact, remove a contact by name, and reload the page to observe that the in-memory data resets.

A local development server may also be used, for example with VS Code Live Server.

## Project structure

```text
json-contact-list-app/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Academic demonstration note

The application intentionally stores contacts only in a JavaScript array. Production persistence would require a trusted back end or another deliberate storage mechanism, accompanied by server-side validation, authentication, authorization, and appropriate data-protection controls.

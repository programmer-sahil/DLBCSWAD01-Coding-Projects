"use strict";

// The application begins with valid JSON text containing three sample contacts.
const initialContactsJSON = `[
  {"name":"Aisha Rahman","email":"aisha.rahman@example.com","phoneNumber":"+91 98765 43210"},
  {"name":"Daniel Weber","email":"daniel.weber@example.com","phoneNumber":"+49 151 23456789"},
  {"name":"Meera Sen","email":"meera.sen@example.com","phoneNumber":"+91 98310 24680"}
]`;

// JSON.parse() converts the JSON text into a mutable JavaScript array of objects.
let contacts = JSON.parse(initialContactsJSON);

const addForm = document.querySelector("#add-contact-form");
const removeForm = document.querySelector("#remove-contact-form");
const tableBody = document.querySelector("#contact-table-body");
const contactCount = document.querySelector("#contact-count");
const emptyState = document.querySelector("#empty-state");
const statusMessage = document.querySelector("#status-message");
const searchInput = document.querySelector("#search");

/**
 * Creates a table cell safely. textContent prevents contact values from being
 * interpreted as HTML, which is safer than interpolating user input with innerHTML.
 */
function createCell(value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  return cell;
}

/** Renders the current contact array, optionally filtered by a search term. */
function renderContacts(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery)
    )
  );

  const fragment = document.createDocumentFragment();
  visibleContacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    row.style.animationDelay = `${index * 45}ms`;
    row.append(
      createCell(contact.name),
      createCell(contact.email),
      createCell(contact.phoneNumber)
    );
    fragment.append(row);
  });

  tableBody.replaceChildren(fragment);
  contactCount.textContent = String(contacts.length);
  emptyState.hidden = visibleContacts.length !== 0;
}

/** Displays a concise, accessible success or validation message. */
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status status--${type} is-visible`;
}

/** Marks an input as invalid and lets the browser display its validation text. */
function invalidate(input, message) {
  input.setCustomValidity(message);
  input.setAttribute("aria-invalid", "true");
  input.reportValidity();
}

/** Clears custom validity as soon as the user corrects a field. */
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.setCustomValidity("");
    input.removeAttribute("aria-invalid");
  });
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phoneNumber");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phoneNumber = phoneInput.value.trim();

  if (!name) return invalidate(nameInput, "Enter the contact's name.");
  if (!email) return invalidate(emailInput, "Enter an email address.");
  if (!emailInput.checkValidity()) return invalidate(emailInput, "Enter a valid email address.");
  if (!phoneNumber) return invalidate(phoneInput, "Enter a phone number.");

  contacts.push({ name, email, phoneNumber });
  addForm.reset();
  searchInput.value = "";
  renderContacts();
  showStatus(`${name} was added successfully.`, "success");
});

removeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const removeNameInput = document.querySelector("#remove-name");
  const requestedName = removeNameInput.value.trim();
  if (!requestedName) return invalidate(removeNameInput, "Enter the name to remove.");

  const normalizedName = requestedName.toLocaleLowerCase();
  const previousLength = contacts.length;
  contacts = contacts.filter(
    (contact) => contact.name.toLocaleLowerCase() !== normalizedName
  );

  if (contacts.length === previousLength) {
    showStatus(`No contact named “${requestedName}” was found.`, "error");
    return;
  }

  removeForm.reset();
  searchInput.value = "";
  renderContacts();
  showStatus(`${requestedName} was removed successfully.`, "success");
});

searchInput.addEventListener("input", () => renderContacts(searchInput.value));

// Initial population of the HTML table.
renderContacts();

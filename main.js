document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactTable = document.getElementById('contact-table').getElementsByTagName('tbody')[0];
    const contactNameInput = document.getElementById('contact-name');
    const contactTelInput = document.getElementById('contact-tel');
    const contactEmailInput = document.getElementById('contact-email');
    const contactAddressInput = document.getElementById('contact-address');
    let contacts = [];
    let editIndex = -1;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = contactNameInput.value;
        const tel = contactTelInput.value;
        const email = contactEmailInput.value;
        const address = contactAddressInput.value;

        if (editIndex === -1) {
            contacts.push({ name, tel, email, address });
        } else {
            contacts[editIndex] = { name, tel, email, address };
            editIndex = -1;
        }

        contactNameInput.value = '';
        contactTelInput.value = '';
        contactEmailInput.value = '';
        contactAddressInput.value = '';
        renderContacts();
    });

    function renderContacts() {
        contactTable.innerHTML = '';
        contacts.forEach((contact, index) => {
            const row = contactTable.insertRow();
            row.insertCell(0).textContent = contact.name;
            row.insertCell(1).textContent = contact.tel;
            row.insertCell(2).textContent = contact.email;
            row.insertCell(3).textContent = contact.address;

            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editContact(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.addEventListener('click', () => deleteContact(index));
            actionsCell.appendChild(deleteButton);
        });

        document.querySelector('.numero-de-contatos').textContent = contacts.length;
    }

    function editContact(index) {
        const contact = contacts[index];
        contactNameInput.value = contact.name;
        contactTelInput.value = contact.tel;
        contactEmailInput.value = contact.email;
        contactAddressInput.value = contact.address;
        editIndex = index;
    }

    function deleteContact(index) {
        contacts.splice(index, 1);
        renderContacts();
    }
});

let data = []; // To store our records
let editIndex = null; // To track the index of the record being edited

const addButton = document.getElementById('addBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const tableBody = document.querySelector('#dataTable tbody');

// Function to render data in the table
function renderTable() {
    tableBody.innerHTML = ''; // Clear existing table data

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>
                <button class="update" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="deleteData(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add new data
function addData() {
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        data.push({ name, email });
        renderTable(); // Re-render the table
        nameInput.value = '';
        emailInput.value = '';
    } else {
        alert('Both fields are required!');
    }
}

// Function to delete data
function deleteData(index) {
    data.splice(index, 1); // Remove the item at the given index
    renderTable(); // Re-render the table
}

// Function to edit data
function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    addButton.textContent = 'Update'; // Change button text to Update
    editIndex = index; // Set the editIndex to the selected record's index
    addButton.onclick = function () {
        updateData(); // Update the selected item
    };
}

// Function to update data
function updateData() {
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email && editIndex !== null) {
        data[editIndex] = { name, email }; // Update the item at the editIndex
        renderTable(); // Re-render the table
        nameInput.value = '';
        emailInput.value = '';
        addButton.textContent = 'Add'; // Reset button text to Add
        addButton.onclick = addData; // Reset the button action to add
        editIndex = null; // Reset editIndex
    } else {
        alert('Both fields are required!');
    }
}

// Add button click event
addButton.onclick = addData;

// Initial render
renderTable();

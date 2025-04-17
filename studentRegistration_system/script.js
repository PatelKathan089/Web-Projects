// Declaring the variables:-
let studentList = [];
let currentStudentEditID = null;

// Getting elements by their IDs:-
const Form = document.getElementById("studentForm");
const Name = document.getElementById("name");
const Student_ID = document.getElementById("student_id");
const Email = document.getElementById("email");
const Contact = document.getElementById("contact");
const Table_Body = document.getElementById("tableBody");
const Cards = document.getElementById("cardContainer");
const Submit_Btn = document.querySelector("button[type='submit']");

// Dynamically creating the table rows and cells:-
const renderTable = () => {
    Table_Body.innerHTML = ""; // Clear table before rendering
    studentList.map((student) => {
        return Table_Body.innerHTML += `<tr id=${student.id} class="border">
            <td class="p-1 border text-center">${student.name}</td>
            <td class="p-1 border text-center">${student.student_id}</td>
            <td class="p-1 border text-center">${student.email}</td>
            <td class="p-1 border text-center">${student.contact}</td>
            <td class="p-1 border text-center">
                <i class="cursor-pointer fa-solid fa-pen-to-square fa-lg" style="color: #74C0FC;"></i>
                <i class="cursor-pointer mx-2 fa-solid fa-trash fa-lg" style="color: #FF0000;"></i>
            </td>
        </tr>`;
    });
}

// Dynamically creating the cards for smaller screens:-
const renderCard = () => {
    Cards.innerHTML = ""; // Clear cards before rendering
    studentList.map((student) => {
        return Cards.innerHTML += `<div id=${student.id}
            class="sm:hidden card p-3 my-2 rounded-2xl flex flex-col gap-1 bg-slate-800"
          >
            <div class="flex gap-1 items-center">
              <p class="font-bold">Name:</p>
              <p>${student.name}</p>
            </div>
            <div class="flex gap-1 items-center">
              <p class="font-bold">StudentId:</p>
              <p>${student.student_id}</p>
            </div>
            <div class="flex gap-1 items-center">
              <p class="font-bold">Email:</p>
              <p>${student.email}</p>
            </div>
            <div class="flex gap-1 items-center">
              <p class="font-bold">Contact No:</p>
              <p>${student.contact}</p>
            </div>
            <div class="flex items-center gap-5 my-3">
              <i
                class="cursor-pointer fa-solid fa-pen-to-square fa-lg"
                style="color: #74c0fc"
              ></i>
              <i
                class="cursor-pointer mx-2 fa-solid fa-trash fa-lg"
                style="color: #ff0000"
              ></i>
            </div>
          </div>`
    });
}

// Retrieving the form data and storing it in local storage:-
Form.addEventListener("submit", (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    const studentData = {
        name: Name.value,
        student_id: Student_ID.value,
        email: Email.value,
        contact: Contact.value,
        id: currentStudentEditID !== null ? currentStudentEditID : studentList.length
    };

    if (currentStudentEditID !== null) {
        // Updating existing student data
        studentList = studentList.map(student => student.id == currentStudentEditID ? studentData : student);
        currentStudentEditID = null; // Resetting the edit ID after updating
    } else {
        // Adding new student data
        studentList.push(studentData);
    }
    renderTable(); // Rendering the table with the new data
    renderCard(); // Rendering the cards with the new data
    localStorage.setItem("students", JSON.stringify(studentList)); // Storing the data in local storage
    Form.reset(); // Resetting the form fields
});

// Retrieving the data from local storage on page load:-
window.addEventListener("DOMContentLoaded", () => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
        studentList = storedStudents; // Assigning the stored data to the studentList variable
        renderTable(); // Rendering the table with the stored data
        renderCard(); // Rendering the cards with the stored data
    }
});

// Adding event listeners to the edit and delete buttons for larger screens:-
Table_Body.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pen-to-square")) {
        // Edit Button Functionality:-
        const row = e.target.closest("tr");
        const id = row.id;
        currentStudentEditID = id; // Storing the ID of the student being edited
        const student = studentList.find(student => student.id == id); // Finding the student to edit
        Name.value = student.name;
        Student_ID.value = student.student_id;
        Email.value = student.email;
        Contact.value = student.contact;

    } else if (e.target.classList.contains("fa-trash")) {
        // Delete Button Functionality:-
        const row = e.target.closest("tr");
        const id = row.id;
        studentList = studentList.filter(student => student.id != id);
        localStorage.setItem("students", JSON.stringify(studentList)); // Updating local storage
        renderTable(); // Rendering the table with the updated data
        renderCard(); // Rendering the cards with the updated data
    }
});

// Adding event listeners to the edit and delete buttons for smaller screens:-
Cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pen-to-square")) {
        // Edit Button Functionality:-
        const card = e.target.closest(".card");
        const id = card.id;
        currentStudentEditID = id; // Storing the ID of the student being edited
        const student = studentList.find(student => student.id == id); // Finding the student to edit
        Name.value = student.name;
        Student_ID.value = student.student_id;
        Email.value = student.email;
        Contact.value = student.contact;

    } else if (e.target.classList.contains("fa-trash")) {
        // Delete Button Functionality:-
        const card = e.target.closest(".card");
        const id = card.id;
        studentList = studentList.filter(student => student.id != id);
        localStorage.setItem("students", JSON.stringify(studentList)); // Updating local storage
        renderTable(); // Rendering the table with the updated data
        renderCard(); // Rendering the cards with the updated data
    }
});

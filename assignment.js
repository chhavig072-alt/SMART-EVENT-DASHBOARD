// Select Elements
const eventTitle = document.querySelector("input[type='text']");
const eventDate = document.querySelector("input[type='date']");
const category = document.querySelector("select");
const description = document.querySelector("textarea");
const addBtn = document.querySelector("button");
const eventsContainer = document.querySelector("#eventsContainer");
const clearBtn = document.querySelector("#clearEvents");
const sampleBtn = document.querySelector("#sampleEvents");
const keyDisplay = document.querySelector("#keyPressed");

// Load events on page load
document.addEventListener("DOMContentLoaded", loadEvents);

// Add Event
addBtn.addEventListener("click", function () {
    if (!eventTitle.value || !eventDate.value) {
        alert("Please fill all required fields!");
        return;
    }

    const event = {
        title: eventTitle.value,
        date: eventDate.value,
        category: category.value,
        description: description.value
    };

    saveEvent(event);
    displayEvent(event);

    // Clear form
    eventTitle.value = "";
    eventDate.value = "";
    description.value = "";
});

// Save to localStorage
function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

// Load from localStorage
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(displayEvent);
}

// Display Event
function displayEvent(event) {
    const div = document.createElement("div");
    div.classList.add("event-card");
    div.innerHTML = `
        <h5>${event.title}</h5>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <button class="delete-btn">Delete</button>
        <hr>
    `;

    // Delete button
    div.querySelector(".delete-btn").addEventListener("click", function () {
        deleteEvent(event.title);
        div.remove();
    });

    eventsContainer.appendChild(div);
}

// Delete Event
function deleteEvent(title) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.title !== title);
    localStorage.setItem("events", JSON.stringify(events));
}

// Clear All Events
clearBtn.addEventListener("click", function () {
    localStorage.removeItem("events");
    eventsContainer.innerHTML = "";
});

// Add Sample Events
sampleBtn.addEventListener("click", function () {
    const samples = [
        {
            title: "Tech Conference",
            date: "2026-03-10",
            category: "Conference",
            description: "Annual technology meetup."
        },
        {
            title: "Music Fest",
            date: "2026-04-15",
            category: "Festival",
            description: "Live performances and fun."
        }
    ];

    samples.forEach(event => {
        saveEvent(event);
        displayEvent(event);
    });
});

// DOM Key Press Demo
document.addEventListener("keydown", function (e) {
    keyDisplay.textContent = e.key;
});

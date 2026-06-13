const daysContainer = document.querySelector(".days");
const namesContainer = document.querySelector(".names");

const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const closeNote = document.getElementById("closeNote");
const overlay = document.getElementById("overlay");


let selectedDay = null;
let selectedDayBox = null;
let selectedDayElement = null;

// Create calendar days
for (let day = 1; day <= 30; day++) {
    const dayDiv = document.createElement("div");

    dayDiv.classList.add("day");
    dayDiv.textContent = day;

    daysContainer.appendChild(dayDiv);
}

// Highlight today's date
const today = new Date().getDate();
const highlight = daysContainer.children[today - 1];

highlight.classList.add("today");

highlight.innerHTML = `
    <svg class="today-circle" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="orange" fill-opacity="0.35"></circle>
    </svg>
    <span>${today}</span>
`;

// Deirdre's Birthday highlighted
const dbirth = daysContainer.children[24];
dbirth.style.backgroundColor = "pink";

// Add empty days
for (let i = 0; i < 5; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day", "empty");
    daysContainer.appendChild(emptyDiv);
}

// Add weekday names
const daysWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

daysWeek.forEach(name => {
    const nameDiv = document.createElement("div");

    nameDiv.classList.add("name");
    nameDiv.textContent = name;

    namesContainer.appendChild(nameDiv);
});

// Get all days after they have been created
const days = document.querySelectorAll(".day");

noteTitle.textContent = `Todays Date: ${today} of June`;

// Open note box when clicking a day
days.forEach(day => {
    day.addEventListener("click", () => {
        if (day.classList.contains("empty")) return;

        if (selectedDayElement) {
            selectedDayElement.classList.remove("selected");
        }

        selectedDayElement = day;
        selectedDayElement.classList.add("selected");

        selectedDay = day.textContent.trim();
        selectedDayBox = day;

        noteTitle.textContent = `Note for ${selectedDay}`;
        noteText.value = localStorage.getItem(`note-${selectedDay}`) || "";

        noteBox.style.display = "block";
        overlay.style.display = "block";

        const rect = day.getBoundingClientRect();

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const noteWidth = noteBox.offsetWidth;
        const noteHeight = noteBox.offsetHeight;

        const gap = 10;

        let left;
        let top;

        if (rect.left > screenWidth / 2) {
            left = rect.left - noteWidth - gap;
        } else {
            left = rect.right + gap;
        }

        if (rect.top > screenHeight / 2) {
            top = rect.bottom - noteHeight;
        } else {
            top = rect.top;
        }

        noteBox.style.left = `${left}px`;
        noteBox.style.top = `${top}px`;
    });
});

// Close note box and remove selected day
function closeNoteBox() {
    noteBox.style.display = "none";
    overlay.style.display = "none";

    if (selectedDayElement) {
        selectedDayElement.classList.remove("selected");
        selectedDayElement = null;
    }
}

// Save note
saveNote.addEventListener("click", () => {
    localStorage.setItem(`note-${selectedDay}`, noteText.value);

    if (noteText.value.trim() !== "") {
        selectedDayBox.classList.add("has-note");
    } else {
        selectedDayBox.classList.remove("has-note");
        localStorage.removeItem(`note-${selectedDay}`);
    }

    closeNoteBox();
});

// Close buttons
closeNote.addEventListener("click", closeNoteBox);
overlay.addEventListener("click", closeNoteBox);

// Drag note box
let offsetX = 0;
let offsetY = 0;

noteTitle.addEventListener("pointerdown", startDrag);

function startDrag(e) {
    e.preventDefault();

    const rect = noteBox.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    noteTitle.setPointerCapture(e.pointerId);

    noteTitle.addEventListener("pointermove", drag);
    noteTitle.addEventListener("pointerup", stopDrag);
}

function drag(e) {
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    const maxLeft = window.innerWidth - noteBox.offsetWidth;
    const maxTop = window.innerHeight - noteBox.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    noteBox.style.left = `${newLeft}px`;
    noteBox.style.top = `${newTop}px`;
}

function stopDrag(e) {
    noteTitle.releasePointerCapture(e.pointerId);

    noteTitle.removeEventListener("pointermove", drag);
    noteTitle.removeEventListener("pointerup", stopDrag);
}
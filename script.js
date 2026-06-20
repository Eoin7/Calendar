const daysContainer = document.querySelector(".days");
const namesContainer = document.querySelector(".names");

const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const closeNote = document.getElementById("closeNote");
const overlay = document.getElementById("overlay");
const MonthTitle = document.querySelector(".Month");


let selectedDay = null;
let selectedDayBox = null;
let selectedDayElement = null;

// Weekday names
const daysWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Month names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// header names of the week
daysWeek.forEach(name => {
    const nameDiv = document.createElement("div");

    nameDiv.classList.add("name");
    nameDiv.textContent = name;

    namesContainer.appendChild(nameDiv);
});


function renderCalendar(year, month) {
    // clear the Calendar
    daysContainer.innerHTML = "";

    // generate the month title
    MonthTitle.innerHTML = monthNames[month].toUpperCase();

    const daysInMonth = new Date(year, month+1, 0).getDate();

    // get start day and shift so that monday -> 0
    const firstDay = new Date(year, month, 1).getDay();
    const startDay = (firstDay + 6) % 7;

    // dealing with empty cells that trail after the days have been added and days where the month starts on a SUN
    const usedCells = startDay + daysInMonth;
    const totalCells = usedCells > 35 ? 42 : 35;
    const trailingCells = totalCells - usedCells;

    // Add empty days
    for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day", "empty");
        daysContainer.appendChild(emptyDiv);
    }

    // Add calender day cells
    for (let day = 1; day <= daysInMonth; day++) {
        // create a div 
        const dayDiv = document.createElement("div");
        // add it to the day css (will give it its style)
        dayDiv.classList.add("day");
        // give it its day number from the loop
        dayDiv.textContent = day;
        // add it to the container
        daysContainer.appendChild(dayDiv);
    }

    // add the trailing empty cells 
    for (let i = 0; i < trailingCells; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day", "empty");
        daysContainer.appendChild(emptyDiv);
    }

    // Get all days after they have been created
    const days = document.querySelectorAll(".day");

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

            let left = window.innerWidth / 4;
            let top = window.innerHeight / 2;

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

}

// generate the day
renderCalendar(2026, 2);




// Highlight today's date
// const today = new Date().getDate();
// const highlight = daysContainer.children[today - 1];

// highlight.classList.add("today");

// highlight.innerHTML = `
//     <svg class="today-circle" viewBox="0 0 100 100">
//         <circle cx="50" cy="50" r="30" fill="orange" fill-opacity="0.35"></circle>
//     </svg>
//     <span>${today}</span>
// `;

// Deirdre's Birthday highlighted
const dbirth = daysContainer.children[24];
dbirth.style.backgroundColor = "pink";


noteTitle.textContent = `Todays Date: ${today} of June`;



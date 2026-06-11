const daysContainer = document.querySelector(".days");


for (let day = 1; day <= 30; day++) {
    const dayDiv = document.createElement("div");

    dayDiv.classList.add("day");
    dayDiv.textContent = day;

    daysContainer.appendChild(dayDiv);
}

// const day7 = document.querySelector(".days").children[6];
// // day7.style.backgroundColor = "#2144ab";


// select the todays date
const today = new Date().getDate(); 
const highlight = document.querySelector(".days").children[today-1];
highlight.style.backgroundColor = "orange";

const dbirth = document.querySelector(".days").children[24];
dbirth.style.backgroundColor = "pink";




for (let i = 0; i < 5; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day", "empty");
    daysContainer.appendChild(emptyDiv);
}

const namesContainer = document.querySelector(".names");
const daysWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

daysWeek.forEach(name => {
    const nameDiv = document.createElement("div");

    nameDiv.classList.add("name");
    nameDiv.textContent = name;

    namesContainer.appendChild(nameDiv);
})


// notebox
const days = document.querySelectorAll(".day");

const noteBox = document.getElementById("noteBox");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const closeNote = document.getElementById("closeNote");

let selectedDay = null;
let selectedDayBox = null;
noteTitle.textContent = `Todays Date: ${new Date().getDate()} of June`;

days.forEach(day => {
    day.addEventListener("click", () => {
        selectedDay = day.textContent.trim();
        selectedDayBox = day;

        noteTitle.textContent = `Note for ${selectedDay}`;
        noteText.value = localStorage.getItem(`note-${selectedDay}`) || "";

        noteBox.style.display = "block";
    });
});

saveNote.addEventListener("click", () => {
    localStorage.setItem(`note-${selectedDay}`, noteText.value);

    if (noteText.value.trim() !== "") {
        selectedDayBox.classList.add("has-note");
    } else {
        selectedDayBox.classList.remove("has-note");
        localStorage.removeItem(`note-${selectedDay}`);
    }

    noteBox.style.display = "none";
});

closeNote.addEventListener("click", () => {
    noteBox.style.display = "none";
});



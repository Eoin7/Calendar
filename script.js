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
const today = new Date().getDay(); 
const highlight = document.querySelector(".days").children[today-1];
highlight.style.backgroundColor = "orange";




for (let i = 0; i < 5; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day", "empty");
    daysContainer.appendChild(emptyDiv);
}

const namesContainer = document.querySelector(".names");
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

days.forEach(name => {
    const nameDiv = document.createElement("div");

    nameDiv.classList.add("name");
    nameDiv.textContent = name;

    namesContainer.appendChild(nameDiv);
})
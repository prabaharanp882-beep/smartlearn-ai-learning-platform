// Page Navigation
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

// Subject Selection
function saveSubjects() {
    const subjects = document.querySelectorAll(
        '#subjectList input[type="checkbox"]:checked'
    );

    document.getElementById("subjectCount").innerText =
        subjects.length;

    alert("Subjects saved successfully!");
}

// Study Planner
function generatePlan() {
    const subject = document.getElementById("studySubject").value;
    const hours = Number(document.getElementById("studyHours").value);
    const goal = document.getElementById("studyGoal").value;

    if (subject.trim() === "" || hours <= 0 || !Number.isFinite(hours)) {
        alert("Please enter a valid subject and study hours!");
        return;
    }

    const totalMinutes = hours * 60;
    const learn = Math.round(totalMinutes / 3);
    const practice = Math.round(totalMinutes / 3);
    const revise = totalMinutes - learn - practice;

    document.getElementById("planResult").innerHTML = `
        <h3>Your Study Plan</h3>
        <p>Subject: ${escapeHTML(subject)}</p>
        <p>Goal: ${escapeHTML(goal || "Improve understanding")}</p>
        <p>Learning: ${learn} minutes</p>
        <p>Practice: ${practice} minutes</p>
        <p>Revision: ${revise} minutes</p>
        <p>Total: ${totalMinutes} minutes</p>
    `;
}

// Safe text display
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Online Quiz
function checkQuiz() {
    const q1 = document.querySelector(
        'input[name="q1"]:checked'
    );

    const q2 = document.querySelector(
        'input[name="q2"]:checked'
    );

    if (!q1 || !q2) {
        alert("Please answer all questions!");
        return;
    }

    let score = 0;

    if (q1.value === "HTML") score++;
    if (q2.value === "CSS") score++;

    const percentage = score * 50;

    document.getElementById("quizResult").innerText =
        "Your Score: " + score + "/2 (" + percentage + "%)";

    document.getElementById("quizAverage").innerText =
        percentage + "%";
}

// Notes and PDF Upload
document.getElementById("fileInput").addEventListener(
    "change",
    function() {
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = "";

        Array.from(this.files).forEach(file => {
            const li = document.createElement("li");
            li.textContent = file.name;
            fileList.appendChild(li);
        });
    }
);

// Skill Tracker
function addSkill() {
    const input = document.getElementById("skillName");
    const skill = input.value.trim();

    if (skill === "") {
        alert("Please enter a skill!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = skill + " - New Skill";

    document.getElementById("skillList").appendChild(li);

    input.value = "";
    alert("New skill added!");
}

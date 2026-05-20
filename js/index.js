//Footer #########################################################
const body = document.querySelector("body");
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const footerElement = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Esther Quansah ${thisYear} `;
footerElement.appendChild(copyright);

//Skills List #########################################################
const skills = ["HTML", "CSS", "JavaScript", "GitHub", "Excel", "PowerPoint", "Word"];

const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

//Message Form #########################################################

const messageForm = document.forms.leave_message;
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
        const usersName = event.target.usersName.value;
        const usersEmail = event.target.usersEmail.value;
        const usersMessage = event.target.usersMessage.value;
    console.log(usersName, usersEmail, usersMessage);
    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("#messagesList");
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> 
        <span>(${usersEmail})</span> says: 
        <span>${usersMessage}</span>`;
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        entry.remove();
       
    });

    const editButton = document.createElement("button");

        editButton.innerText = "Edit";
        editButton.type = "button";

    editButton.addEventListener("click", function () {
            const messageContent = newMessage.querySelectorAll("span")[1];
            const currentText = messageContent.innerText;
            const newText = prompt ("Edit your message:", currentText);
            if (newText !== null && newText.trim() !== "") {
                messageContent.innerText = newText;
            }
        }
    );
        

    newMessage.appendChild(removeButton);
    newMessage.appendChild(editButton);
    messageList.appendChild(newMessage);
    messageForm.reset(); });
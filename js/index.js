const body = document.querySelector("body");
const footer = document.createElement("footer");
body.append(footer);

const today = new Date();
const thisYear = today.getFullYear();
const footerElement = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Esther Quansah ${thisYear} `;
footerElement.appendChild(copyright);

const skills = ["HTML", "CSS", "JavaScript", "GitHub", "Excel", "PowerPoint", "Word"];

const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
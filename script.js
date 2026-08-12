```javascript
let researches = [];


// LOAD SAVED RESEARCH
function loadResearch() {

    const saved =
        localStorage.getItem("advResearch");

    if (saved) {

        researches =
            JSON.parse(saved);

    }

    displayResearch();

}


// PAGE NAVIGATION
function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selected =
        document.getElementById(pageName);

    if (selected) {

        selected.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// SAVE RESEARCH
function saveResearch() {

    const title =
        document
        .getElementById("researchTitle")
        .value
        .trim();


    const field =
        document
        .getElementById("researchField")
        .value;


    const content =
        document
        .getElementById("researchContent")
        .value
        .trim();


    if (!title || !content) {

        alert(
            "Please enter a title and research content."
        );

        return;

    }


    const today =
        new Date()
        .toLocaleDateString();


    const research = {

        id: Date.now(),

        title: title,

        field: field,

        author:
            "Yassine Bechir Dallel",

        date: today,

        content: content

    };


    researches.push(research);


    localStorage.setItem(
        "advResearch",
        JSON.stringify(researches)
    );


    clearEditor();

    displayResearch();

    alert(
        "Research saved successfully!"
    );

}


// CLEAR EDITOR
function clearEditor() {

    document
        .getElementById("researchTitle")
        .value = "";

    document
        .getElementById("researchContent")
        .value = "";

}


// DISPLAY RESEARCH
function displayResearch() {

    const list =
        document.getElementById(
            "researchList"
        );


    const featured =
        document.getElementById(
            "featuredResearch"
        );


    list.innerHTML = "";

    featured.innerHTML = "";


    if (researches.length === 0) {

        list.innerHTML =
            "<p>No research saved yet.</p>";

        featured.innerHTML =
            "<p>No research published yet.</p>";

        return;

    }


    researches
        .slice()
        .reverse()
        .forEach(research => {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "research-item";


            item.innerHTML = `

                <h3>
                    ${escapeHTML(research.title)}
                </h3>

                <div class="research-meta">

                    ${escapeHTML(research.field)}
                    •
                    ${escapeHTML(research.author)}
                    •
                    ${escapeHTML(research.date)}

                </div>

                <div class="research-content">

                    ${escapeHTML(research.content)}

                </div>

                <button
                    class="research-card-button"
                    onclick="deleteResearch(${research.id})">

                    Delete

                </button>

            `;


            list.appendChild(item);


            const featuredItem =
                document.createElement(
                    "div"
                );


            featuredItem.className =
                "research-item";


            featuredItem.innerHTML = `

                <h3>
                    ${escapeHTML(research.title)}
                </h3>

                <div class="research-meta">

                    ${escapeHTML(research.field)}
                    •
                    ${escapeHTML(research.author)}
                    •
                    ${escapeHTML(research.date)}

                </div>

                <button
                    onclick="openResearch(${research.id})">

                    READ RESEARCH →

                </button>

            `;


            featured.appendChild(
                featuredItem
            );

        });


    if (window.MathJax) {

        MathJax.typesetPromise();

    }

}


// OPEN RESEARCH
function openResearch(id) {

    const research =
        researches.find(
            r => r.id === id
        );


    if (!research) {

        return;

    }


    showPage("research");


    document
        .getElementById(
            "researchTitle"
        )
        .value =
            research.title;


    document
        .getElementById(
            "researchField"
        )
        .value =
            research.field;


    document
        .getElementById(
            "researchContent"
        )
        .value =
            research.content;

}


// DELETE RESEARCH
function deleteResearch(id) {

    const confirmed =
        confirm(
            "Delete this research?"
        );


    if (!confirmed) {

        return;

    }


    researches =
        researches.filter(
            research =>
                research.id !== id
        );


    localStorage.setItem(
        "advResearch",
        JSON.stringify(researches)
    );


    displayResearch();

}


// ESCAPE HTML
function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// START APPLICATION
loadResearch();
```

const pages = document.querySelectorAll(".page");

let lastChapter = "mathematics";


/* ================= NAVIGATION ================= */

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    const target = document.getElementById(id);

    if (!target) {

        console.error("Page does not exist:", id);

        return;
    }

    target.classList.add("active");

    window.scrollTo(0, 0);

    typeset();
}


/* ================= MATHEMATICS ================= */

const chapters = {

    calculus: {

        title: "CALCULUS",

        description:
        "The mathematical study of change, accumulation and continuous processes.",

        topics: [

            ["01", "FOUNDATIONS",
             "The tangent problem and the origin of calculus.",
             "foundations"],

            ["02", "LIMITS",
             "The rigorous language of infinite approximation.",
             "limits"],

            ["03", "DIFFERENTIATION",
             "From secant slopes to the derivative.",
             "differentiation"],

            ["04", "INTEGRATION",
             "Accumulation and the Fundamental Theorem.",
             "integration"],

            ["05", "SEQUENCES",
             "Convergence and Cauchy sequences.",
             "sequences"],

            ["06", "SERIES",
             "Infinite sums and convergence tests.",
             "series"]

        ]
    },


    analysis: {

        title: "REAL ANALYSIS",

        description:
        "Rigorous analysis of real numbers and functions.",

        topics: [

            ["01", "REAL NUMBERS",
             "Completeness and the supremum property.",
             "realNumbers"],

            ["02", "CONVERGENCE",
             "Sequences, limits and Cauchy sequences.",
             "convergence"],

            ["03", "CONTINUITY",
             "Continuity and existence theorems.",
             "continuity"],

            ["04", "COMPACTNESS",
             "Open covers and compact sets.",
             "compactness"]

        ]
    },


    complex: {

        title: "COMPLEX ANALYSIS",

        description:
        "Functions of a complex variable and analytic structure.",

        topics: [

            ["01", "COMPLEX DIFFERENTIABILITY",
             "Derivatives in the complex plane.",
             "complexDerivative"],

            ["02", "CAUCHY–RIEMANN",
             "The equations connecting u and v.",
             "cauchyRiemann"],

            ["03", "CONTOUR INTEGRALS",
             "Integration along complex curves.",
             "contour"],

            ["04", "LAURENT SERIES",
             "Local expansions around singularities.",
             "laurent"],

            ["05", "RESIDUES",
             "Local singularity information.",
             "residues"]

        ]
    },


    topology: {

        title: "TOPOLOGY",

        description:
        "Continuity, neighborhoods and structures preserved under deformation.",

        topics: [

            ["01", "OPEN SETS",
             "Neighborhoods and openness.",
             "openSets"],

            ["02", "CLOSED SETS",
             "Closure and limit points.",
             "closedSets"],

            ["03", "COMPACTNESS",
             "Open covers and finite subcovers.",
             "topCompactness"],

            ["04", "CONNECTEDNESS",
             "Connected spaces and continuous images.",
             "connectedness"]

        ]
    },


    linear: {

        title: "LINEAR ALGEBRA",

        description:
        "Vector spaces and linear transformations.",

        topics: [

            ["01", "VECTOR SPACES",
             "Spans, subspaces and linear combinations.",
             "vectorSpaces"],

            ["02", "LINEAR MAPS",
             "Kernel, image and rank-nullity.",
             "linearMaps"],

            ["03", "EIGENVALUES",
             "Invariant directions of transformations.",
             "eigenvalues"],

            ["04", "INNER PRODUCTS",
             "Orthogonality and geometry.",
             "innerProducts"]

        ]
    },


    vector: {

        title: "VECTOR CALCULUS",

        description:
        "Calculus of scalar and vector fields.",

        topics: [

            ["01", "GRADIENT",
             "Spatial variation of scalar fields.",
             "gradient"],

            ["02", "DIVERGENCE",
             "Local source and sink behavior.",
             "divergence"],

            ["03", "CURL",
             "Local rotational behavior.",
             "curl"],

            ["04", "LINE INTEGRALS",
             "Integration along curves.",
             "lineIntegrals"]

        ]
    }

};


function openChapter(id) {

    const chapter = chapters[id];

    if (!chapter) return;

    lastChapter = "mathematics";

    document.getElementById("chapterContent").innerHTML = `

        <div class="content">

            <div class="number">
                MATHEMATICS / CHAPTER
            </div>

            <h1>${chapter.title}</h1>

            <p class="lead">
                ${chapter.description}
            </p>

            <div class="topic-list">

                ${chapter.topics.map(topic => `

                    <button onclick="openTopic('${topic[3]}')">

                        <span>${topic[0]}</span>

                        <strong>${topic[1]}</strong>

                        <small>
                            ${topic[2]}
                        </small>

                    </button>

                `).join("")}

            </div>

        </div>

    `;

    showPage("chapter");
}


/* ================= MATHEMATICAL TOPICS ================= */

const topics = {


foundations: {

    title: "FOUNDATIONS",

    lead:
    "The problems that force calculus into existence.",

    sections: [

        ["THE TANGENT PROBLEM", `

            <p>
                Given a curve $y=f(x)$ and a point $x=a$,
                the slope between two nearby points is
            </p>

            <div class="formula">

                $$

                m_{sec}
                =
                \\frac{f(a+h)-f(a)}{h}

                $$

            </div>

            <p>
                This is an average rate of change.
                The derivative appears when $h\\to0$.
            </p>

        `],


        ["THE AREA PROBLEM", `

            <p>
                A curved area can be approximated
                using rectangles. Increasing the number
                of rectangles leads to a limiting process.
            </p>

        `]

    ]
},


limits: {

    title: "LIMITS",

    lead:
    "The rigorous language of approximation.",

    sections: [

        ["INTUITIVE IDEA", `

            <div class="formula">

                $$

                \\lim_{x\\to a}f(x)=L

                $$

            </div>

        `],


        ["EPSILON–DELTA", `

            <div class="formula">

                $$

                \\forall\\varepsilon>0\\;
                \\exists\\delta>0:

                0<|x-a|<\\delta

                \\Rightarrow

                |f(x)-L|<\\varepsilon

                $$

            </div>

            <p>
                This turns the intuitive idea of
                "getting arbitrarily close" into a rigorous statement.
            </p>

        `]

    ]
},


differentiation: {

    title: "DIFFERENTIATION",

    lead:
    "The derivative is constructed from the tangent problem.",

    sections: [

        ["THE DIFFERENCE QUOTIENT", `

            <div class="formula">

                $$

                \\frac{f(a+h)-f(a)}{h}

                $$

            </div>

            <p>
                This is the slope of a secant line.
            </p>

        `],


        ["DERIVATIVE FROM FIRST PRINCIPLES", `

            <div class="formula">

                $$

                f'(a)
                =
                \\lim_{h\\to0}
                \\frac{f(a+h)-f(a)}{h}

                $$

            </div>


            <div class="proof">

                <strong>
                    Example: $f(x)=x^2$
                </strong>

                <p>

                $$

                f'(a)
                =
                \\lim_{h\\to0}
                \\frac{(a+h)^2-a^2}{h}

                $$

                $$

                =
                \\lim_{h\\to0}(2a+h)

                =2a

                $$

                </p>

            </div>

        `],


        ["PRODUCT RULE — DERIVATION", `

            <p>
                Let $F(x)=f(x)g(x)$.
                Start directly from the derivative definition:
            </p>

            <div class="formula">

                $$

                \\frac{
                f(x+h)g(x+h)-f(x)g(x)
                }{h}

                $$

            </div>

            <p>
                Add and subtract $f(x+h)g(x)$.
            </p>

            <div class="formula">

                $$

                \\frac{
                f(x+h)[g(x+h)-g(x)]
                +
                g(x)[f(x+h)-f(x)]
                }{h}

                $$

            </div>

            <p>
                Taking the limit gives
            </p>

            <div class="formula">

                $$

                \\boxed{
                (fg)'=f'g+fg'
                }

                $$

            </div>

        `],


        ["CHAIN RULE", `

            <p>
                If $y=f(u)$ and $u=g(x)$,
                changes propagate through the composition:
            </p>

            <div class="formula">

                $$

                \\boxed{

                \\frac{dy}{dx}
                =
                \\frac{dy}{du}
                \\frac{du}{dx}

                }

                $$

            </div>

        `],


        ["IMPORTANT THEOREMS", `

            <ul>

                <li>Differentiability implies continuity.</li>

                <li>Rolle's theorem.</li>

                <li>Mean Value Theorem.</li>

                <li>Taylor's theorem.</li>

            </ul>

        `]

    ]
},


integration: {

    title: "INTEGRATION",

    lead:
    "Accumulation constructed from limiting sums.",

    sections: [

        ["RIEMANN SUM", `

            <div class="formula">

                $$

                \\sum_{i=1}^{n}
                f(x_i^*)\\Delta x_i

                $$

            </div>

        `],


        ["DEFINITE INTEGRAL", `

            <div class="formula">

                $$

                \\int_a^b f(x)dx
                =
                \\lim_{\\|P\\|\\to0}
                \\sum
                f(x_i^*)\\Delta x_i

                $$

            </div>

        `],


        ["FUNDAMENTAL THEOREM", `

            <div class="formula">

                $$

                \\int_a^b f(x)dx
                =
                F(b)-F(a)

                $$

            </div>

        `]

    ]
},


sequences: {

    title: "SEQUENCES",

    lead:
    "Infinite processes represented as functions on the natural numbers.",

    sections: [

        ["CONVERGENCE", `

            <div class="formula">

                $$

                a_n\\to L
                \\iff
                \\forall\\varepsilon>0
                \\exists N:
                n\\ge N
                \\Rightarrow
                |a_n-L|<\\varepsilon

                $$

            </div>

        `],


        ["CAUCHY SEQUENCE", `

            <div class="formula">

                $$

                \\forall\\varepsilon>0
                \\exists N:
                m,n\\ge N
                \\Rightarrow
                |a_n-a_m|<\\varepsilon

                $$

            </div>

        `]

    ]
},


series: {

    title: "SERIES",

    lead:
    "Infinite sums defined through partial sums.",

    sections: [

        ["PARTIAL SUMS", `

            <div class="formula">

                $$

                S_N
                =
                \\sum_{n=1}^{N}a_n

                $$

            </div>

        `],


        ["CONVERGENCE TESTS", `

            <ul>

                <li>Comparison test</li>

                <li>Limit comparison</li>

                <li>Ratio test</li>

                <li>Root test</li>

                <li>Integral test</li>

                <li>Alternating series test</li>

            </ul>

        `]

    ]
},


/* ---------- OTHER AREAS ---------- */

realNumbers: {

    title: "REAL NUMBERS",

    lead: "The completeness structure behind real analysis.",

    sections: [

        ["SUPREMUM", `

            <p>
                Every nonempty subset of $\\mathbb R$
                bounded above possesses a least upper bound.
            </p>

            <div class="formula">

                $$

                \\sup A\\in\\mathbb R

                $$

            </div>

        `]

    ]
},


convergence: {

    title: "CONVERGENCE",

    lead: "Sequences and rigorous limiting behavior.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                \\forall\\varepsilon>0
                \\exists N:
                n\\ge N
                \\Rightarrow
                |a_n-L|<\\varepsilon

                $$

            </div>

        `]

    ]
},


continuity: {

    title: "CONTINUITY",

    lead: "A function preserves limiting behavior.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                \\lim_{x\\to a}f(x)=f(a)

                $$

            </div>

        `]

    ]
},


compactness: {

    title: "COMPACTNESS",

    lead: "A fundamental finiteness property.",

    sections: [

        ["OPEN COVERS", `

            <p>
                Every open cover of a compact set
                has a finite subcover.
            </p>

        `]

    ]
},


complexDerivative: {

    title: "COMPLEX DIFFERENTIABILITY",

    lead:
    "The complex derivative must be independent of direction.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                f'(z_0)
                =
                \\lim_{z\\to z_0}
                \\frac{f(z)-f(z_0)}
                {z-z_0}

                $$

            </div>

        `]

    ]
},


cauchyRiemann: {

    title: "CAUCHY–RIEMANN EQUATIONS",

    lead:
    "Complex differentiability imposes strong compatibility conditions.",

    sections: [

        ["EQUATIONS", `

            <p>
                If $f(z)=u(x,y)+iv(x,y)$:
            </p>

            <div class="formula">

                $$

                u_x=v_y,
                \\qquad
                u_y=-v_x

                $$

            </div>

        `]

    ]
},


contour: {

    title: "CONTOUR INTEGRALS",

    lead:
    "Integration along curves in the complex plane.",

    sections: [

        ["PARAMETRIZATION", `

            <div class="formula">

                $$

                \\int_\\gamma f(z)dz
                =
                \\int_a^b
                f(\\gamma(t))
                \\gamma'(t)dt

                $$

            </div>

        `]

    ]
},


laurent: {

    title: "LAURENT SERIES",

    lead:
    "Local expansion around isolated singularities.",

    sections: [

        ["EXPANSION", `

            <div class="formula">

                $$

                f(z)
                =
                \\sum_{n=-\\infty}^{\\infty}
                a_n(z-z_0)^n

                $$

            </div>

        `]

    ]
},


residues: {

    title: "RESIDUES",

    lead:
    "Local singularity information controlling global contour integrals.",

    sections: [

        ["RESIDUE", `

            <div class="formula">

                $$

                \\operatorname{Res}(f,z_0)
                =
                a_{-1}

                $$

            </div>

        `],


        ["RESIDUE THEOREM", `

            <div class="formula">

                $$

                \\oint_\\gamma f(z)dz
                =
                2\\pi i
                \\sum_k
                \\operatorname{Res}(f,z_k)

                $$

            </div>

        `]

    ]
},


openSets: {

    title: "OPEN SETS",

    lead:
    "Topology begins with neighborhoods.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                x\\in U
                \\Rightarrow
                \\exists r>0:
                B(x,r)\\subseteq U

                $$

            </div>

        `]

    ]
},


closedSets: {

    title: "CLOSED SETS",

    lead:
    "Closed sets contain their limit points.",

    sections: [

        ["CHARACTERIZATION", `

            <p>
                A set is closed precisely when
                its complement is open.
            </p>

        `]

    ]
},


topCompactness: {

    title: "TOPOLOGICAL COMPACTNESS",

    lead:
    "Compactness through open covers.",

    sections: [

        ["DEFINITION", `

            <p>
                Every open cover admits a finite subcover.
            </p>

        `]

    ]
},


connectedness: {

    title: "CONNECTEDNESS",

    lead:
    "A connected space cannot be separated into two disjoint nonempty open pieces.",

    sections: [

        ["IDEA", `

            <p>
                Continuous images of connected spaces remain connected.
            </p>

        `]

    ]
},


vectorSpaces: {

    title: "VECTOR SPACES",

    lead:
    "The algebraic structure behind linear combinations.",

    sections: [

        ["LINEAR COMBINATION", `

            <div class="formula">

                $$

                a_1v_1+\\cdots+a_nv_n

                $$

            </div>

        `]

    ]
},


linearMaps: {

    title: "LINEAR MAPS",

    lead:
    "Maps preserving addition and scalar multiplication.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                T(av+bw)
                =
                aT(v)+bT(w)

                $$

            </div>

        `],


        ["RANK–NULLITY", `

            <div class="formula">

                $$

                \\dim V
                =
                \\dim\\ker T
                +
                \\dim\\operatorname{Im}T

                $$

            </div>

        `]

    ]
},


eigenvalues: {

    title: "EIGENVALUES",

    lead:
    "Invariant directions of linear transformations.",

    sections: [

        ["EIGENVALUE EQUATION", `

            <div class="formula">

                $$

                Av=\\lambda v

                $$

            </div>

        `]

    ]
},


innerProducts: {

    title: "INNER PRODUCTS",

    lead:
    "Geometry inside vector spaces.",

    sections: [

        ["INNER PRODUCT", `

            <div class="formula">

                $$

                \\langle u,v\\rangle

                $$

            </div>

        `]

    ]
},


gradient: {

    title: "GRADIENT",

    lead:
    "First-order spatial variation of a scalar field.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                \\nabla f
                =
                \\left(
                f_x,f_y,f_z
                \\right)

                $$

            </div>

        `]

    ]
},


divergence: {

    title: "DIVERGENCE",

    lead:
    "Local source and sink behavior.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                \\nabla\\cdot F

                $$

            </div>

        `]

    ]
},


curl: {

    title: "CURL",

    lead:
    "Local rotational behavior.",

    sections: [

        ["DEFINITION", `

            <div class="formula">

                $$

                \\nabla\\times F

                $$

            </div>

        `]

    ]
},


lineIntegrals: {

    title: "LINE INTEGRALS",

    lead:
    "Integration of fields along paths.",

    sections: [

        ["VECTOR FIELD", `

            <div class="formula">

                $$

                \\int_\\gamma F\\cdot dr

                $$

            </div>

        `]

    ]
}

};


/* ================= OPEN TOPIC ================= */

function openTopic(id) {

    const topic = topics[id];

    if (!topic) {

        alert("This topic has not been added yet.");

        return;
    }

    document.getElementById("topicContent").innerHTML = `

        <div class="content">

            <div class="number">
                MATHEMATICS / TOPIC
            </div>

            <h1>${topic.title}</h1>

            <p class="lead">
                ${topic.lead}
            </p>

            ${topic.sections.map((section, index) => `

                <div class="content-section">

                    <h2>
                        ${String(index + 1).padStart(2, "0")}
                        — ${section[0]}
                    </h2>

                    ${section[1]}

                </div>

            `).join("")}

        </div>

    `;

    showPage("topic");
}


/* ================= PHYSICS ================= */

const physics = {

    classical: {

        title: "CLASSICAL MECHANICS",

        topics: [

            ["01", "NEWTONIAN MECHANICS",
             "Forces and momentum.",
             "newton"],

            ["02", "LAGRANGIAN MECHANICS",
             "Action and generalized coordinates.",
             "lagrangian"],

            ["03", "HAMILTONIAN MECHANICS",
             "Phase space and Hamilton's equations.",
             "hamiltonian"]

        ]
    },


    quantum: {

        title: "QUANTUM MECHANICS",

        topics: [

            ["01", "HILBERT SPACE",
             "The mathematical state space.",
             "hilbert"],

            ["02", "OPERATORS",
             "Observables and eigenvalues.",
             "operators"],

            ["03", "SCHRÖDINGER EQUATION",
             "Quantum time evolution.",
             "schrodinger"]

        ]
    },


    relativity: {

        title: "RELATIVITY",

        topics: [

            ["01", "SPACETIME",
             "Minkowski geometry.",
             "spacetime"],

            ["02", "LORENTZ TRANSFORMATIONS",
             "Relativistic coordinate transformations.",
             "lorentz"],

            ["03", "ENERGY AND MOMENTUM",
             "Relativistic dynamics.",
             "energy"]

        ]
    }

};


function openPhysics(id) {

    const chapter = physics[id];

    document.getElementById("physicsContent").innerHTML = `

        <div class="content">

            <div class="number">
                PHYSICS / CHAPTER
            </div>

            <h1>${chapter.title}</h1>

            <div class="topic-list">

                ${chapter.topics.map(topic => `

                    <button
                        onclick="openPhysicsTopic('${topic[3]}')">

                        <span>${topic[0]}</span>

                        <strong>${topic[1]}</strong>

                        <small>${topic[2]}</small>

                    </button>

                `).join("")}

            </div>

        </div>

    `;

    showPage("physicsChapter");
}


const physicsTopics = {

    newton: {

        title: "NEWTONIAN MECHANICS",

        lead: "The force-based formulation of classical mechanics.",

        sections: [

            ["NEWTON'S SECOND LAW", `

                <div class="formula">

                    $$F=ma$$

                </div>

            `],

            ["MOMENTUM", `

                <div class="formula">

                    $$p=mv$$

                </div>

            `]

        ]
    },


    lagrangian: {

        title: "LAGRANGIAN MECHANICS",

        lead:
        "Mechanics formulated through the principle of stationary action.",

        sections: [

            ["LAGRANGIAN", `

                <div class="formula">

                    $$L=T-V$$

                </div>

            `],

            ["ACTION", `

                <div class="formula">

                    $$S=\\int L\\,dt$$

                </div>

            `],

            ["EULER–LAGRANGE EQUATION", `

                <div class="formula">

                    $$

                    \\boxed{

                    \\frac{d}{dt}
                    \\left(
                    \\frac{\\partial L}
                    {\\partial\\dot q_i}
                    \\right)
                    -
                    \\frac{\\partial L}
                    {\\partial q_i}
                    =0

                    }

                    $$

                </div>

            `]

        ]
    },


    hamiltonian: {

        title: "HAMILTONIAN MECHANICS",

        lead:
        "Classical dynamics in phase space.",

        sections: [

            ["HAMILTONIAN", `

                <div class="formula">

                    $$

                    H=\\sum_i p_i\\dot q_i-L

                    $$

                </div>

            `],

            ["HAMILTON'S EQUATIONS", `

                <div class="formula">

                    $$

                    \\dot q_i
                    =
                    \\frac{\\partial H}{\\partial p_i}

                    $$

                    $$

                    \\dot p_i
                    =
                    -\\frac{\\partial H}{\\partial q_i}

                    $$

                </div>

            `]

        ]
    },


    hilbert: {

        title: "HILBERT SPACE",

        lead:
        "The mathematical state space of quantum mechanics.",

        sections: [

            ["STATE", `

                <div class="formula">

                    $$|\\psi\\rangle\\in\\mathcal H$$

                </div>

            `]

        ]
    },


    operators: {

        title: "QUANTUM OPERATORS",

        lead:
        "Operators represent measurable observables.",

        sections: [

            ["EIGENVALUE EQUATION", `

                <div class="formula">

                    $$

                    \\hat A|a\\rangle
                    =
                    a|a\\rangle

                    $$

                </div>

            `],

            ["COMMUTATOR", `

                <div class="formula">

                    $$

                    [A,B]=AB-BA

                    $$

                </div>

            `]

        ]
    },


    schrodinger: {

        title: "SCHRÖDINGER EQUATION",

        lead:
        "The equation governing nonrelativistic quantum evolution.",

        sections: [

            ["TIME EVOLUTION", `

                <div class="formula">

                    $$

                    i\\hbar
                    \\frac{\\partial}{\\partial t}
                    |\\psi(t)\\rangle
                    =
                    \\hat H|\\psi(t)\\rangle

                    $$

                </div>

            `]

        ]
    },


    spacetime: {

        title: "SPACETIME",

        lead:
        "Minkowski spacetime provides the geometric framework of special relativity.",

        sections: [

            ["INTERVAL", `

                <div class="formula">

                    $$

                    ds^2
                    =
                    c^2dt^2-dx^2-dy^2-dz^2

                    $$

                </div>

            `]

        ]
    },


    lorentz: {

        title: "LORENTZ TRANSFORMATIONS",

        lead:
        "Transformations preserving the spacetime interval.",

        sections: [

            ["TRANSFORMATION", `

                <div class="formula">

                    $$

                    x'=\\gamma(x-vt)

                    $$

                    $$

                    t'
                    =
                    \\gamma
                    \\left(
                    t-\\frac{vx}{c^2}
                    \\right)

                    $$

                </div>

            `]

        ]
    },


    energy: {

        title: "RELATIVISTIC ENERGY",

        lead:
        "Energy and momentum form a relativistic invariant.",

        sections: [

            ["ENERGY-MOMENTUM RELATION", `

                <div class="formula">

                    $$

                    E^2
                    =
                    p^2c^2+m^2c^4

                    $$

                </div>

            `]

        ]
    }

};


function openPhysicsTopic(id) {

    const topic = physicsTopics[id];

    document.getElementById("topicContent").innerHTML = `

        <div class="content">

            <div class="number">
                PHYSICS / TOPIC
            </div>

            <h1>${topic.title}</h1>

            <p class="lead">
                ${topic.lead}
            </p>

            ${topic.sections.map((section, index) => `

                <div class="content-section">

                    <h2>
                        ${String(index + 1).padStart(2, "0")}
                        — ${section[0]}
                    </h2>

                    ${section[1]}

                </div>

            `).join("")}

        </div>

    `;

    showPage("topic");
}


/* ================= FEATURED RESEARCH ================= */

const featuredResearch = {

    euler: {

        title: "THE EULER–LAGRANGE EQUATION",

        field: "Classical Mechanics",

        content: `

            <div class="content-section">

                <h2>THE ACTION</h2>

                <p>
                    Consider a Lagrangian
                    $L(q,\\dot q,t)$.
                </p>

                <div class="formula">

                    $$

                    S[q]
                    =
                    \\int_{t_1}^{t_2}
                    L(q,\\dot q,t)dt

                    $$

                </div>

            </div>


            <div class="content-section">

                <h2>STATIONARY ACTION</h2>

                <p>

                    Requiring

                    $$\\delta S=0$$

                    gives the Euler–Lagrange equation.

                </p>

                <div class="formula">

                    $$

                    \\boxed{

                    \\frac{d}{dt}
                    \\left(
                    \\frac{\\partial L}
                    {\\partial\\dot q}
                    \\right)
                    -
                    \\frac{\\partial L}
                    {\\partial q}
                    =0

                    }

                    $$

                </div>

            </div>

        `
    },


    residues: {

        title: "COMPLEX ANALYSIS AND RESIDUES",

        field: "Mathematical Physics",

        content: `

            <div class="content-section">

                <h2>LAURENT EXPANSION</h2>

                <div class="formula">

                    $$

                    f(z)
                    =
                    \\sum_{n=-\\infty}^{\\infty}
                    a_n(z-z_0)^n

                    $$

                </div>

            </div>


            <div class="content-section">

                <h2>RESIDUE</h2>

                <div class="formula">

                    $$

                    \\operatorname{Res}(f,z_0)
                    =
                    a_{-1}

                    $$

                </div>

            </div>


            <div class="content-section">

                <h2>RESIDUE THEOREM</h2>

                <div class="formula">

                    $$

                    \\oint_\\gamma f(z)dz
                    =
                    2\\pi i
                    \\sum_k
                    \\operatorname{Res}(f,z_k)

                    $$

                </div>

            </div>

        `
    }

};


function openResearch(id) {

    const research = featuredResearch[id];

    document.getElementById("articleContent").innerHTML = `

        <div class="content">

            <div class="number">
                FEATURED RESEARCH
            </div>

            <h1>${research.title}</h1>

            <p class="lead">
                ${research.field}
                • Yassine Bechir Dallel
            </p>

            ${research.content}

        </div>

    `;

    showPage("researchArticle");
}


/* ================= PERSONAL RESEARCH ================= */

function newResearch(type) {

    document.getElementById("editor").innerHTML = `

        <div class="editor">

            <h2>NEW ${type.toUpperCase()}</h2>

            <label>Title</label>

            <input
                id="researchTitle"
                placeholder="Enter title..."
            >


            <label>Field</label>

            <select id="researchField">

                <option>Mathematics</option>
                <option>Physics</option>
                <option>Calculus</option>
                <option>Real Analysis</option>
                <option>Complex Analysis</option>
                <option>Topology</option>
                <option>Classical Mechanics</option>
                <option>Quantum Mechanics</option>
                <option>Relativity</option>
                <option>Other</option>

            </select>


            <label>Content</label>

            <textarea
                id="researchText"
                placeholder="Write your research here..."
            ></textarea>


            <div class="editor-actions">

                <button onclick="saveResearch('${type}')">
                    SAVE
                </button>

                <button onclick="clearEditor()">
                    CLEAR
                </button>

            </div>

        </div>

    `;

}


function saveResearch(type) {

    const title =
        document.getElementById("researchTitle").value.trim();

    const field =
        document.getElementById("researchField").value;

    const text =
        document.getElementById("researchText").value.trim();


    if (!title || !text) {

        alert("Please enter a title and content.");

        return;
    }


    const saved =
        JSON.parse(
            localStorage.getItem("advResearch") || "[]"
        );


    saved.unshift({

        type: type,

        title: title,

        field: field,

        text: text,

        date: new Date().toLocaleString()

    });


    localStorage.setItem(
        "advResearch",
        JSON.stringify(saved)
    );


    clearEditor();

    renderResearch();

}


function clearEditor() {

    document.getElementById("editor").innerHTML = "";

}


function renderResearch() {

    const saved =
        JSON.parse(
            localStorage.getItem("advResearch") || "[]"
        );


    const container =
        document.getElementById("savedResearch");


    if (!saved.length) {

        container.innerHTML = "";

        return;
    }


    container.innerHTML = `

        <div class="saved">

            <h2>MY RESEARCH</h2>

            ${saved.map((item, index) => `

                <article>

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <div class="meta">

                        ${escapeHTML(item.field)}
                        •
                        ${escapeHTML(item.type)}
                        •
                        ${escapeHTML(item.date)}

                    </div>

                    <div class="saved-text">

                        ${escapeHTML(item.text)}

                    </div>

                    <button
                        class="delete"
                        onclick="deleteResearch(${index})">

                        DELETE

                    </button>

                </article>

            `).join("")}

        </div>

    `;

}


function deleteResearch(index) {

    const saved =
        JSON.parse(
            localStorage.getItem("advResearch") || "[]"
        );


    saved.splice(index, 1);


    localStorage.setItem(
        "advResearch",
        JSON.stringify(saved)
    );


    renderResearch();

}


/* ================= UTILITIES ================= */

function escapeHTML(text) {

    return String(text)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}


function typeset() {

    if (
        window.MathJax &&
        window.MathJax.typesetPromise
    ) {

        MathJax.typesetPromise().catch(() => {});

    }

}


function backToChapter() {

    showPage(lastChapter === "mathematics"
        ? "chapter"
        : "physicsChapter");

}


renderResearch();

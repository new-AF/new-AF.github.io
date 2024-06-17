class MyHTMLElement extends HTMLElement {
    /* mapping = {'data-project-title' : 'project-title'} */
    constructor(
        templateSelector,
        attributes = {},
        handlers = {},
        defaultHandlers = {
            class: "handleClass",
        },
        prepend = true
    ) {
        super();
        if (isUndefinedOrNull(templateSelector)) return;

        const template = document.querySelector(templateSelector);
        const content = template.content.cloneNode(true);
        this[prepend === true ? "prepend" : "append"](content);

        this.myAttributes = attributes;
        this.myHandlers = defaultHandlers;
        Object.entries(handlers).forEach(([attributeName, funcName]) => {
            this.myHandlers[attributeName] = funcName;
        });

        this.populate_Data_Attributes_Then_Remove_From(template);
        this.populate_Data_Attributes_Then_Remove_From(this);
        this.addTemplateClass(template);
        this.applyAttributes();
    }
    populate_Data_Attributes_Then_Remove_From(element) {
        Array.from(element.attributes)
            .filter((attr) => attr.name.startsWith("data-"))
            .forEach((attr) => {
                const [oldAttributeName, value] = [attr.name, attr.value];
                const attributeName = oldAttributeName.replace(/^(data-)/, "");
                /* passed attribute > element attribute */
                if (attributeName in this.myAttributes) return;
                this.myAttributes[attributeName] = value;
                element.removeAttribute(oldAttributeName);
            });
    }
    addTemplateClass(template) {
        const classNames = template.getAttribute("class");
        this.handleClass(classNames);
    }
    applyAttributes() {
        for (const [attribute, value] of Object.entries(this.myAttributes)) {
            const funcName = this.getHandlerName(attribute);
            if (isUndefinedOrNull(funcName) || funcName in this === false)
                continue;
            this[funcName](value);
        }
    }
    getHandlerName(attribute) {
        const funcName = this.myHandlers[attribute];
        return funcName;
    }
    handleClass(str) {
        if (isUndefinedOrNull(str)) return;
        this.classList.add(...str.split(" "));
    }
}
class MyRadioButton extends HTMLElement {
    constructor() {
        super();
        const template = document.querySelector("template.radio-button");
        const content = template.content.cloneNode(true);
        this.text = this.textContent;
        this.checked = this.getAttribute("checked") != null;
        this.data_Class = this.getAttribute("data-class");

        this.textContent = "";
        this.append(content);
        this.addEventListener("click", this.click);
    }
    connectedCallback() {
        this.input = this.querySelector("input");
        this.label = this.querySelector("label");

        this.input.checked = this.checked;
        this.label.textContent = this.text;
        if (this.data_Class !== null) this.input.classList.add(this.data_Class);
    }
    click(event) {
        this.input.click();
    }

    setName(str) {
        this.input.setAttribute("name", str);
    }
}
class MyRadioGroup extends HTMLElement {
    static count = 1;
    constructor() {
        super();
        this.name = `name ${MyRadioGroup.count}`;
        this.header = document.createElement("header");
        this.title = this.getAttribute("data-header-title");
        this.header.textContent = this.title;
        MyRadioGroup.count += 1;
    }
    connectedCallback() {
        this.prepend(this.header);

        this.addEventListener("click", this.click, true);

        Array.from(this.children)
            .filter((el) => el.nodeName.toLowerCase() === "radio-button")
            .forEach((el) => el.setName(this.name));
    }
    click() {
        // console.log("MyRadioGroup");
    }
}
class MyProjectCard extends HTMLAnchorElement {
    constructor() {
        super();

        const template = document.querySelector("template.project-card");
        const text = this.textContent;
        const alt = template.getAttribute("data-alt").replace("xx", text);
        this.textContent = "";
        const content = template.content.cloneNode(true);
        this.append(content);

        this.myAttributes = {
            title: this.getAttribute("data-title"),
            role: template.getAttribute("data-role"),
            alt: alt,
            "aria-label": template.getAttribute("data-aria-label"),
            liveLink: this.getAttribute("data-live-link"),
            repoLink: this.getAttribute("data-repo-link"),
            imgsrc: this.getAttribute("data-image-src"),
            imgclass: template.getAttribute("data-image-class"),
            description: this.getAttribute("data-description"),
            features: this.getAttribute("data-features").split("|"),
            stack: this.getAttribute("data-stack").split("|"),
        };

        this.myChildren = {
            title: this.querySelector(".title"),
            img: this.querySelector("img"),
            description: this.querySelector(".description"),
            liveLink: this.querySelector(".live-link"),
            repoLink: this.querySelector(".repo-link"),
            features: this.querySelector(".features"),
            stack: this.querySelector(".stack"),
        };

        this.classList.add(template.getAttribute("data-class"));
        this.setAttribute("role", this.myAttributes.role);
        this.setAttribute("aria-label", this.myAttributes["aria-label"]);

        this.myChildren.title.textContent = this.myAttributes.title;
        this.myChildren.img.src = this.myAttributes.imgsrc;
        this.myChildren.img.classList.add(this.myAttributes.imgclass);
        this.myChildren.img.setAttribute("alt", this.myAttributes.alt);
        this.myChildren.description.textContent = this.myAttributes.description;
        this.myChildren.liveLink.href = this.myAttributes.liveLink;
        this.myChildren.repoLink.href = this.myAttributes.repoLink;

        const lis1 = this.myAttributes.features.map((str) => {
            const el = document.createElement("li");
            el.textContent = str;
            return el;
        });
        const lis2 = this.myAttributes.stack.map((str) => {
            const el = document.createElement("li");
            el.textContent = str;
            return el;
        });
        this.myChildren.features.append(...lis1);
        this.myChildren.stack.append(...lis2);

        "data-live-link data-repo-link data-image-src data-description data-features data-stack"
            .split(" ")
            .forEach((str) => this.removeAttribute(str));
    }
    connectedCallback() {}
}
customElements.define("radio-button", MyRadioButton);
customElements.define("radio-group", MyRadioGroup);
customElements.define("project-card", MyProjectCard, {
    extends: "a",
});

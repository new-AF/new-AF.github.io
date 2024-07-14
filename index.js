/* 
mechanism to run 
queue
*/
class MyQueue {
    constructor() {
        this.map = new Map();
    }
    push(el) {
        this.map.set(el, true);
    }
    remove(el) {
        this.map.delete(el);
    }
    forEach(fun) {
        this.map.forEach(([value, key]) => fun(key));
    }
    forEachAndDequeue(fun) {
        this.map.forEach((value, key) => {
            fun(key);
            this.remove(key);
        });
    }
    map(fun) {
        return Array.from(this.map.keys(), (key) => fun(key));
    }
}
const QueueRunLater = new MyQueue();
class MyHTMLElement extends HTMLElement {
    /* mapping = {'data-project-title' : 'project-title'} */
    constructor(
        templateSelector,
        {
            attributes = {},
            handlers = {},
            afterHandlers = {},
            runLater = {},
            defaultHandlers = {
                class: "handleClass",
                id: "processID",
            },
            prepend = true,
        } = {}
    ) {
        super();
        if (isUndefinedOrNull(templateSelector)) return;

        const template = this._init(templateSelector, prepend);

        this.runLater = runLater;
        this.afterHandlers = afterHandlers;
        this.myAttributes = attributes;
        this.myHandlers = defaultHandlers;
        Object.entries(handlers).forEach(([attributeName, funcName]) => {
            this.myHandlers[attributeName] = funcName;
        });

        this._populate_Data_Attributes_Then_Remove_From(template);
        this._populate_Data_Attributes_Then_Remove_From(this);
        this._processAttributes();
        this._processRunLater_1();
    }
    _init(templateSelector, prepend) {
        const template = document.querySelector(templateSelector);
        const content = template.content.cloneNode(true);
        this[prepend === true ? "prepend" : "append"](content);
        return template;
    }
    _processRunLater_1() {
        if (isObjectEmpty(this.runLater)) return;
        QueueRunLater.push(this);
    }
    _processRunLater_2() {
        Object.entries(this.runLater)
            .filter(
                ([attribute, funcName]) =>
                    attribute in this.myAttributes && funcName in this
            )
            .forEach(([attribute, funcName]) => {
                const value = this.myAttributes[attribute];
                this[funcName](value);
            });
    }
    _populate_Data_Attributes_Then_Remove_From(element) {
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
    _processAttributes() {
        Object.entries(this.myAttributes)
            .filter(
                ([attribute, value]) =>
                    attribute in this.myHandlers &&
                    this.myHandlers[attribute] in this
            )
            .forEach(([attribute, value]) => {
                const methodName = this.myHandlers[attribute];
                this[methodName](value);
            });
    }
    getHandlerName(attribute) {
        const funcName = this.myHandlers[attribute];
        return funcName;
    }
    handleClass(str) {
        if (isUndefinedOrNull(str)) return;
        this.classList.add(...str.split(" "));
    }
    processID(id) {
        this.setAttribute("id", id);
    }
    isValidMethod(methodName) {
        return (
            isUndefinedOrNull(methodName) === false &&
            methodName in this === true
        );
    }
    connectedCallback() {
        const f = ([attribute, methodName]) => {
            if (this.isValidMethod(methodName) === false) return;
            const value = this.myAttributes[attribute];
            this[methodName](value);
        };

        const sendToChildren = ([selector, func]) => {
            return;
            const el = this.querySelector(selector);
            if (isUndefinedOrNull(el)) return;
            const result = el.setAttribute("data-run-later");
            const array = isUndefinedOrNull(result) ? [] : JSON.parse(result);
            array.push(JSON.parse(array));
        };

        Object.entries(this.afterHandlers).forEach(f);
    }
}
class MyHeader extends MyHTMLElement {
    constructor(attributes) {
        super("template.my-header", {
            attributes,
            handlers: { title: "processTitle" },
        });
    }
    processTitle(title) {
        selectorSetTextContent(this, ".change.title", title);
    }
}
class NavButton extends MyHTMLElement {
    constructor(attributes) {
        super("template.nav-button", {
            attributes,
            runLater: {
                title: "changeTitle",
                href: "changeHref",
                "only-icon": "processOnlyIcon",
            },
        });
    }
    _moveSVG() {
        const svg = this.querySelector("svg");
        svg.remove();
        const a = this.querySelector("a");
        a.append(svg);
    }
    connectedCallback() {
        this._moveSVG();
        setFillSVG(this, "svg");
    }
    changeHref(id) {
        selectorSetLinkHref(this, "a", id);
    }
    changeTitle(title) {
        const text = this.querySelector(".change.title");
        if (isUndefinedOrNull(text)) return;
        setTextContent(text, title);
    }
    processOnlyIcon(value) {
        if (value !== "true") return;
        this.querySelector("the-text").remove();
    }
}
class TheText extends MyHTMLElement {
    constructor(attributes) {
        super("template.the-text", {
            attributes,
            handlers: {
                title: "changeTitle",
            },
        });
    }
    changeTitle(title) {
        setTextContent(this, title);
    }
}
class MySection extends MyHTMLElement {
    constructor(template, originalObj) {
        const obj = { ...originalObj };
        super(template, obj);
    }
}

class ProjectCard extends MyHTMLElement {
    constructor(attributes) {
        super("template.project-card", {
            attributes,
            handlers: {
                title: "changeTitle",
                "live-link": "changeLiveLink",
                "repo-link": "changeRepoLink",
                "image-src": "changeImageSrc",
                description: "changeDescription",
                features: "changeFeatures",
                stack: "changeStack",
            },
        });
    }
    changeTitle(title) {
        selectorSetTextContent(this, "header .title", title);
    }
    changeImageSrc(fileName) {
        const path = `./images/${fileName}`;
        selectorSetImageSrc(this, ".image", path);
    }
    changeLiveLink(link) {
        selectorSetLinkHref(this, ".live-link", link);
    }
    changeRepoLink(link) {
        selectorSetLinkHref(this, ".repo-link", link);
    }
    changeDescription(text) {
        selectorSetTextContent(this, ".description", text);
    }
}
class AboutSection extends MySection {
    constructor(attributes) {
        super("template.about-section", {
            attributes,
            handlers: { text: "changeText" },
        });
    }
    changeText(text) {
        const array = text
            .split("|")
            .map((str) => str.trim())
            .filter((str) => str.length > 0);

        const ps = array.map((str) => {
            const el = document.createElement("p");
            el.textContent = str;
            return el;
        });
        this.append(...ps);
    }
}
class BlogProjects extends MySection {
    constructor(attributes) {
        super("template.blog-projects", { attributes });
    }
}
class ContactSection extends MySection {
    constructor(attributes) {
        super("template.contact-section", { attributes });
    }
    changeTitle(title) {
        selectorSetTextContent(this, ".change.title", title);
    }
}
class SocialMedia extends MyHTMLElement {
    constructor(attributes) {
        super("template.contact-social", {
            attributes,
            runLater: { title: "changeTitle", link: "changeLink" },
        });
    }
    connectedCallback() {
        this._moveSVG();
        setFillSVG(this, "svg");
    }
    _moveSVG() {
        const svg = this.querySelector("svg");
        svg.remove();
        const a = this.querySelector("a");
        a.append(svg);
    }
    changeTitle(title) {
        selectorSetTextContent(this, ".change.text", title);
    }
    changeLink(link) {
        selectorSetLinkHref(this, ".button-link", link);
    }
}
function isUndefinedOrNull(value) {
    return value === undefined || value === null;
}
function selectorSetTextContent(baseElement, query, text) {
    const element = baseElement.querySelector(query);
    setTextContent(element, text);
}
function selectorSetImageSrc(baseElement, query, path) {
    const image = baseElement.querySelector(query);
    image.src = path;
}
function selectorSetLinkHref(baseElement, query, link) {
    const element = baseElement.querySelector(query);
    element.setAttribute("href", link);
}
function setTextContent(element, text) {
    element.textContent = text;
}
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function setFillSVG(baseElement, query) {
    const svg = baseElement.querySelector(query);
    svg.setAttribute("fill", "currentColor");
}
My_JSONS = {};
customElements.define("my-header", MyHeader);
customElements.define("nav-button", NavButton);
customElements.define("the-text", TheText);
customElements.define("blog-projects", BlogProjects);
customElements.define("project-card", ProjectCard);
customElements.define("about-section", AboutSection);
customElements.define("contact-section", ContactSection);
customElements.define("social-media", SocialMedia);

function onload() {
    QueueRunLater.forEachAndDequeue((element) => {
        element._processRunLater_2();
    });
}

document.addEventListener("DOMContentLoaded", onload);

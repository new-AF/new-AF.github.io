const d = document;
const iframe = document.querySelector(".iframe-home");

const hideIframe = () => {
  console.log("***");
  iframe.classList.remove("iframe-home-show");
  iframe.classList.add("iframe-home-hide");
};
const showIframe = () => {
  console.log("***");
  iframe.classList.remove("iframe-home-hide");
  iframe.classList.add("iframe-home-show");
};
const onclick = (event) => {
  // const e= event.target;
  console.log("-----------");
  showIframe();
};

const portfolio = d.querySelector("#portfolio");

const projects = document.querySelectorAll(".project-item");

const [scrollLeft, scrollRight] = [
  d.querySelector(".scroll-left"),
  d.querySelector(".scroll-right"),
];

const iframeClose = document.querySelector("#iframe-home-close");

/* width to transition between cards;
for function `onScroll2` */
const delta = 10;
/* current .project-item card */
let currentIndex = 0;

/* ---------------- functions ---------------- */

const getPortfolioWidth = () => portfolio.scrollWidth;

const scrollLeftFunction = (event) => {
  const target = event.target;
  const x = target.scrollLeft;

  /* const width = getPortfolioWidth(); */
  const rest = delta * currentIndex - x;

  portfolio.scrollLeft -= delta;
};

const scrollRightFunction = (event) => {
  const target = event.target;

  /* const width = getPortfolioWidth(); */
  const chunk = delta;

  portfolio.scrollLeft += chunk;
};

const onScroll = (event) => {
  const width = getPortfolioWidth() - portfolio.clientWidth;
  const x = event.target.scrollLeft;

  // console.log('--x=',x,'--width=',width);

  if (x == width) {
    scrollRight.classList.add("scroll-right-hide");
  } else {
    scrollRight.classList.remove("scroll-right-hide");
    if (x > 0) {
      scrollLeft.classList.remove("scroll-left-hide");
    } else if (x == 0) {
      scrollLeft.classList.add("scroll-left-hide");
    }
  }
};
const width = getPortfolioWidth();
const gapOriginal = window.getComputedStyle(portfolio).columnGap;
const gap = parseFloat(gapOriginal);
const width0 = document.querySelector(
  "#portfolio > a:nth-child(1)"
).offsetWidth;
const children = Array.from(portfolio.children);
const childrenCount = children.length;

//shift cards left or right
const cardsMove = (x, units = "px") => {
  children.forEach((el) => {
    e.style.translate = `${x}${units}`;
  });
};
//apply `func` on all
const cardsApply = (func) => {
  children.forEach((el, index) => {
    func(el, index);
  });
};
const cardsUnscale = () => {
  cardsApply((el) => {
    el.classList.remove("project-item-scale-small");
    el.classList.remove("project-item-scale-medium");
    el.classList.remove("project-item-scale-large");
  });
};
//minimize all
// cardsApply((el) => el.classList.add("project-item-scale-small"));

// children[0].classList.add("project-item-scale-large");
const onScroll2 = (event) => {
  const cardWidth = children[0].offsetWidth;

  /* const delta = 10; */
  const count = childrenCount;
  const countMinus1 = count === 0 ? 0 : count - 1;
  const total = delta * count;

  const xTemp = event.target.scrollLeft;

  //reset when scrollbar exceeds `total`
  const x = xTemp >= total ? total : xTemp;

  // prevent when scrollbar exceeds `total`
  if (xTemp >= total) {
    portfolio.scrollTo(total, 0);
  }

  const index0 = Math.floor((x / total) * countMinus1);
  const index = index0 >= countMinus1 ? countMinus1 : index0;
  console.log(x, x / total, (x / total) * countMinus1, index);

  /*   if (index === currentIndex) {
    const plus = `translateX(${x}px)`;
    console.log(`--SAME plus=`, plus);

    children.forEach((el, elIndex) => {
      //push forward

      el.style.transform = plus;
    });
    
    return ;
  } */

  /*   important; this single statement
  1. enhances UX by not trying to freeze in the center;
  and causing jitters.
  2. gives immediate feedback;
   */
  if (index === currentIndex) {
    //cardsMove(x);
    return;
  }
  /*   if (index === 0) {
    console.log("+++ index=", index);
    const plus = `translate(${x}px,0px)`;
    // children[0].style.transform = `translateX(10px)`;
    children[0].style.translate = `${x}px 0`;

    return true;
  } */
  currentIndex = index;

  // console.log(event.timeStamp);

  /* center algorithm; translate left all cards
  with same value except 1st */
  const minus = index > 0 ? `-${index * cardWidth - x}px` : `${x}px`;

  console.log("--minus=", minus);
  cardsApply((el, elIndex) => {
    if (index === elIndex) {
      el.classList.add("project-item-scale-large");
    } else {
      el.classList.remove("project-item-scale-large");
    }

    el.style.translate = `${minus} 0`;
    /*    el.style.transform = `translateX(${minus})`;
    el.style.webkitTransform = `translateX(${minus})`;
    el.style.msTransform = `translateX(${minus})`; */
  });
};
const onload = (event) => {
  console.log("--onload");
  const b = portfolio.offsetWidth;
  const c = b / 2;

  const vline0 = document.querySelector(".vline");

  if (vline0 === null) {
    const a = document.createElement("div");
    a.classList.add("vline");
    document.querySelector("body").appendChild(a);
  }

  const vline = document.querySelector(".vline");
  vline.style.left = `${c + portfolio.offsetLeft}px`;

  onResize();
};
// window resize event
const mobilePx = 640;
const onResize = (event) => {
  //disable onscroll callback if mobile view
  const width = window.innerWidth;
  console.log("--onResize", width);
  if (width <= mobilePx) {
    portfolio.onscroll = null;
    cardsUnscale();
    console.log("--onResize portfolio.onscroll=", portfolio.onscroll);
  }
};
/* ---------------- other statements---------------- */

projects.forEach((e) => (e.onclick = onclick));

// zoom image on hover effect

projects.forEach((element) => {
  element.onmouseenter = (event) => {
    const target = event.target;
    target.children[0].classList.add("project-item-image-zoom");
  };
  element.onmouseleave = (event) => {
    const target = event.target;
    target.children[0].classList.remove("project-item-image-zoom");
  };
});

iframeClose.onclick = (e) => hideIframe();

scrollLeft.onclick = scrollLeftFunction;
// scrollLeft.onmousedown= scrollLeftFunction;

scrollRight.onclick = scrollRightFunction;
// scrollRight.onmousedown= scrollRightFunction;

/* for 1st card make it as if user already scrolled to it;
and is at card 1's edge */
portfolio.scrollTo(delta, 0);

// portfolio.onscroll = onScroll2;

/* set initially */
// window.onload = onload;

// window.onresize = onResize;

const menuItemsTemp = document.querySelectorAll(".popup-menu-item");
const menuItems = Array.from(menuItemsTemp);

menuItems.forEach((el) => {
  el.onclick = (event) => {
    const check = el.children[2];
    // check.classList.remove(".menu-item-select-mark-show");
    // check.classList.add(".menu-item-select-mark-hide");
    const value = check.style.visibility;
    console.log("--value=", value);
    check.style.visibility =
      value === "" || value === "visible" ? "hidden" : "visible";
  };
});

const menuCont = document.querySelector("#menu-container");

const menuClose = document.querySelector("#popup-menu-close-button");
const popupButton = document.querySelector("#popup-menu-button");

popupButton.onclick = (event) => {
  menuCont.style.visibility = "visible";
};

menuClose.onclick = (event) => {
  menuCont.style.visibility = "hidden";
};

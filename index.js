
const d=document;
const iframe= document.querySelector(".iframe-home");

const hideIframe= ()=>{
    console.log('***');
    iframe.classList.remove('iframe-home-show');
    iframe.classList.add('iframe-home-hide');
};
const showIframe= ()=>{
    console.log('***');
    iframe.classList.remove('iframe-home-hide');
    iframe.classList.add('iframe-home-show');
};
const onclick= event=>{
    // const e= event.target;
    console.log('-----------');
    showIframe();
};

const portfolio= d.querySelector('#portfolio');

const projects = document.querySelectorAll(".project-item");

const [scrollLeft, scrollRight]= [d.querySelector('.scroll-left'), d.querySelector('.scroll-right')];

const iframeClose= document.querySelector("#iframe-home-close");

// functions

const getPortfolioWidth= ()=>portfolio.scrollWidth;

scrollLeftFunction= event=>{
    const target= event.target;

    const width= getPortfolioWidth();
    const chunk= width / 50;

    portfolio.scrollLeft -= chunk;

};

scrollRightFunction= event=>{
    const target= event.target;

    const width= getPortfolioWidth();
    const chunk= width / 50;

    portfolio.scrollLeft += chunk;

};
// other statements

projects.forEach(e=> e.onclick=onclick);

// zoom image on hover effect

projects.forEach(element=> {
    element.onmouseenter= event=>{
            const target= event.target;
            target.children[0].classList.add('project-item-image-zoom');
        };
    element.onmouseleave= event=>{
        const target= event.target;
        target.children[0].classList.remove('project-item-image-zoom');
    };
});

iframeClose.onclick= e=> hideIframe();

scrollLeft.onclick= scrollLeftFunction;
scrollLeft.onmousedown= scrollLeftFunction;

scrollRight.onclick= scrollRightFunction;
scrollRight.onmousedown= scrollRightFunction;

portfolio.onscroll= event =>{
    const width= getPortfolioWidth() - portfolio.clientWidth;
    const x= event.target.scrollLeft;

    // console.log('--x=',x,'--width=',width);
   
    if(x==width){
        scrollRight.classList.add('scroll-right-hide');
    }
    else {
        scrollRight.classList.remove('scroll-right-hide');
        if(x>0){
            scrollLeft.classList.remove('scroll-left-hide');
        }
        else if(x==0){
            scrollLeft.classList.add('scroll-left-hide');
        }
    }

};
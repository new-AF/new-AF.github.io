const d=document
const w=window
const T = true
const F = !T

create = (i) => d.createElement(i)

each = (x,y) => x.forEach( i => y(i) )

function put(...args) {

    console.log('>',...args,'<')
}

function typeis(i,type) {

    return typeof(i) === type
}

function check(i,type, hardno) {

    if (!typeis(i,type))
        console.trace(`[check] i is not (${type}) (${i})`)

    if (hardno)
        throw `[check] hardno is (${hardno})`

}

function range(a,b) {
    try {
        [a, b] = a
    }

    catch (e) {

    }
    return [a,b]
}

function split(i,join,sep = ' ') {

    check(i,"string")

    a = i.split(sep)
    b = a
    if (join) {
        [x, y] = range(join)
        //put('xy' , x,y)

        //c = a.slice(x,y)
        //put ('c',c)
        b = b.slice(x,y)
        //put('b',b)
        b = b.join()
        //put('a',a)
        return b
    }

    return b.join()
}

function get(i) {

    check(i,"string")

    f = d.querySelector
    /*"1 xxxx" will trigger q...selectorAll*/
    if (i.startsWith('1 '))
        {
            i = split(i,1)
            f = d.querySelectorAll
        }
    //put('f.call',f)
    f = f.call(d,i)

    return f
}

function children(i) {

    if (typeis(i,'string'))
        i = get(i)
    //put('children',i)
    c = Array.from(i.children)
    return c
}


/*d.body.onresize = (e) => console.log(w.innerWidth)
contain.appendChild(p)
fill = function() {
    x = p.offsetWidth
    xx = nav.offsetWidth
    c = xx/(x*2)
    console.log(x+5)
    if (c != Infinity || c!= -Infinity)
    while(c-- > 0) {
        nx = p.cloneNode(1)

        contain.appendChild(nx)
    }
    console.log(xx);
    w.scroll(00,500)
}*/

function css(element, obj){
  for (i in obj) {
      element.style[i] = obj[i]
    }
}

// css(get('html'),{
//   'scroll-behavior': 'smooth'})
css(get('main'),{
  'scroll-behavior': 'smooth',
  'overflow-y': 'scroll',
  'height': '99vh',
  'scroll-snap-type': 'y mandatory',
})

get('body>header').setAttribute('id','H')
get('body>header>nav').setAttribute('id','N')
get('body>header>nav>ul').setAttribute('id','U')

each(get('1 section'), i=> css(i,{
  'scroll-snap-align':'start',
  'scroll-padding':'50vh',
  }))

children('#U').forEach((i) => { i.setAttribute('class','Li')
i.children[0].setAttribute('class','A')
})

style = create('style')
d.head.appendChild(style)
css(get('body'),{'width':'100%'})
style.sheet.insertRule('main,footer {margin-left:15.1rem;}')
style.sheet.insertRule('.A {margin:0;padding:0;background-color: whitesmoke; width:100%; height:100%;display: flex; justify-content:center; align-items:center;}')
style.sheet.insertRule('.Li {margin:0;height:100%}')
style.sheet.insertRule('#U {margin:0;height:inherit;width: 15rem;display: flex; flex-direction: column;}')
style.sheet.insertRule('#N {margin:0;/*position: fixed*/;height:100%; width:auto;top : 0;}')
style.sheet.insertRule('#H {margin:0;position: fixed;height:100%; width:auto;top : 0;}')
style.sheet.insertRule('.A {font-size:1.5em;}')

css(get('body'), {
  'overflow':'hidden',
  'height' : '100%'})

each(get('1 .A'), i=> put(i))
/*Array.from(get('1 .A')).slice(0,-1).forEach( (i) => {
  css(i,{'background-image':'linear-gradint'})
})*/



style.sheet.insertRule(".Li:not(:last-child)::after {content : '';display:block; height: 2px; background-image:linear-gradient(to right, white,gray,gray, white);}")

function radial(e) {
  target = e.currentTarget.children[0]
  x = e.offsetX
  y = e.offsetY

  //put(e)
  //put(target.)
  //put(target)
  css(target, {'background':`radial-gradient(circle farthest-side at ${x}px ${y}px, #ffa50057, whitesmoke 100%)`})
}

function leave(e) {
  target = e.currentTarget.children[0]
  css(target,{'background':'whitesmoke'})
}

//css('main',{'scroll-snap-type': 'y mandatory;'})

each( get('1 .A') , (i)=> {
  i.parentElement.addEventListener('mousemove',radial)
  i.parentElement.addEventListener('mouseleave',leave)
})

css(get('#personal'), {'justify-content':'space-around'})
each( Array.from(get('1 section>header>h2')) , i => i.style.visibility = 'hidden' )
each( Array.from(get('1 section')) , i => css(i,{'border' : 'none', }) )

function reorder(p) {
    x = p.childNodes

    //put(x)
    a = []
    b = []
    x.forEach( i=> {

      if (i.nodeName == 'STRONG')
      { /*put(i)*/ ; s = create('span') ; a.forEach( j => s.appendChild(j) ) ; a=[] ; b.push(s) ; b.push(i) }
      else {
        a.push(i)
      }
    })

    if (a.length)
      { /*put(i)*/ ; s = create('span') ; a.forEach( j => s.appendChild(j) ) ; a=[] ; b.push(s) }

    return (b.reverse())
}

function flexp(p, items) {
  css(p,{'display':'flex','justify-content':'space-between'})
  items.forEach( i => p.appendChild(i))
}

each(get('1 details>p'), i => {flexp(i,reorder(i))} )

style.sheet.insertRule('details {margin: 4rem auto;font-size:1.4em;}')
style.sheet.insertRule('section {margin-top:50vh}')
style.sheet.insertRule('#language-skills {font-size:1.5em;}')


style.sheet.insertRule('#personal {font-size:1.4em}')

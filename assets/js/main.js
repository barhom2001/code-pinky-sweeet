var serviceSection=document.getElementById('services');
var portfolioSection=document.getElementById('portfolio');
var resumeSection=document.getElementById('resume');
var contactSection=document.getElementById('contact');
var navbar=document.querySelector('.navbar');
var changeSection=document.getElementById('change-nav');
var scrollToTop=document.querySelector('.scrollToTop');
var loading=document.querySelector('.loading');
console.log(serviceSection);
navbar.style.transition='1s';
scrollToTop.style.opacity='0';
window.addEventListener('scroll',function(){
    if(this.window.scrollY<changeSection.offsetTop){
        navbar.style.backgroundColor='transparent';
    }
    if(this.window.scrollY>=changeSection.offsetTop){
        navbar.style.backgroundColor='white';
    }
    if(this.window.scrollY>=serviceSection.offsetTop){
        navbar.style.backgroundColor='white';
        scrollToTop.style.opacity='1';
    }
    if(this.window.scrollY<serviceSection.offsetTop){
        scrollToTop.style.opacity='0';
    }
    if(this.window.scrollY>=portfolioSection.offsetTop){
        navbar.style.backgroundColor='#EEE';
    }
    if(this.window.scrollY>=resumeSection.offsetTop){
        navbar.style.backgroundColor='#d9846c';
    }
    if(this.window.scrollY>=contactSection.offsetTop){
        navbar.style.backgroundColor='#EEE';
    }
})

scrollToTop.addEventListener('click',function(){
    window.scroll({
        top:0,
        behavior:"smooth",
    })
})
var links=document.querySelectorAll('.nav-link');
for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        e.preventDefault();
        var currentId=e.target.getAttribute('href');
        var targetSection=document.querySelector(currentId);
        window.scroll({
            top:targetSection.offsetTop,
            behavior:"smooth",
        })
    })
}
document.body.style.overflow='hidden';
window.addEventListener('load',function(){
    this.setTimeout(function(){
        loading.style.opacity='0';
        loading.style.visibility='hidden';
        loading.style.transition='1s';
        document.body.style.overflow='auto';
    },2000)
})
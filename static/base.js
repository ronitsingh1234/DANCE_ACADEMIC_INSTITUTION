const a = document.querySelector('.fa-arrow-right')
let slider = document.querySelector('.slider')
a.addEventListener('click', ()=>{
    slider.scrollBy({
        top:0,
        left:1520,
        behavior:'smooth'
    });
});



const b = document.querySelector('.fa-arrow-left')
let slider1 = document.querySelector('.slider')
b.addEventListener('click', ()=>{
    slider1.scrollBy({
        top:0,
        left:-1520,
        behavior:'smooth'
    });
});


window.addEventListener("scroll",()=>{
    document.querySelector(".long").style.marginTop = window.scrollY *  2 + "px";
    document.querySelector(".image1").style.marginLeft = window.scrollY * 1.2+ "px";
    document.querySelector(".image2").style.marginRight= window.scrollY * 1.2 + "px";
    document.querySelector(".image1").style.marginBottom= window.scrollY * 1.2 + "px";
    document.querySelector(".image2").style.marginBottom= window.scrollY * 1.2 + "px";
    document.querySelector(".image3").style.marginTop= window.scrollY * .4 + "px";
});




(()=>{var e=document.querySelector("#pricing_button");e&&e.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#pricing").scrollIntoView({behavior:"smooth"})}));var t=document.querySelector("#contact_button");t&&t.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#contacts").scrollIntoView({behavior:"smooth"})}));var o=document.querySelector("#first_arrow");o&&o.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#second_section").scrollIntoView({behavior:"smooth"})})),document.querySelectorAll(".second_arrow").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#fourth_section").scrollIntoView({behavior:"smooth"})}))}));var n=document.querySelectorAll(".reveal-element"),c=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&(e.target.classList.contains("qr-code")?(e.target.classList.add("flipInY"),e.target.classList.add("animated"),e.target.classList.add("reveal")):(e.target.classList.add("reveal"),c.unobserve(e.target)))}))}),{threshold:.5});n.forEach((function(e){c.observe(e)}));var r=document.querySelector("#landing_mobile_menu_button"),i=document.querySelector("#landing_mobile_menu"),l=document.querySelector("footer"),s=document.querySelectorAll("section");r&&r.addEventListener("click",(function(){i.classList.toggle("hidden"),l.classList.toggle("hidden"),s.forEach((function(e){e.classList.toggle("hidden")}))}));var a=document.querySelector("#mobile_pricing"),d=document.querySelector("#mobile_contact");a&&a.addEventListener("click",(function(){i.classList.toggle("hidden"),l.classList.toggle("hidden"),s.forEach((function(e){e.classList.toggle("hidden")})),document.querySelector("#pricing").scrollIntoView({behavior:"smooth"})})),d&&d.addEventListener("click",(function(){i.classList.toggle("hidden"),l.classList.toggle("hidden"),s.forEach((function(e){e.classList.toggle("hidden")})),document.querySelector("#contacts").scrollIntoView({behavior:"smooth"})}))})();
let stickyIcon = document.querySelector("#sticky");
stickyIcon.addEventListener("click" , function(){
    let stickyText = document.createElement("textarea");
    stickyText.setAttribute("id" , "sticky-text");
    createSticky(stickyText);
})
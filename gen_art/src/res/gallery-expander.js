let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        let section = this.parentElement;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            section.style.width = 48 + "%";
        } else {
            panel.style.maxHeight = panel.scrollHeight + 200 + "px";
            section.style.width = 98 + "%" ;
        }
    });
}

function createDiv(id,classes,contents,parent) {
    let div = document.createElement("div");
    if(id != null) {
        div.id = id;
    }
    if(classes != null) {
        div.classList = classes;
    }
    if(contents != null) {
        div.innerHTML = contents;
    }
    if(parent != null) {
        parent.appendChild(div);
    }

    return div;
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
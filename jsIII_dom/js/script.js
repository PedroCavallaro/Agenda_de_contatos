let adicionarContato = document.querySelector(".adicionarContato")
let contatos = document.querySelector(".contatos")
const novo = document.getElementById("novo")
const remover = document.getElementById("remover")
let vet = document.querySelectorAll(".newUl");


novo.addEventListener("click", ()=>{
    adicionarContato.innerHTML ="";
    addContatct("adicionarContato")
})
remover.addEventListener("click", ()=>{
    adicionarContato.innerHTML = "";
    removeContacts("adicionarContato")
})

window.addEventListener("load", ()=>{
    showContacts("contatos")
})
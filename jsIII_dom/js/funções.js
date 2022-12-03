function addContatct(divClass) {
    let agenda = document.querySelector(("."+divClass));
    
    let h3 = document. createElement("h3");
    h3.innerText ="Novo Contato:";
   
    let ul = document.createElement("ul");
    ul.classList.add("ul")

    let h3Nome = document.createElement("li");
    h3Nome.innerText = "Nome: ";
    

    let inputName = document.createElement("input");
    inputName.type = "text"
    inputName.classList.add("campo")
    h3Nome.appendChild(inputName);

    let liTel = document.createElement("li");
    liTel.innerText = "Telefone: ";

    let inputTel = document.createElement("input");
    inputTel.type = "text";
    inputTel.placeholder="(XX) XXXXX-XXXX"
    inputTel.maxLength ="11"
    inputTel.classList.add("campo");
    
    liTel.appendChild(inputTel)

    let br = document.createElement("br")
    let spanError = document.createElement("span")

    let save = document.createElement("input");
    save.type = "button"
    save.id = "save"
    save.value = "Salvar"
    
    liTel.appendChild(spanError)
    ul.append(h3Nome,br, liTel)
    agenda.append(h3, ul,save)

    save.addEventListener("click", ()=>{
        
        const campos = document.querySelectorAll(".campo");
        let camposValor = [];
        if(campos[0].value === "" || campos[1].value === "" ||  isNaN(campos[1].value)){
            spanError.innerHTML ="corrija seus dados"
        }else{
            inputTel.value = inputTel.value.replace(/^(\d{0})(\d{2})(\d{4,5})/, "$1($2)$3-");
            spanError.innerHTML ="";
            let nomes = [];
            let Telefone = [];

            if(localStorage.getItem("Telefone")){
                Telefone = lerDados("Telefone")
            }
            if(localStorage.getItem("nomes")){
                nomes = lerDados("nomes");
            }

            nomes.push(campos[0].value)
            Telefone.push(campos[1].value)
            gravaDados("nomes", nomes)
            gravaDados("Telefone", Telefone)
            showNewContact("contatos")
            campos[0].value ="";
            campos[1].value = "";
        }
    })
}
function showNewContact(divClass){
    let contatos = document.querySelector(("."+ divClass));
    nomes = lerDados("nomes");
    Telefone = lerDados("Telefone");
        
        let ul = document.createElement("ul");
        ul.classList.add("newUl");
       
        

        const remove = document.createElement("input");
        remove.type ="button";
        remove.value = "X"
        remove.classList.add("remove");

        for (let i = 0; i < Telefone.length; i++) {
            ul.id = parseFloat(i+1);
            remove.id = parseFloat(i+1)
        }
        let h3Nome = document.createElement("h3");
        h3Nome.innerText = nomes[nomes.length -1]
        let labalNome = document.createElement("label");
        h3Nome.appendChild(document.createElement("br"))
        h3Nome.appendChild(labalNome)
        h3Nome.classList.add("nome")

        let liTel = document.createElement("li");
        liTel.innerText = "Telefone: ";
        
        let labelTel = document.createElement("label")
        labelTel.innerHTML = Telefone[Telefone.length -1]
        labelTel.classList.add("tel");

        liTel.appendChild(labelTel);

        ul.append(h3Nome, liTel, remove, document.createElement("br"))
        contatos.append(ul)

        remove.addEventListener('click', ()=>{
           removeButton(labelTel)
        })
        
    
}
function showContacts(divClass){
    let contatos = document.querySelector(("."+ divClass));
    nomes = lerDados("nomes");
    Telefone = lerDados("Telefone");
    
    for (let i = 0; i < Telefone.length; i++) {
        let ul = document.createElement("ul");
        ul.classList.add("newUl");
        ul.id = parseFloat(i+1);

        const remove = document.createElement("input");
        remove.type ="button";
        remove.value = "X"
        remove.id = parseFloat(i+1)
        remove.classList.add("remove");

        let h3Nome = document.createElement("h3");
        h3Nome.innerText = nomes[i]
        let labalNome = document.createElement("label");
        h3Nome.appendChild(document.createElement("br"))
        h3Nome.appendChild(labalNome)
        h3Nome.classList.add("nome")

        let liTel = document.createElement("li");
        liTel.innerText = "Telefone: ";
        let labelTel = document.createElement("label")
        labelTel.innerHTML = Telefone[i]
        labelTel.classList.add("tel")

        liTel.appendChild(labelTel);
        ul.append(h3Nome, liTel, remove)
        contatos.append(ul);

        remove.addEventListener('click', ()=>{
            removeButton(labelTel)

        })
    }
}

function removeContacts(divClass){
    let ul = document.querySelectorAll(".newUl");
    let removeArea = document.querySelector(("." + divClass));

    let h3 = document.createElement("h3");
    h3.innerText = "Remover Contato"
    let labelTel = document.createElement("label");
    labelTel.innerHTML = "Telefone que deseja remover:  "
    labelTel.classList.add("labelTel");
    
    let inputTel = document.createElement("input");
    inputTel.type = "text"
    inputTel.classList.add("inputTel")
    
    let buttonRemove = document.createElement("input");
    buttonRemove.type = "button";
    buttonRemove.value = "Remover";
    buttonRemove.id = "removeContact"
    let br = document.createElement("br");
    labelTel.append(inputTel)
    
    removeArea.append(h3, labelTel, document.createElement("br"),buttonRemove)
   
    buttonRemove.addEventListener("click", ()=>{
        inputTel.value = inputTel.value.replace(/^(\d{0})(\d{2})(\d{4,5})/, "$1($2)$3-");
        let telLocal = lerDados("Telefone")
        if(telLocal.indexOf(inputTel.value) !== -1){

            let position = telLocal.indexOf(inputTel.value);
          
            ul[position].remove();
            const nomes = document.querySelectorAll(".nome");
            let nomeVal = [];
            const tel = document.querySelectorAll(".tel");
            let telVal = [];

            for (let i = 0; i < tel.length; i++) {
        
                nomeVal[i] = nomes[i].innerText;
                telVal[i] = tel[i].innerHTML;
            }

            gravaDados("Telefone", telVal)
            gravaDados("nomes",nomeVal)

        }else{
            window.alert("Esse numero não existe na base de dados")
        }
    })

}
function removeButton(labelTel){
    const ul = document.querySelectorAll(".newUl")
    let telLocal = lerDados("Telefone")

        if(telLocal.indexOf(labelTel.innerHTML) !== -1){

            let position = telLocal.indexOf(labelTel.innerHTML);
            ul[position].remove();
            const nomes = document.querySelectorAll(".nome");
            let nomeVal = [];
            const tel = document.querySelectorAll(".tel");
            let telVal = [];

            for (let i = 0; i < tel.length; i++) {
                nomeVal[i] = nomes[i].innerText;
                telVal[i] = tel[i].innerHTML;
            }

            gravaDados("Telefone", telVal)
            gravaDados("nomes",nomeVal)
        }
    }
function gravaDados(nomeChave, conteudo) {
    if (window.localStorage) {
        let dados = JSON.stringify(conteudo);
        localStorage.setItem(nomeChave, dados);
        //alert(dados);
    } else {
        alert("Operação não disponível.");
    }
}
function lerDados(nomeChave) {
    //localStorage.clear();
    if (window.localStorage) {
        let aux = JSON.parse(
            localStorage.getItem(nomeChave));
        let dados;
        if (aux != null) {
            dados = aux;
        } else {
            dados = [];
        }
        return dados;
    } else {
        alert("operacao não disponível");
    }
    return false;
}

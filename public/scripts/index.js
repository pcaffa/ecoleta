const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//quando clicar no botao de pesquisar, remove a classe hide(ocultar)
//ou seja, vai apresentar a modal
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//quando clicar no botao de x dentro da modal, add a classe hide(ocultar)
//ou seja, vai ocultar a modal
close.addEventListener("click" , () => {
    modal.classList.add("hide")
})


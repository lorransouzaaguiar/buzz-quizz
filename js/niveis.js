export const QuizzLevelPage = (numberOfLevels, formQuestions) => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-niveis')

        const niveis = []

        for (let i = 0; i < numberOfLevels; i++) {
            const nivel = `
                <div class="novo-nivel" id="novo-nivel">
                    <h3>Nível ${i + 1}</h3>
                    <img  src="./imagens/Vector.svg">
                </div> 
                <div class="criar-nivel escondido" id="criar-nivel" >
                    <h3>Nível 2</h3>
                    <input placeholder="    Título do nível">  </input>
                    <input placeholder="    % acerto mínimo" id = "acerto-minimo" >  </input>
                    <input placeholder="    URL da imagem de nível">  </input>
                    <input placeholder="    Descrição do nível"> </input>
                </div>
            `
            niveis.push(nivel)
        }

        page.innerHTML = `
            <h2>Agora, decida os níveis</h2>
            <div class="criar-nivel" id="criar-nivel">
                <h3>Nível 1</h3>
                <input placeholder="    Título do nível">  </input>
                <input placeholder="    % acerto mínimo" id = "acerto-minimo">  </input>
                <input placeholder="    URL da imagem de nível">  </input>
                <input placeholder="    Descrição do nível"> </input>
            </div>
            ${niveis.map(nivel => nivel)}
            <button class="finalizar">Finalizar Quizz</button>
        `
        return page
    }

    const formLevelQuizz = () => {
        let botaoNivel = document.querySelector('.finalizar')

        botaoNivel.onclick = () => {
            const todosInputsNivelValidos = []

            const { respostaValidas, dados } = validarNiveisQuizz(todosInputsNivelValidos)

            console.log(formQuestions)
            console.log(dados)
            if (respostaValidas) {
                console.log('validado')

            } else {
                alert('Preencha os dados corretamente!')
            }
            todosInputsNivelValidos.length = 0
        }
    }

    return { render, formLevelQuizz }
}


export function validarNiveisQuizz(todosInputsNivelValidos) {
    let inputsNivel = document.querySelector('.criar-nivel')
    console.log(inputsNivel)

    let tituloNivel = inputsNivel.children[1].value

    if (tituloNivel.length >= 10) {

        todosInputsNivelValidos.push(true)

    } else {
        todosInputsNivelValidos.push(false)
    }

    let acertoMinimo = inputsNivel.children[2].value

    if (parseInt(acertoMinimo) >= 0 && parseInt(acertoMinimo) <= 100) {

        todosInputsNivelValidos.push(true)

    } else {

        todosInputsNivelValidos.push(false)

    }

    let urlImagemNivel = inputsNivel.children[3].value

    if (urlImagemNivel.match('https?:\/\/.*\.(?:png|jpg)')) {

        todosInputsNivelValidos.push(true)
    } else {

        todosInputsNivelValidos.push(false)

    }

    let descriçaoNivel = inputsNivel.children[4].value

    if (descriçaoNivel.length >= 30) {

        todosInputsNivelValidos.push(true)

    } else {

        todosInputsNivelValidos.push(false)

    }

    let verificarPorcentagem = Object.values(document.querySelectorAll('#acerto-minimo'))

    const acerto = verificarPorcentagem.filter((input) => input.value == 0)

    if (acerto.length !== 0) {

        console.log('VALIDADO')

    } else {

        console.log('deu ruim')
    }

    let respostaValidas = todosInputsNivelValidos.every((resposta) => resposta)

    return {
        respostaValidas, dados: {
            tituloNivel,
            acertoMinimo,
            urlImagemNivel,
            descriçaoNivel,
            verificarPorcentagem
        }
    }
}

export function abrirNovoNivel() {

    let botaoNovoNivel = Object.values(document.querySelectorAll('.novo-nivel img'))
    console.log(botaoNovoNivel)

    botaoNovoNivel.forEach((botao, index) => {

        botao.onclick = () => {
            console.log(index)
            let removerEscondido = Object.values(document.querySelectorAll('.escondido'))[index]
            console.log(removerEscondido)



            removerEscondido.classList.remove('escondido')

            let removerNovoNivel = Object.values(document.querySelectorAll('.novo-nivel'))[index]

            removerNovoNivel.classList.add('escondido')

        }

    })
}

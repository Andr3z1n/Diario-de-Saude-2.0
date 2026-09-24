
// Importa o prompt para receber dados do terminal
const prompt = require("prompt-sync")()

// Classe principal do registro alimentar
class RegistroAlimentar {

    // Conta os registros criados
    static total = 0

    // Atributos privados
    #calorias
    #agua

    // Recebe os dados do registro
    constructor(cafe, almoco, jantar, lanches, calorias, agua) {

        // Guarda a data atual
        this.data = new Date().toLocaleDateString("pt-BR")

        // Guarda as refeições
        this.cafe = cafe
        this.almoco = almoco
        this.jantar = jantar
        this.lanches = lanches

        // Guarda as calorias e a água
        this.calorias = calorias
        this.agua = agua

        // Aumenta o total de registros
        RegistroAlimentar.total++
    }

    // Getter das calorias
    get calorias() {
        return this.#calorias
    }

    // Setter das calorias
    set calorias(valor) {
        this.#calorias = valor
    }

    // Getter da água
    get agua() {
        return this.#agua
    }

    // Setter da água
    set agua(valor) {
        this.#agua = valor
    }

    // Método que será utilizado pela classe filha
    gerarResumo() {
        return ""
    }

    // Retorna o total de registros
    static mostrarTotal() {
        return RegistroAlimentar.total
    }
}

// Herança: classe filha do registro alimentar
class RegistroCompleto extends RegistroAlimentar {

    // Gera o resumo do registro
    gerarResumo() {
        return `
DIÁRIO ALIMENTAR (${this.data})
--------------------------------
Café da manhã: ${this.cafe}
Almoço: ${this.almoco}
Jantar: ${this.jantar}
Lanches: ${this.lanches}
--------------------------------
Calorias: ${this.calorias} kcal
Água: ${this.agua} ml
`
    }
}

// Factory: cria os registros
class RegistroFactory {

    // Método que cria um novo registro
    static criar(cafe, almoco, jantar, lanches, calorias, agua) {

        // Retorna um objeto da classe RegistroCompleto
        return new RegistroCompleto(
            cafe,
            almoco,
            jantar,
            lanches,
            calorias,
            agua
        )
    }
}

// Classe que gerencia o diário
class DiarioAlimentar {

    // Cria o histórico vazio
    constructor() {
        this.historico = []
    }

    // Adiciona um registro
    adicionarDia(registro) {
        this.historico.push(registro)
        console.log("Registro adicionado!")
    }

    // Exibe o histórico e o resumo geral
    exibirHistorico() {

        // Verifica se o histórico está vazio
        if (this.historico.length === 0) {
            console.log("O diário está vazio!")
            return
        }

        // Soma as calorias de todos os registros
        const totalCalorias = this.historico.reduce(
            (total, registro) => total + registro.calorias, 0
        )

        // Soma toda a água consumida
        const totalAgua = this.historico.reduce(
            (total, registro) => total + registro.agua, 0
        )

        // Exibe todos os registros
        this.historico.forEach(registro => { // passar por todos os registros do histórico e mostrar cada um na tela.
            console.log(registro.gerarResumo()) // o forEach significa: Faça alguma coisa para cada item da lista. 
        })                                       //Então: ele quer dizer Para cada registro que está no histórico

        // Exibe o resumo geral
        console.log("\n===== RESUMO GERAL =====") // esse \n é um comando para pular uma linha dentro de um texto.
        console.log("Total de registros: " + this.historico.length)
        console.log("Calorias estimadas: " + totalCalorias + " kcal")
        console.log("Água consumida: " + totalAgua + " ml")
    }
}

// Classe responsável pelo menu
class Menu {

    // Cria o diário e inicia a opção
    constructor() {
        this.diario = new DiarioAlimentar() //preparar o objeto Menu quando ele é criado
        this.opcao = "" // As aspas vazias "" significam nenhum texto ainda
    }

    // Executa o menu
    executar() {

        // Mantém o menu aberto até escolher sair
        while (this.opcao !== "3") {  // while é um comando usado para repetir um código enquanto uma condição for verdadeira.
            //⬆ Enquanto a opção não for 3, continue repetindo.

            // Mostra as opções
            console.log("\n===== DIÁRIO ALIMENTAR =====")  // esse \n é um comando para pular uma linha dentro de um texto.
            console.log("1 - Adicionar registro")
            console.log("2 - Ver histórico e resumo geral")
            console.log("3 - Sair")

            // Recebe a opção
            this.opcao = prompt("Escolha: ")

            // Cadastro de registro
            if (this.opcao === "1") { // === significa "é exatamente igual a".

                // Recebe as refeições
                const cafe = prompt("Café da manhã: ")
                const caloriasCafe = Number(prompt("Calorias do café: "))

                const almoco = prompt("Almoço: ")
                const caloriasAlmoco = Number(prompt("Calorias do almoço: "))

                const jantar = prompt("Jantar: ")
                const caloriasJantar = Number(prompt("Calorias do jantar: "))

                const lanches = prompt("Lanches: ")
                const caloriasLanches = Number(prompt("Calorias dos lanches: "))

                // Soma as calorias das refeições
                const calorias = caloriasCafe + caloriasAlmoco + caloriasJantar + caloriasLanches

                // Recebe a quantidade de água
                const agua = Number(prompt("Água consumida em ml: "))

                // Mostra as calorias estimadas
                console.log("\n===== CALORIAS DO DIA =====")
                console.log("Café: " + caloriasCafe + " kcal")
                console.log("Almoço: " + caloriasAlmoco + " kcal")
                console.log("Jantar: " + caloriasJantar + " kcal")
                console.log("Lanches: " + caloriasLanches + " kcal")
                console.log("Total estimado: " + calorias + " kcal")

                // Cria o registro usando a Factory
                const registro = RegistroFactory.criar(    // o programa está criando um novo registro do Diário Alimentar usando o Factory.
                    cafe,
                    almoco,
                    jantar,
                    lanches,
                    calorias,
                    agua
                )

                // Adiciona o registro ao histórico
                this.diario.adicionarDia(registro)

            // Consulta o histórico
            } else if (this.opcao === "2") { //Caso a opção não seja a anterior, mas seja igual a 2

                // Exibe os registros e o total geral
                this.diario.exibirHistorico()

            // Sai do programa
            } else if (this.opcao === "3") {

                console.log("Encerrando o diário...")

            // Opção inválida
            } else {

                console.log("Opção inválida!")
            }
        }

        // Mostra o total de registros criados
        console.log("Total de registros: " + RegistroAlimentar.mostrarTotal())
    }
}

// Cria o objeto do menu
const menu = new Menu()

// Inicia o programa
menu.executar() // Execute o método executar() do objeto menu
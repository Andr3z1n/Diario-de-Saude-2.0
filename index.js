
// Importa o prompt para receber dados do terminal
const prompt = require("prompt-sync")()

// Classe principal do registro alimentar
class RegistroAlimentar { 

    // Conta os registros criados
    static total = 0 // static: faz com que a variável pertença à classe
                    //  RegistroAlimentar, e não a cada objeto criado.

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
        RegistroAlimentar.total++ //Toda vez que um novo registro alimentar é criado,
                                  //essa linha aumenta o contador em uma unidade.
    }

    // Getter das calorias
    get calorias() {
        return this.#calorias // # um encapsulamento isso é um atributo privado.
    }

    // Setter das calorias
    set calorias(valor) {       // o setter permite alterar o valor das calorias,
        this.#calorias = valor  //  mantendo o encapsulamento do atributo privado.
    }

    // Getter da água
    get agua() {            // permite consultar a quantidade de água armazenada
        return this.#agua   //  no atributo privado, mantendo o encapsulamento.
    }

    // Setter da água
    set agua(valor) {        // permite alterar a quantidade de água consumida, mantendo o encapsulamento do atributo privado.
        this.#agua = valor   //consumida, mantendo o encapsulamento do atributo privado.
    }

    // Método que será utilizado pela classe filha
    gerarResumo() {     // gerar um resumo do registro alimentar.
        return ""      // o "" não retorna nada no momento
    }

    // Retorna o total de registros
    static mostrarTotal() { // static: faz com que o método pertença à classe, e não ao objeto.
        return RegistroAlimentar.total  // acessa o contador que guarda
    }                                   //  a quantidade de registros alimentares criados.
}

// Herança: classe filha do registro alimentar
class RegistroCompleto extends RegistroAlimentar {
// extends: indica que uma classe está herdando características de outra classe.
    
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
            // o criar: é o nome do método responsável por criar um novo registro alimentar.
        // Retorna um objeto da classe RegistroCompleto
        return new RegistroCompleto(  // cria um novo objeto RegistroCompleto com os dados das
            cafe,                     //  refeições, calorias e água e retorna esse objeto para o programa.
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
    constructor() {   // prepara o objeto quando ele é criado.
           // cria o histórico do diário e começa com uma
        this.historico = []   //  lista vazia para guardar os registros alimentares.
    }

    // Adiciona um registro
    adicionarDia(registro) {
        this.historico.push(registro)  // coloca o registro dentro da lista historico.
        console.log("Registro adicionado!")  //
    }

    // Exibe o histórico e o resumo geral
    exibirHistorico() {

        // Verifica se o histórico está vazio
        if (this.historico.length === 0) {     // conta quantos registros existem.
            console.log("O diário está vazio!") //=== 0 → verifica se a quantidade é exatamente 0.
            return
        }

        // Soma as calorias de todos os registros
        const totalCalorias = this.historico.reduce( // o reduce() soma as calorias de todos os registros do histórico.
            (total, registro) => total + registro.calorias, 0 // pega as calorias de cada registro e vai somando até chegar ao total.
        )

        // Soma toda a água consumida
        const totalAgua = this.historico.reduce( // // o reduce() soma as calorias de todos os registros do histórico.
            (total, registro) => total + registro.agua, 0
        )

        // Exibe todos os registros
        this.historico.forEach(registro => { // passar por todos os registros do histórico e mostrar cada um na tela.
            console.log(registro.gerarResumo()) // o forEach significa: Faça alguma coisa para cada item da lista. 
        })                                       //Então: ele quer dizer Para cada registro que está no histórico

        // Exibe o resumo geral
        console.log("\n===== RESUMO GERAL =====") // esse \n é um comando para pular uma linha dentro de um texto.

        // Mostra a quantidade total de registros cadastrados no histórico
        console.log("Total de registros: " + this.historico.length)  // O length conta quantos registros alimentares existem dentro da lista historico.
        console.log("Calorias estimadas: " + totalCalorias + " kcal") // a soma das calorias estimadas de todos os registros alimentares.
        console.log("Água consumida: " + totalAgua + " ml") // quantidade total de água consumida em todos os registros alimentares.
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
                        // !== => “é diferente de 3”.
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
                const cafe = prompt("Café da manhã: ")  // Pede para o usuário informar o que comeu no café da manhã
                const caloriasCafe = Number(prompt("Calorias do café: ")) // Converte para número as calorias informadas no café da manhã

                const almoco = prompt("Almoço: ") // Pede para o usuário informar o que comeu no almoço
                const caloriasAlmoco = Number(prompt("Calorias do almoço: ")) // // Converte para número as calorias informadas no almoço

                const jantar = prompt("Jantar: ") // Pede para o usuário informar o que comeu no jantar
                // Converte para número as calorias informadas no jantar
                const caloriasJantar = Number(prompt("Calorias do jantar: "))

                // Pede para o usuário informar o que comeu nos lanches
                const lanches = prompt("Lanches: ")

                // Converte para número as calorias informadas nos lanches
                const caloriasLanches = Number(prompt("Calorias dos lanches: "))

                // Soma as calorias do café, almoço, jantar e lanches
                const calorias = caloriasCafe + caloriasAlmoco + caloriasJantar + caloriasLanches

                // Pede a quantidade de água consumida e converte o valor para número
                const agua = Number(prompt("Água consumida em ml: "))

                // Mostra as calorias estimadas
                console.log("\n===== CALORIAS DO DIA =====")
                console.log("Café: " + caloriasCafe + " kcal")
                console.log("Almoço: " + caloriasAlmoco + " kcal")
                console.log("Jantar: " + caloriasJantar + " kcal")
                console.log("Lanches: " + caloriasLanches + " kcal")
                console.log("Total estimado: " + calorias + " kcal")

                // Cria o registro usando a Factory
                const registro = RegistroFactory.criar( // o programa está criando um novo registro do Diário Alimentar usando o Factory.
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
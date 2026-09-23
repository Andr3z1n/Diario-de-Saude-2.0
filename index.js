class RegistroAlimentar {
    //Constructor para método especial executado automaticamente
    //  quando criamos um novo objeto da classe. 
    // É nele que inicializamos os atributos do objeto.⬇
    constructor(cafeDamanha, almoco, jantar, lanches, caloriasEstimadas, Aguaml) {
        this.cafeDamanha = cafeDamanha
        this.almoco = almoco
        this.jantar = jantar
        this.lanches = caloriasEstimadas
        this.Aguaml = Aguaml
    }
}

// Aqui vamos usar um Actions (Método) Além de
//  armazenar informações, um objeto também pode executar ações.
gerarResumo() {
    return `
    📝 DIÁRIO ALIMENTAR DE HOJE (${this.dataRegistro})--------------------------------------------------
☕ Café da Manhã: ${this.cafeDaManha}
🍛 Almoço:        ${this.almoco}
🍕 Jantar:        ${this.jantar}
🍏 Lanches:       ${this.lanches}
--------------------------------------------------
🔥 Total de Calorias: ${this.caloriasEstimadas} kcal
💧 Água Consumida:    ${this.aguaMl} ml
==================================================
`}


class DiarioAlimentar {
    constructor() {
        // Inicializa uma lista vazia no 'this' deste gerenciador para guardar os dias
        this.historico = [] // esse "[]" ⬅significa uma lista vazia "tecnicamente chamada de Array ou Vetor no JavaScript".
    }

    adicionarDia(registro) { // ⬅aqui é a ação 'adicionarDia' e abre a porta "registro" para receber os dados de um dia alimentício.
        this.historico.push(registro) // ⬅Pega o objeto que acabou de entrar e o empurra ".push" para dentro da lista "this.historico".
        console.log(`✅ Dia ${registro.dataRegistro} adicionado com sucesso!`)
    }

    exibirHistorico() {
        if (this.historico.length === 0) {
            console.log("O diário ainda está vazio.")
            return
        }
        // Percorre a lista chamando o método de cada objeto armazenado
        this.historico.forEach(registro => {
            console.log(registro.gerarResumo())
        })
    }
}

// --- Executando o teste na prática ---

// 1. Instanciamos o gerenciador do diário
const meuDiario = new DiarioAlimentar();

// 2. Criamos um novo registro (o operador 'new' dispara o 'constructor')
const dia1 = new RegistroAlimentar(
    "Tapioca com queijo coalho e café com leite",
    "Arroz, feijão corda, carne de sol acebolada e salada",
    "Cuscuz com ovos mexidos",
    "Uma maçã e uma xícara de chá verde",
    1800,
    2200
)

// 3. Salvamos o objeto dentro do diário
meuDiario.adicionarDia(dia1)

// 4. Imprimimos o relatório no console
meuDiario.exibirHistorico()

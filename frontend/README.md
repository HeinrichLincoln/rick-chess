# Frontend rick-chess

aplicaçao em react

é dividido em 2 partes models e components

models: tambem dividido em 2

board: é a classe que cria o tabuleiro com a posiçao inicial ja definida e algumas funcoes de auxilio como getSquare
piece: é a classe que cria a peca tambem com funcoes de auxilio como getSymbol

components: sao eles que são renderizados na tela dentre eles temos

square: o componente quadrado que renderiza um quadrado de cor branca ou preta com alguma peça ou nao
board: o componente tabuleiro que reenderiza uma matriz com 64 components quadrados nas suas posiçoes certas
button: o componente que reenderiz um botao toda vez que uma jogada é feita armazenado ela no historico
game: componente que cuida das regras de todos os outros componentesresponsavel por passas informaçoes(props) de um componente para outro
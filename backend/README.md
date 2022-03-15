# Backend rick-chess

API express do meu jogo de xadrez

é formado por 4 parte que o divide:

controllers: que é responsavel por mandar funcoes mais basicas e de mais facil copreensao para as routes

routes: que por sua vez é o arquivo o qual define o que cada caminho do browse vai fazer

- /board -> retorna o tabuleiro
- /result -> retorn o resultado do jogo
- /movement -> onde permite que o jogador faça um movimento
- /reset -> chamada responsavel por resetar o jogo para que possa ser começado um novo jogo
- /draw -> atualiza o reultado para empate

models: nessa pasta tem 3 arquivos:

- Board -> é a classe que cria o tabuleiro com a posiçao inicial ja definida e algumas funcoes de auxilio
- ThreatBoard -> é uma classe que contem uma matriz que representa o tabuleiro indicando em qual casa as peças ameaçam
- Piece -> é a classe que responsaavel pro criar uma peça (symbol, color)

service:

a pasta onde ficam as funcoes masi complexas responsaveis pelas regras do jogo, é dividida em dois arquivos:

moves: arquivo que indica se é possível fazer determinado movement ou nao sendo o caso invalid move
check: arquivo que diz se o rei esta em cheque, se tem saida ou se é checkmate

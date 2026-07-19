# Seu próximo Linux

Um site interativo e educativo que ajuda pessoas iniciantes ou pouco familiarizadas com o ecossistema Linux a encontrar uma combinação de **distribuição Linux e ambiente gráfico** adequada às suas preferências, necessidades e hardware.

Além do questionário de recomendação, o projeto reúne explicações sobre metodologia, distribuições, termos comuns, segurança e cuidados antes da instalação.

> **Acesse o projeto:** [inserir endereço do GitHub Pages]

## Sobre o projeto

Escolher uma distribuição Linux pode ser confuso para quem está começando. Existem dezenas de projetos, ambientes gráficos, modelos de atualização e filosofias diferentes, frequentemente apresentados por meio de listas genéricas ou recomendações baseadas apenas na preferência pessoal de quem escreve.

O **Seu próximo Linux** procura oferecer um caminho mais transparente.

O teste considera características como:

* preferência entre estabilidade e software recente;
* tolerância a manutenção e resolução de problemas;
* interesse em aprender sobre o funcionamento do sistema;
* desejo de controle ou de uma experiência pronta para uso;
* preferência por ferramentas gráficas;
* estilo de interface e fluxo de trabalho;
* personalização do ambiente gráfico;
* limitações e necessidades de hardware;
* finalidade principal do computador.

O resultado não apresenta apenas o nome de uma distribuição. Ele recomenda uma combinação completa, como:

* Linux Mint com Cinnamon;
* Fedora com KDE Plasma;
* Debian com GNOME;
* openSUSE Tumbleweed com KDE Plasma.

Essa separação é importante porque o ambiente gráfico influencia diretamente a experiência cotidiana. Duas instalações da mesma distribuição podem oferecer fluxos de trabalho, consumo de recursos e possibilidades de personalização muito diferentes.

## Mais do que um teste

O projeto também funciona como um material introdutório para quem está conhecendo o ecossistema Linux.

### Sobre e metodologia

A página `sobre.html` explica:

* como o questionário funciona;
* quais fatores são avaliados;
* como as respostas são transformadas em eixos;
* como a compatibilidade é calculada;
* como o hardware influencia o resultado;
* como funcionam os níveis de complexidade;
* quais são as limitações da metodologia;
* como as respostas são armazenadas localmente.

### Glossário Linux

A página `glossario.html` reúne explicações introdutórias para termos encontrados em tutoriais, fóruns e documentações.

Entre os conceitos abordados estão:

* Linux e kernel;
* distribuição;
* ambiente gráfico;
* terminal e shell;
* root e `sudo`;
* pacotes, dependências e repositórios;
* Flatpak, Snap e AppImage;
* Wayland e X11;
* driver e firmware;
* UEFI, bootloader e dual boot;
* partições e sistemas de arquivos.

O glossário possui pesquisa local para ajudar o visitante a localizar rapidamente um termo.

### Guia de distribuições

A página `guia.html` apresenta os projetos considerados pelo teste e explica suas principais características.

O guia aborda aspectos como:

* base da distribuição;
* modelo de atualização;
* ambientes gráficos disponíveis;
* público ao qual a proposta costuma atender;
* principais vantagens;
* pontos que devem ser considerados antes da escolha;
* nível de complexidade adotado pelo teste;
* endereço oficial do projeto.

As distribuições são organizadas por projeto, e não apenas por edição. Fedora com GNOME e Fedora com KDE Plasma, por exemplo, são tratados como experiências diferentes no teste, mas pertencem ao mesmo projeto no guia.

### Segurança e comandos perigosos

A página `seguranca.html` apresenta orientações básicas para usuários iniciantes, com atenção especial ao uso do terminal.

Ela aborda:

* atualizações de segurança;
* backups;
* fontes confiáveis de software;
* privilégios mínimos;
* funcionamento de `sudo` e da conta root;
* cuidados antes de copiar comandos da internet;
* identificação correta de discos e diretórios;
* comandos destrutivos ou potencialmente perigosos;
* permissões;
* scripts baixados e executados diretamente;
* procedimentos básicos quando algo dá errado.

Os comandos perigosos são apresentados apenas para reconhecimento e acompanhados de explicações sobre seus riscos e formas mais seguras de verificar o alvo de uma operação.

## Objetivos

O projeto tem como objetivos:

1. facilitar o primeiro contato com o ecossistema Linux;
2. reduzir recomendações genéricas ou inadequadas;
3. considerar distribuição e ambiente gráfico separadamente;
4. explicar os motivos por trás de cada resultado;
5. apresentar alternativas com propostas diferentes;
6. evitar recomendar sistemas excessivamente complexos para pessoas que não desejam esse nível de envolvimento;
7. preservar a privacidade das respostas;
8. ensinar conceitos necessários para interpretar tutoriais e documentações;
9. alertar sobre riscos comuns durante instalação e manutenção;
10. incentivar pesquisa, testes em sessão live e realização de backups.

O projeto não pretende determinar qual é a “melhor distribuição Linux”. Essa resposta depende do contexto, das preferências e das necessidades de cada pessoa.

## Como o teste funciona

O questionário possui duas partes principais.

### Preferências pessoais

A primeira parte contém 50 afirmações respondidas em uma escala de concordância de 0 a 5:

```text
0 = Discordo totalmente
1 = Discordo
2 = Discordo parcialmente
3 = Concordo parcialmente
4 = Concordo
5 = Concordo totalmente
```

Também existe a opção **“Não sei responder”**.

Essa resposta não é considerada neutra. Quando selecionada, a pergunta é ignorada no cálculo dos eixos relacionados.

As afirmações ajudam a construir um perfil com 17 eixos:

* estabilidade;
* atualidade;
* baixa manutenção;
* autonomia técnica;
* controle do sistema;
* sistema pronto para uso;
* preferência por ferramentas gráficas;
* interesse em aprender;
* comunidade e documentação;
* tolerância a software proprietário;
* interface tradicional;
* disposição para aprender um novo fluxo de trabalho;
* personalização da interface;
* riqueza visual;
* economia de recursos;
* fluxo orientado ao teclado;
* automação da organização de janelas.

### Hardware e finalidade de uso

A segunda parte contém 10 perguntas objetivas sobre condições que podem alterar a recomendação, como:

* pouca memória;
* armazenamento mecânico;
* hardware recente;
* placa de vídeo Nvidia;
* gráficos híbridos;
* múltiplos monitores e telas de alta resolução;
* periféricos;
* jogos;
* máquinas virtuais e tarefas pesadas;
* programas ou equipamentos indispensáveis.

Respostas negativas não penalizam nenhuma distribuição. Respostas positivas ajustam a compatibilidade e podem produzir alertas.

## Cálculo da compatibilidade

Cada afirmação contribui para um ou mais eixos por meio de pesos positivos ou negativos.

As respostas são centralizadas:

```text
resposta centralizada = (resposta - 2,5) / 2,5
```

Depois, cada eixo é normalizado para um valor entre 0 e 100.

O perfil do usuário é comparado com o perfil editorial de cada combinação de distribuição e ambiente gráfico.

A compatibilidade é calculada a partir da distância entre esses perfis:

```text
compatibilidade = 100 - distância ponderada
```

Quando há necessidades de hardware marcadas como positivas, a nota final utiliza:

```text
85% preferências
15% adequação ao hardware
```

O percentual não representa uma probabilidade ou garantia de satisfação. Ele indica apenas a proximidade entre o perfil informado e os parâmetros cadastrados.

## Níveis de complexidade

As opções são classificadas em três níveis.

### Assistido

Distribuições com instalação guiada, decisões previamente configuradas, ferramentas gráficas e pouca manutenção esperada.

### Intermediário guiado

Distribuições que podem exigir alguma leitura, ajustes ocasionais e compreensão básica do ecossistema Linux.

### Autonomia alta

Distribuições que pressupõem acompanhamento de atualizações, consulta a documentação e capacidade de resolver problemas com maior independência.

O teste calcula a prontidão do usuário para esses níveis considerando:

```text
50% autonomia técnica
30% interesse em aprender
20% tolerância à manutenção
```

Uma opção mais complexa pode aparecer como **rota futura**, em vez de recomendação imediata.

O Arch Linux puro não é recomendado para o público inicial do projeto. Pessoas interessadas nesse ecossistema podem receber alternativas como BigLinux, CachyOS ou EndeavourOS, de acordo com seu nível de autonomia.

## Resultados

O teste pode apresentar:

* uma recomendação principal;
* até quatro alternativas;
* uma opção mais simples;
* uma opção mais conservadora;
* uma opção mais atual;
* uma possível rota futura.

Cada resultado pode incluir:

* percentual estimado de compatibilidade;
* distribuição;
* ambiente gráfico;
* nível de complexidade;
* motivos da recomendação;
* pontos fortes;
* concessões;
* alertas relacionados ao hardware;
* link para o projeto oficial.

O resultado também exibe os principais eixos do usuário para que a recomendação possa ser compreendida, e não apenas aceita como uma resposta arbitrária.

## Privacidade

O projeto funciona inteiramente no navegador.

As respostas:

* não são enviadas para um servidor;
* não exigem cadastro;
* não são associadas a uma identidade;
* são processadas localmente;
* podem ser armazenadas no `localStorage` para preservar o progresso.

O usuário pode reiniciar o teste e remover os dados locais pela própria interface.

O site não utiliza inteligência artificial para processar as respostas.

## Tecnologias

O projeto utiliza:

* HTML semântico;
* CSS;
* JavaScript com módulos ES;
* arquivos JSON;
* `localStorage`;
* Python apenas para validação auxiliar dos dados;
* GitHub Pages para hospedagem.

Não há backend, banco de dados ou processamento remoto.

## Estrutura geral

```text
.
├── index.html
├── teste.html
├── resultado.html
├── sobre.html
├── glossario.html
├── guia.html
├── seguranca.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── data-loader.js
│   ├── questionnaire.js
│   ├── scoring.js
│   ├── hardware.js
│   ├── complexity.js
│   ├── results.js
│   └── storage.js
├── data/
│   ├── axes.json
│   ├── questions.json
│   ├── distros.json
│   └── complexity-levels.json
└── tools/
    └── validate_data.py
```

A estrutura pode mudar durante o desenvolvimento.

## Executando localmente

Como o projeto utiliza módulos JavaScript e arquivos carregados por `fetch`, ele deve ser aberto por meio de um servidor HTTP local.

Com Python instalado:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

Também é possível utilizar qualquer servidor local compatível com arquivos estáticos.

## Validação dos dados

Os arquivos JSON podem ser verificados com:

```bash
python tools/validate_data.py
```

O validador verifica, entre outros pontos:

* quantidade de perguntas;
* identificadores duplicados;
* referências a eixos inexistentes;
* perfis incompletos;
* níveis de complexidade inválidos;
* valores fora do intervalo esperado.

## Uso de inteligência artificial

Ferramentas de inteligência artificial generativa foram utilizadas como apoio durante a criação deste projeto.

O uso incluiu atividades como:

* organização inicial do conceito;
* discussão e refinamento dos eixos avaliados;
* elaboração e revisão das afirmações;
* proposta inicial de pesos e perfis editoriais;
* estruturação dos arquivos JSON;
* geração e revisão assistida de código;
* criação da interface;
* produção e revisão da documentação;
* elaboração do glossário;
* organização do guia de distribuições;
* estruturação do conteúdo introdutório sobre segurança;
* identificação de inconsistências;
* criação de cenários simulados para testes.

O ChatGPT foi utilizado principalmente na concepção, organização do questionário, estruturação dos dados, elaboração de textos e revisão do projeto.

O Codex foi utilizado como apoio na implementação, organização e revisão do código.

As respostas produzidas por ferramentas de inteligência artificial não foram consideradas automaticamente corretas ou definitivas. O conteúdo foi selecionado, revisado, adaptado e aprovado pelo responsável pelo projeto.

As decisões editoriais, a escolha das distribuições, a definição da metodologia, a interpretação dos resultados e a publicação final permanecem sob responsabilidade humana.

A presença de conteúdo gerado ou auxiliado por IA é informada por transparência. O teste em si não consulta modelos de inteligência artificial e nenhuma resposta do usuário é enviada a essas ferramentas.

## Metodologia e limitações

Os pesos das perguntas e os perfis atribuídos às distribuições são avaliações editoriais iniciais.

Eles não resultam de:

* pesquisa acadêmica validada;
* estudo psicométrico;
* testes controlados de hardware;
* parceria oficial com as distribuições;
* aprovação dos mantenedores dos projetos mencionados.

Distribuições Linux mudam com o tempo. Recursos, instaladores, ambientes gráficos, ciclos de lançamento e políticas de atualização podem evoluir.

A compatibilidade real também depende de fatores que um questionário não consegue prever completamente, como:

* modelo exato dos componentes;
* firmware;
* periféricos específicos;
* programas indispensáveis;
* comportamento de drivers;
* preferências subjetivas;
* disposição do usuário para aprender;
* qualidade do suporte disponível para determinado hardware.

O resultado deve ser entendido como ponto de partida para pesquisa e experimentação, não como garantia.

Sempre que possível, recomenda-se:

1. fazer backup dos dados importantes;
2. testar a distribuição em uma sessão live;
3. verificar o funcionamento de Wi-Fi, áudio, vídeo e periféricos;
4. pesquisar a compatibilidade dos programas indispensáveis;
5. compreender as alterações de partições antes da instalação.

## Segurança

As informações de segurança possuem caráter introdutório e educativo.

Os exemplos de comandos perigosos existem para ajudar o usuário a reconhecer padrões de risco. Eles não devem ser executados sem compreensão completa de sua finalidade, origem e alvo.

O projeto não se responsabiliza por perda de dados ou danos decorrentes da execução de comandos, alteração de partições ou instalação de sistemas operacionais.

Faça backup e confirme que os dados podem ser restaurados antes de modificar discos.

## Contribuições

Contribuições são bem-vindas, especialmente para:

* revisar perguntas e pesos;
* corrigir descrições;
* atualizar informações sobre distribuições;
* ampliar ou corrigir o glossário;
* revisar orientações de segurança;
* melhorar a acessibilidade;
* testar diferentes perfis;
* identificar resultados incoerentes;
* aprimorar o design;
* corrigir problemas de código;
* melhorar a documentação.

Ao sugerir mudanças nos pesos ou perfis, explique o motivo e, quando possível, apresente exemplos de resultados afetados.

Informações sobre distribuições e segurança devem, preferencialmente, ser acompanhadas de referências oficiais.

## Marcas e projetos mencionados

Os nomes, logotipos e marcas das distribuições e ambientes gráficos pertencem aos seus respectivos titulares.

Este é um projeto independente e não possui afiliação oficial com as distribuições avaliadas.

## Autor

Desenvolvido por **Arthur Silva**.

Criado como um projeto independente para ajudar quem chega ao Linux sem entregar um mapa desenhado por alguém que acredita que todo iniciante deveria compilar o próprio kernel antes do café.

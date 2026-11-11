# Pesquisa de referências — Guias turísticos digitais

**Projeto:** Descubra RO · **Checkpoint de planejamento:** 11/11/2026

## Objetivo

Analisar como guias turísticos digitais apresentam destinos e ajudam o visitante a encontrar informações. A pesquisa orienta a escolha de funcionalidades e a organização do conteúdo para a primeira versão do Descubra RO.

## Critérios de análise

- Organização dos destinos e clareza da navegação.
- Pesquisa por nome e filtros por localização ou tipo de passeio.
- Apresentação das categorias turísticas, das fotografias e das informações de visita.
- Recursos de acessibilidade identificados nas páginas consultadas.

A análise se baseia nas páginas públicas consultadas em 11/11/2026. Os recursos de acessibilidade foram identificados por observação das páginas. O funcionamento com teclado e leitor de tela, o contraste e a adaptação a celulares deverão ser verificados durante os testes do Descubra RO.

## Referências analisadas

| Referência | O que foi observado | Aplicação no Descubra RO |
| --- | --- | --- |
| **Rondônia Tem Turismo — SETUR/RO** | O portal oferece um campo de busca e separa pontos turísticos, roteiros, gastronomia e outros serviços. Na listagem de pontos, o município aparece junto ao nome do local. Há roteiros de municípios como Porto Velho, Costa Marques e Cacoal. | Usar o portal como ponto de partida para pesquisar atrações rondonienses. Mostrar o município no cartão de cada atrativo e manter os roteiros em uma seção própria quando forem incluídos. [Pontos turísticos](https://rondoniatemturismo.ro.gov.br/Turismo?categorias=Turismo%2CBalne%C3%A1rios) · [Roteiros turísticos](https://rondoniatemturismo.ro.gov.br/Roteiro/Listar) |
| **Turismo em Minas Gerais — SECULT-MG** | A página agrupa cidades em destaques e sugestões de viagem, como bate e volta e fim de semana. O formulário apresenta opções por região e circuito turístico. | Adaptar a busca geográfica ao tamanho do catálogo inicial com um filtro por município. Reservar filtros por região para quando houver destinos suficientes para justificar esse agrupamento. [Página de destinos](https://minasgerais.com.br/pt/destinos) |
| **Visit Brasil — Embratur** | A página inicial oferece busca e apresenta experiências por temas, como aventura, ecoturismo, patrimônio histórico e gastronomia. Usa imagens e chamadas para explorar conteúdos. Também inclui um link para pular diretamente ao conteúdo. | Usar categorias visíveis na página inicial e cartões com foto, título e município. Prever acesso direto ao conteúdo principal e verificar a navegação por teclado. [Página inicial](https://www.visitbrasil.com/) |
| **Rota Cultural de Porto Velho — Prefeitura de Porto Velho** | A publicação municipal descreve um roteiro com 18 pontos e informa que a rota reúne endereço, horário, contato e uma breve apresentação dos locais. A página consultada mostra uma foto com legenda e oferece opções de tamanho de fonte e alto contraste. | Padronizar as informações práticas de cada atrativo e identificar a fonte dos dados. Verificar se o conteúdo continua legível com ampliação de texto e contraste adequado. [Publicação sobre a Rota Cultural](https://www.portovelho.ro.gov.br/noticias/turismo-rota-cultural-de-porto-velho-pode-ser-consultada-on-line) |

## Funcionalidades propostas para o Descubra RO

| Prioridade | Funcionalidade | Proposta |
| --- | --- | --- |
| Primeira versão | Página inicial | Exibir atrativos em destaque e oferecer acesso direto às categorias e à busca. |
| Primeira versão | Busca e filtros | Buscar pelo nome do atrativo, mesmo sem acentos, e combinar filtros de município e categoria. Mostrar uma mensagem quando a busca não retornar resultados e oferecer uma opção para limpar os filtros. |
| Primeira versão | Categorias | Usar as quatro categorias previstas pela equipe. Natureza e Ecoturismo, História e Cultura, Gastronomia e Sabores Regionais, e Aventura e Lazer. |
| Primeira versão | Lista e detalhes dos atrativos | Exibir nome, município, categoria e imagem no cartão. Nos detalhes, incluir descrição, localização, fonte, data de conferência e informações de visita confirmadas, como horário, preço, contato ou necessidade de agendamento. |
| Primeira versão | Acessibilidade e uso no celular | Usar textos legíveis, contraste adequado, foco visível, rótulos claros para busca e filtros e texto alternativo nas imagens informativas. Conferir o fluxo com teclado e em telas pequenas. |
| Após a primeira versão | Roteiros turísticos e favoritos | Manter os dois recursos previstos no projeto. Introduzir roteiros com paradas e duração aproximada quando houver atrativos suficientes. Incluir favoritos depois que a busca e as páginas de detalhes estiverem funcionando. |
| Evolução futura | Mapa interativo | Avaliar a implementação conforme o catálogo crescer. Na primeira versão, apresentar a localização em texto e usar um link de rota quando houver endereço confirmado. |

As categorias e as funcionalidades previstas foram conferidas no [README do projeto](https://github.com/oliveiraisabelly514-dev/descubra-ro#-funcionalidades-previstas) e na [tarefa de pesquisa dos destinos](https://github.com/oliveiraisabelly514-dev/descubra-ro/issues/5). A ordem acima é uma proposta para validação da equipe.

## Exemplo de aplicação

**Três Caixas d’Água** · Porto Velho · História e Cultura

No catálogo, o cartão mostra o nome, o município, a categoria e uma foto autorizada com o devido crédito. Nos detalhes, uma breve descrição explica a presença do atrativo na Rota Cultural da capital. Endereço, condições de visita e demais informações práticas devem ser conferidos antes da publicação. [Referência municipal](https://www.portovelho.ro.gov.br/noticias/turismo-rota-cultural-de-porto-velho-pode-ser-consultada-on-line)

## Como verificar a proposta na etapa de testes

1. Encontrar as Três Caixas d’Água pela busca, inclusive ao digitar “tres caixas” sem acento.
2. Combinar os filtros de Porto Velho e História e Cultura, abrir um resultado e localizar a fonte das informações de visita.
3. Limpar os filtros e recuperar a lista inicial. Em uma busca sem resultados, conferir se a interface oferece um próximo passo.
4. Repetir o caminho no celular e com teclado, verificando a legibilidade, a ordem do foco e a identificação dos controles.

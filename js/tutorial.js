import { FHA_2025_HELP } from "./fha-2025-help.js";

const SOURCES = [
  {
    label: "Manual FHA 2025 (base do veículo)",
    note: "Seções de pneus, freio, motor, ERS, suspensão e MFD.",
  },
  {
    label: "Formula 1 — Glossário técnico",
    href: "https://www.formula1.com/en/latest/article/f1-glossary-a-e.1MFONigMlQSbSQtpP7YCy2",
    note: "Downforce, cambagem, freio e linguagem básica de pista.",
  },
  {
    label: "Formula 1 — pneus e temperatura",
    href: "https://www.formula1.com/en/latest/article/tech-tuesday-the-very-different-red-bull-ferrari-and-mercedes-solutions-to.4g7wKT5yJCzEwqJtXfDkCN",
    note: "Relação entre temperatura, freios, distribuição de peso e aderência.",
  },
  {
    label: "Formula 1 — suspensão e altura",
    href: "https://www.formula1.com/en/latest/article/tech-tuesday-why-was-red-bulls-pace-advantage-cut-so-dramatically-at.7J2OtKGx36iWUfyJcCP00H",
    note: "Como altura, plataforma aerodinâmica e zebras mudam o compromisso do setup.",
  },
  {
    label: "Pirelli — pneus de Fórmula 1",
    href: "https://www.pirelli.com/global/en-ww/race/racingspot/formula-1/the-importance-of-tyres-in-formula-1-53772/",
    note: "Pressão, cambagem negativa, aquecimento e contato com o asfalto.",
  },
  {
    label: "Racecar Engineering — suspensão",
    href: "https://www.racecar-engineering.com/tech-explained/racecar-suspension/",
    note: "Cambagem, toe e contato do pneu durante a rolagem.",
  },
  {
    label: "Racecar Engineering — molas e amortecedores",
    href: "https://www.racecar-engineering.com/tech-explained/springs-and-dampers/",
    note: "Rigidez, transferência lateral de carga e controle do movimento.",
  },
  {
    label: "HP Academy — setup no molhado",
    href: "https://www.hpacademy.com/courses/motorsport-wheel-alignment-fundamentals/analysing-alignment-at-the-track-wet-vs-dry-setup/",
    note: "Por que suavizar barras, amortecedores e cambagem em baixa aderência.",
  },
];

const FAQ_ITEMS = [
  {
    question: "O carro perde a traseira quando passo pela zebra. O que devo ajustar?",
    start: "Comece diminuindo um clique no amortecimento de compressão rápida traseiro (DAMP_FAST_BUMP) e, se a traseira também salta ao sair da zebra, no retorno rápido (DAMP_FAST_REBOUND). “Rápida” descreve a velocidade do movimento da suspensão no impacto, não a velocidade do carro. Se bater no fundo, aumente a altura traseira (ROD_LENGTH_LR/RR).",
    example: "Compressão rápida traseira (DAMP_FAST_BUMP_LR/RR) 10 → 9. Teste; se ainda houver salto no retorno, DAMP_FAST_REBOUND_LR/RR 8 → 7. Se raspar no fundo, altura traseira (ROD_LENGTH_LR/RR) 5 → 6.",
    related: "Os amortecimentos trabalham com molas, barras e curso da suspensão. DAMP_FAST_BUMP/REBOUND tratam movimentos rápidos; DAMP_BUMP/REBOUND (compressão/retorno lentos) influenciam mais a plataforma em frenagem, rolagem e transições. Ajuste o conjunto pelo sintoma: não reduza os quatro valores automaticamente. Se os ajustes rápidos não resolverem uma zebra isolada, avalie PACKER_RANGE e altura antes de mexer nos lentos.",
    check: "Se o problema acontece só na zebra, priorize amortecimento rápido e curso de suspensão antes de mexer em asa ou diferencial.",
    references: [
      "https://www.racecar-engineering.com/tech-explained/springs-and-dampers/",
      "https://www.hpacademy.com/courses/motorsport-wheel-alignment-fundamentals/analysing-alignment-at-the-track-wet-vs-dry-setup/",
    ],
  },
  {
    question: "O carro perde a traseira em curva de alta. O que devo ajustar?",
    start: "Se a instabilidade aumenta com a velocidade e aparece em apoio, aumente um clique na asa traseira (WING_1). Se acontece ao reacelerar, selecione um mapa de acelerador mais progressivo (Throttle Map) ou ajuste o diferencial na saída (Diff Exit).",
    example: "Asa traseira (WING_1) 8 → 9; se for patinagem na saída, Diff Exit 7 → 8 ou Throttle Map 5 → 2.",
    related: "Asa dianteira (WING_0) e traseira (WING_1) formam o equilíbrio aerodinâmico: adicionar só traseira tende a dar estabilidade, mas também pode aumentar subesterço e arrasto. Altura (ROD_LENGTH) e batentes (PACKER_RANGE) influenciam a plataforma; diferencial e mapa do acelerador só são o foco se o sintoma ocorrer sob potência.",
    check: "Se a instabilidade cresce com a velocidade, trate primeiro o equilíbrio aerodinâmico; mais asa traseira aumenta estabilidade, mas reduz velocidade de reta.",
    references: [
      "https://www.formula1.com/en/latest/article/f1-glossary-a-e.1MFONigMlQSbSQtpP7YCy2",
      "https://www.formula1.com/en/latest/article/tech-tuesday-why-was-red-bulls-pace-advantage-cut-so-dramatically-at.7J2OtKGx36iWUfyJcCP00H",
    ],
  },
  {
    question: "O carro tem dificuldade em contornar curva lenta. O que devo ajustar?",
    start: "Identifique a fase: na entrada, experimente reduzir o balanço de freio dianteiro (FRONT_BIAS), o diferencial de entrada (Diff Entry), a pré-carga (DIFF_PRELOAD) ou o freio motor (EB). Se falta rotação no ápice, aumente um passo na barra estabilizadora traseira.",
    example: "Balanço de freio (FRONT_BIAS) 58 → 57,5 ou pré-carga (DIFF_PRELOAD) 80 → 70; no ápice, barra traseira 3 → 4.",
    related: "FRONT_BIAS e EB atuam principalmente na entrada/frenagem; Diff Entry e DIFF_PRELOAD influenciam a ação do diferencial nessa transição. No meio da curva, considere a barra e o Diff MID. Mude apenas o ajuste correspondente à fase do sintoma; asa costuma ter pouco efeito em curva lenta.",
    check: "Em baixa velocidade há pouco efeito aerodinâmico. Confirme linha, velocidade e liberação do freio antes de mudar asas; faça apenas um ajuste por vez.",
    references: [
      "https://www.simracercentral.com/sim-racing-car-setup-guide/",
      "https://www.hpacademy.com/courses/suspension-tuning-and-optimization/lateral-load-transfer-basics-total-lateral-load-transfer-distribution-and-tuning/",
    ],
  },
  {
    question: "O carro perde tração na reaceleração. O que devo ajustar?",
    start: "Selecione um mapa de acelerador mais progressivo (Throttle Map 1 ou 2). Se uma roda traseira patina na saída, aumente um passo o bloqueio do diferencial na saída (Diff Exit); se o carro passa a sair de frente, reduza esse bloqueio.",
    example: "Throttle Map 5 → 2; se houver patinagem, Diff Exit 7 → 8. Se surgir subesterço de potência, volte de 8 para 7.",
    related: "Throttle Map controla como o torque chega ao piloto; Diff Exit controla como as rodas traseiras compartilham esse torque. Eles trabalham juntos, mas não são o mesmo ajuste. Mola/barra traseira, pressão e temperatura dos pneus também afetam tração; altere o diferencial somente depois de distinguir patinagem de perda geral de aderência.",
    check: "Também confira combustível, temperatura dos pneus traseiros, toe e o momento em que você abre o acelerador. Mais bloqueio pode estabilizar, mas também pode causar subesterço de potência.",
    references: [
      "https://www.simracercentral.com/sim-racing-car-setup-guide/",
      "https://www.simracingmanual.com/setups/springs-dampers-arbs/",
    ],
  },
  {
    question: "A dianteira trava durante a frenagem. O que devo ajustar?",
    start: "Se trava primeiro a dianteira, reduza um pouco o balanço de freio dianteiro (FRONT_BIAS) ou a potência de frenagem (BRAKE_POWER_MULT). Se só trava no fim do pedal, reduza a migração de freio (Brake Migration) ou aumente o limiar (RAMP).",
    example: "FRONT_BIAS 56 → 55,5 ou BRAKE_POWER_MULT 100 → 98. Para trava no fim do pedal: Brake Migration 4 → 3 ou RAMP 8 → 10.",
    related: "Balanço base (FRONT_BIAS), migração e RAMP formam o balanço ao longo do curso do pedal: RAMP determina quando a migração começa. Reduzir FRONT_BIAS afeta também a fase inicial; para sintoma apenas no pedal profundo, prefira investigar migração/RAMP. Se travam as quatro rodas, verifique BRAKE_POWER_MULT e pneus.",
    check: "Compare a mesma freada com pneus na janela térmica e a mesma carga de combustível; o manual destaca que bias muda com transferência de carga e pressão do pedal.",
    references: [
      "https://www.formula1.com/en/latest/article/f1-glossary-a-e.1MFONigMlQSbSQtpP7YCy2",
      "https://www.formula1.com/en/latest/article/tech-tuesday-the-very-different-red-bull-ferrari-and-mercedes-solutions-to.4g7wKT5yJCzEwqJtXfDkCN",
    ],
  },
  {
    question: "O carro sai de frente no meio da curva. O que devo ajustar?",
    start: "Para subesterço no meio da curva, diminua um passo a barra estabilizadora dianteira ou aumente a traseira. Se ocorre em curva rápida, avalie aumentar a asa dianteira (WING_0). Confira cambagem dianteira (CAMBER_LF/RF) e temperaturas.",
    example: "Barra dianteira 5 → 4 ou traseira 3 → 4; em curva rápida, asa dianteira (WING_0) 10 → 11.",
    related: "Barras e molas alteram juntas a distribuição de rigidez e a transferência de carga; mexer em ambas pode amplificar a mudança. WING_0 precisa ser equilibrada com a asa traseira (WING_1), e cambagem/temperatura ajudam a distinguir falta de apoio de pneu superaquecido.",
    check: "Não corrija um problema de pneu sobrecarregado apenas com asa: cambagem, temperatura e distribuição de rigidez podem ser a causa.",
    references: [
      "https://www.racecar-engineering.com/tech-explained/racecar-suspension/",
      "https://www.racecar-engineering.com/tech-explained/springs-and-dampers/",
    ],
  },
  {
    question: "Os pneus passam da temperatura ideal e perdem rendimento no stint. O que devo ajustar?",
    start: "Se o pneu superaquece no stint, teste um composto mais duro (SOFT → MEDIUM) quando disponível e reduza a cambagem negativa excessiva. Revise pressão e equilíbrio de suspensão antes de amolecer amortecedores sem identificar o eixo afetado.",
    example: "Composto SOFT → MEDIUM; cambagem dianteira esquerda (CAMBER_LF) -27 → -26. Compare as temperaturas interna, central e externa após várias voltas.",
    related: "Composto, pressão, cambagem e alinhamento (toe) trabalham juntos na temperatura e no desgaste. Molas, barras e amortecedores mudam a carga sobre os pneus; use a distribuição de temperatura para localizar o problema antes de alterar o conjunto de suspensão.",
    check: "Faça a leitura após várias voltas, não apenas na saída dos boxes. Temperatura, pressão, cambagem e uso dos freios trabalham juntos.",
    references: [
      "https://www.pirelli.com/global/en-ww/race/racingspot/formula-1/the-importance-of-tyres-in-formula-1-53772/",
      "https://www.formula1.com/en/latest/article/tech-tuesday-the-very-different-red-bull-ferrari-and-mercedes-solutions-to.4g7wKT5yJCzEwqJtXfDkCN",
    ],
  },
  {
    question: "O carro raspa ou bate no fundo em alta velocidade. O que devo ajustar?",
    start: "Aumente em pares a altura estática (ROD_LENGTH) para ganhar margem do solo. Revise o curso/batente progressivo (PACKER_RANGE) conforme o comportamento da suspensão; diminua rigidez de mola ou amortecimento apenas se houver evidência de plataforma rígida ou perda de contato.",
    example: "ROD_LENGTH dianteiro e traseiro correspondentes 5 → 6; ajuste PACKER_RANGE 15 → 18 somente se o batente estiver entrando cedo demais.",
    related: "ROD_LENGTH define a altura estática; PACKER_RANGE afeta o curso até o batente. Molas sustentam a carga e amortecedores controlam a velocidade do movimento. Se raspa apesar da altura, verifique batente/curso e compressão; não trate raspagem apenas endurecendo o amortecedor.",
    check: "Mais altura pode custar downforce; procure a menor altura que não perde a plataforma nas compressões e zebras da pista.",
    references: [
      "https://www.formula1.com/en/latest/article/tech-tuesday-why-was-red-bulls-pace-advantage-cut-so-dramatically-at.7J2OtKGx36iWUfyJcCP00H",
      "https://www.racecar-engineering.com/tech-explained/springs-and-dampers/",
    ],
  },
  {
    question: "O carro está lento nas retas, mesmo sendo estável nas curvas. O que devo ajustar?",
    start: "Diminua gradualmente a asa dianteira (WING_0) e/ou traseira (WING_1), mantendo o equilíbrio do carro, e compare a velocidade no mesmo ponto. Depois revise altura/rake se a plataforma estiver fora da janela.",
    example: "WING_0/WING_1 10/8 → 9/7; se perder tempo nas curvas ou na saída, recupere um clique na asa correspondente.",
    related: "Asas dianteira e traseira combinam downforce e arrasto; reduzir as duas igualmente não garante o mesmo equilíbrio, pois a geometria e o fluxo diferem. Altura dianteira/traseira (ROD_LENGTH) também altera a plataforma aerodinâmica.",
    check: "Não remova asa se isso fizer o carro perder tempo nas curvas que antecedem a reta; o ganho de velocidade final precisa compensar a perda de saída e apoio.",
    references: [
      "https://www.formula1.com/en/latest/article/f1-glossary-a-e.1MFONigMlQSbSQtpP7YCy2",
      "https://www.formula1.com/en/latest/article/tech-tuesday-why-was-red-bulls-pace-advantage-cut-so-dramatically-at.7J2OtKGx36iWUfyJcCP00H",
    ],
  },
];

const GROUP_GUIDES = {
  Tyres: {
    intro: "Escolha o composto pensando na janela térmica e na duração do stint.",
    track: "Muitas curvas de alta e asfalto abrasivo pedem atenção à temperatura; pista fria ou travada pode exigir um composto mais macio para entrar na janela.",
    order: "Faça voltas lançadas, espere a temperatura estabilizar e compare desgaste e ritmo — não escolha apenas pelo pico de grip de uma volta.",
  },
  Fuel: {
    intro: "Combustível é peso e autonomia: cada litro altera aceleração, frenagem, altura dinâmica e equilíbrio.",
    track: "Para quali ou sprint curto, use apenas a margem necessária; em corrida longa, some voltas, formação, pit e uma reserva realista.",
    order: "Compare o carro com a mesma carga de combustível antes de concluir que uma mudança de suspensão foi melhor.",
  },
  Eletronics: {
    intro: "Eletrônica deve entregar desempenho que você consegue repetir, não apenas o pico de potência.",
    track: "Em saída de baixa velocidade e pista fria, priorize progressividade e recuperação previsível; em uma volta seca, explore entrega mais agressiva quando houver tração.",
    order: "Ajuste um mapa por vez e observe patinagem, temperatura dos pneus traseiros e carga restante de ERS.",
  },
  AERO: {
    intro: "As asas definem o compromisso entre downforce, arrasto, velocidade de reta e confiança no apoio.",
    track: "Monza/Spa favorecem menor arrasto; Hungaroring/Zandvoort e sequências de curvas favorecem carga. Se o carro raspa ou perde a plataforma, mais asa não resolve tudo.",
    order: "Comece equilibrando frente e traseira; depois valide velocidade de reta, frenagem e estabilidade nas curvas mais rápidas.",
  },
  Brakes: {
    intro: "Freio é uma combinação de força, distribuição estática e migração durante o pedal.",
    track: "Freadas fortes no fim de retas pedem estabilidade; hairpins e pista molhada exigem cuidado para não travar a dianteira nem deixar a traseira solta.",
    order: "Mude pouco, teste a mesma curva e registre ponto de frenagem, travamento e capacidade de rotacionar o carro.",
  },
  Driveability: {
    intro: "Mapas de acelerador e freio motor mudam a resposta aos seus pés, especialmente na entrada e saída de curva.",
    track: "Use resposta suave em chuva, zebras e saídas lentas; resposta agressiva funciona quando há aderência e espaço para modular o pedal.",
    order: "Escolha o mapa que permite abrir o acelerador mais cedo sem transformar a saída em correção de volante.",
  },
  Drivetrain: {
    intro: "O diferencial administra quanto as rodas traseiras trabalham juntas na entrada, meio e saída da curva.",
    track: "Em hairpins, tração e rotação importam mais; em curvas de alta, estabilidade e previsibilidade valem mais que uma mudança brusca de direção.",
    order: "Use telemetria ou sensação de uma curva específica; não altere entrada, meio e saída ao mesmo tempo.",
  },
  Alignments: {
    intro: "Alinhamento define como cada pneu apresenta sua banda ao asfalto e quanto ele resiste a mudar de direção.",
    track: "Curvas longas e rápidas usam mais a lateral do pneu; pista ondulada e molhada geralmente toleram menos agressividade.",
    order: "Observe temperaturas interna/centro/externa, desgaste e estabilidade antes de buscar mais rotação.",
  },
  Main: {
    intro: "A suspensão mecânica controla a plataforma, a transferência de carga e a capacidade de manter o pneu em contato.",
    track: "Pista lisa e rápida aceita plataforma mais firme; zebras, bumps e baixa aderência pedem absorção e contato, mesmo que o carro role mais.",
    order: "Trabalhe em blocos: plataforma/rigidez, depois alinhamento e por fim amortecimento fino.",
  },
  DUMPERS: {
    intro: "Amortecedores controlam a velocidade dos movimentos; não são o mesmo que molas e não devem mascarar uma mola inadequada.",
    track: "Em bumps e zebras, excesso de controle pode fazer o pneu pular; em transições lisas, mais controle pode melhorar resposta e plataforma.",
    order: "Altere bump ou rebound em pequenos passos e compare a mesma entrada de curva, zebra e saída.",
  },
};

const PARAMETER_GUIDES = {
  ABOUT: {
    manual: "ABOUT é um bloco de identificação do arquivo, como autor e descrição; não é um ajuste de comportamento do carro.",
    use: "Mantenha esses campos para documentar quem criou o setup e qual era a intenção da versão. Eles ajudam a organizar presets, mas não mudam a física.",
  },
  CAR: {
    manual: "CAR identifica o modelo ao qual o arquivo pertence; no mapa do projeto, o valor esperado é rss_formula_hybrid_2025_alpine.",
    use: "Confira este campo ao comparar arquivos para evitar aplicar conclusões de outro carro ou variante física. Ele identifica o setup, não é um controle ajustável.",
  },
  TYRES: {
    manual: "O manual apresenta seis compostos secos, C6 a C1, e também INTER/WET no seletor do carro.",
    use: "C6 é o mais macio e aquece mais rápido; C1 é o mais duro e suporta melhor stint longo. No mapa do setup, 0–2 são SOFT/MEDIUM/HARD.",
  },
  FUEL: {
    manual: "O manual trata o combustível em litros e relaciona carga, mapas de motor e consumo ao uso do acelerador.",
    use: "Use a carga da sessão como referência: comparar dois setups com cargas diferentes pode atribuir à suspensão um efeito que veio do peso.",
  },
  MGUK_DELIVERY: {
    manual: "O manual lista NO DEPLOY, BUILD, LOW, BALANCED, HIGH e ATTACK e explica que mapas por trecho podem substituir o modo manual.",
    use: "BALANCED é uma base segura; ATTACK serve para uma reta ou volta rápida com energia disponível; BUILD/recarga é útil para recuperar bateria antes de uma zona de ataque.",
  },
  MGUK_RECOVERY: {
    manual: "A recuperação atua na frenagem e aparece no MFD como REC/RCVR em porcentagem.",
    use: "Mais recuperação enche a bateria, mas pode alterar o freio-motor percebido e a estabilidade na entrada. Valide se a traseira continua previsível.",
  },
  MGUH_MODE: {
    manual: "O manual descreve MOTOR e BATTERY como prioridades do MGU-H.",
    use: "Use MOTOR para priorizar resposta/continuidade do conjunto e BATTERY quando a estratégia exigir gestão de carga; o efeito depende do modelo CSP do carro.",
  },
  WING_0: {
    manual: "A asa dianteira usa aeromapa e é ajustável em 0–30 cliques.",
    use: "Mais asa ajuda a apontar e sustentar a frente, mas aumenta arrasto. Se só a frente está sem grip, confirme pneu e cambagem antes de adicionar asa.",
  },
  WING_1: {
    manual: "A asa traseira usa aeromapa e é ajustável em 0–30 cliques.",
    use: "Mais asa dá segurança no apoio e tração, ao custo de reta. Em pista de alta carga, procure o menor valor que mantém a traseira estável.",
  },
  BRAKE_POWER_MULT: {
    manual: "O mapa permite multiplicador de potência de frenagem de 0 a 115%.",
    use: "Aumente somente se o pedal e o grip permitirem; potência demais aproxima o travamento e torna o carro difícil de modular.",
  },
  FRONT_BIAS: {
    manual: "É o BBAL base: a porcentagem enviada ao eixo dianteiro antes da migração e do ajuste ao vivo.",
    use: "Mais frente estabiliza a entrada, mas pode travar a dianteira e aumentar subesterço. Menos frente ajuda a girar, mas deixa a traseira vulnerável.",
  },
  CUSTOM_SCRIPT_ITEM_0: {
    manual: "O exemplo do manual usa BBAL 58%, RAMP 50% e BMIG +2%, chegando a 60% no pedal máximo.",
    use: "A migração adiciona bias dianteiro conforme o pedal passa do ramp. Procure estabilidade no fim da frenagem sem sacrificar a rotação inicial.",
  },
  CUSTOM_SCRIPT_ITEM_1: {
    manual: "RAMP é o limiar de 0–20% do pedal a partir do qual BMIG começa a atuar.",
    use: "Ramp baixo faz a migração entrar cedo e suavizar mais a traseira; ramp alto preserva o bias base por mais tempo e concentra a mudança no pedal profundo.",
  },
  CUSTOM_SCRIPT_ITEM_6: {
    manual: "O manual descreve seis mapas: 1 progressivo, 4 linear e 5–6 agressivos.",
    use: "Em pista molhada ou saída sem tração, comece em 1–2. Em quali seca, 5–6 podem responder melhor, desde que você consiga modular o acelerador.",
  },
  CUSTOM_SCRIPT_ITEM_7: {
    manual: "O manual descreve 12 mapas EB; EB 1 é mínimo e EB 12 é máximo.",
    use: "Mais EB ajuda a rotacionar e desacelerar ao levantar, mas pode desestabilizar a traseira. Reduza em baixa aderência ou quando houver snap oversteer na entrada.",
  },
  CUSTOM_SCRIPT_ITEM_2: {
    manual: "ENTRY é o bloqueio do diferencial na entrada; o MFD também permite ajuste ao vivo.",
    use: "Mais bloqueio tende a estabilizar o eixo, mas pode reduzir rotação; menos bloqueio libera a curva, porém exige cuidado ao tirar o pé.",
  },
  CUSTOM_SCRIPT_ITEM_3: {
    manual: "MID é o bloqueio com o carro apoiado no meio da curva.",
    use: "Use-o para tratar equilíbrio no ápice. Mude uma curva representativa por vez e diferencie falta de rotação de falta de aderência dianteira.",
  },
  CUSTOM_SCRIPT_ITEM_4: {
    manual: "EXIT é o bloqueio na saída, quando o torque volta às rodas traseiras.",
    use: "Ajuste pensando em tração e subesterço de potência: muito bloqueio pode empurrar a frente; pouco pode permitir patinagem assimétrica.",
  },
  CUSTOM_SCRIPT_ITEM_5: {
    manual: "SWITCH é a velocidade, em km/h, que alterna o mapa do diferencial.",
    use: "Coloque o limiar entre o grupo de curvas lentas e as rápidas quando a pista pedir dois comportamentos; valide a transição para não criar surpresa no meio da curva.",
  },
  DIFF_PRELOAD: {
    manual: "A pré-carga é a tensão inicial do diferencial e aparece no mapa entre 0 e 250.",
    use: "Mais pré-carga faz o diferencial agir antes de grande torque e pode estabilizar transições; também pode dificultar rotação em baixa velocidade.",
  },
  CUSTOM_SCRIPT_ITEM_253: {
    manual: "O manual/MFD trata a distribuição de peso como porcentagem; o mapa do carro mostra aproximadamente 44,6–46,1% na faixa disponível.",
    use: "Use como equilíbrio global, não como correção isolada. Combata sintomas com pneus, altura e suspensão antes de perseguir uma porcentagem ideal.",
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sideLabel(key) {
  const side = key.match(/_(LF|RF|LR|RR)$/)?.[1];
  return side
    ? {
        LF: "dianteiro esquerdo",
        RF: "dianteiro direito",
        LR: "traseiro esquerdo",
        RR: "traseiro direito",
      }[side]
    : "eixo correspondente";
}

function inferredGuide(field) {
  const key = field.iniKey;
  const side = sideLabel(key);

  if (key.startsWith("CAMBER_")) {
    return {
      manual: "A cambagem não é descrita como controle isolado no manual, mas faz parte da leitura de temperatura, contato e desgaste do pneu.",
      use: `Na roda ${side}, cambagem negativa inclina o topo do pneu para dentro e ajuda o contato em curva; excesso reduz contato em reta e pode aquecer a borda interna.`,
    };
  }
  if (key.startsWith("TOE_OUT_")) {
    return {
      manual: "O mapa separa o toe por roda para permitir ajuste fino de alinhamento nos quatro cantos.",
      use: `Na roda ${side}, toe-out aumenta a resposta inicial, mas pode deixar o carro nervoso em reta e aumentar desgaste. Use pouco e confirme no volante.`,
    };
  }
  if (key.startsWith("DAMP_BUMP_")) {
    return {
      manual: "O sistema CSP do carro usa amortecimento ajustável; bump controla a compressão da suspensão.",
      use: `No ${side}, bump baixo absorve bumps e zebras; bump alto segura a compressão e a plataforma, mas pode fazer o pneu perder contato em piso ruim.`,
    };
  }
  if (key.startsWith("DAMP_FAST_BUMP_")) {
    return {
      manual: "Fast bump atua nas compressões rápidas geradas por zebras, ondulações curtas e impactos.",
      use: `No ${side}, use valor mais suave quando o carro pula ao atacar zebra; mais controle pode ajudar a plataforma em pista lisa, mas reduz absorção.`,
    };
  }
  if (key.startsWith("DAMP_REBOUND_")) {
    return {
      manual: "Rebound controla a velocidade de retorno da suspensão após compressão.",
      use: `No ${side}, rebound demais pode impedir a roda de acompanhar a sequência de bumps; rebound de menos deixa o carro flutuar e muda o apoio entre curvas.`,
    };
  }
  if (key.startsWith("DAMP_FAST_REBOUND_")) {
    return {
      manual: "Fast rebound trata o retorno rápido após zebra, compressão curta ou descarga súbita de carga.",
      use: `No ${side}, suavize se o pneu salta na saída de uma zebra; endureça apenas se o retorno rápido estiver deixando a plataforma sem controle.`,
    };
  }
  if (key.startsWith("PACKER_RANGE_")) {
    return {
      manual: "Packer range limita o curso disponível antes de o batente progressivo entrar em ação.",
      use: `Na roda ${side}, mais faixa permite absorver compressão; menos faixa protege a altura mínima, mas pode causar batente e perda de aderência.`,
    };
  }
  if (key.startsWith("ROD_LENGTH_")) {
    return {
      manual: "Rod length altera a altura estática daquela ponta da suspensão e, portanto, a plataforma aerodinâmica.",
      use: `Na roda ${side}, altere em pares e confira rake, equilíbrio e contato com o solo. Pista de alta velocidade pode exigir margem contra raspagem.`,
    };
  }
  if (key.startsWith("SPRING_")) {
    return {
      manual: "A suspensão do carro tem molas ajustáveis; molas e barras compartilham a tarefa de controlar rolagem e carga.",
      use: `Na roda ${side}, mola mais firme sustenta a plataforma, mas pode perder aderência em bumps; mola mais macia melhora contato, com mais movimento.`,
    };
  }
  if (key === "ARB_F" || key === "ARB_R") {
    const axle = key === "ARB_F" ? "dianteiro" : "traseiro";
    return {
      manual: `A barra anti-rolagem ${axle} é uma ferramenta de equilíbrio rápido entre os eixos.`,
      use: `Mais rigidez no eixo ${axle} reduz rolagem e tende a transferir mais carga lateral para esse eixo; use para corrigir equilíbrio, não para esconder pneu fora da janela.`,
    };
  }

  return {
    manual: "Parâmetro listado no mapa de setup do Formula Hybrid Alpine 2025.",
    use: "Comece pelo valor padrão, altere um passo por vez e compare a mesma curva em voltas consistentes.",
  };
}

function getGuide(field) {
  return PARAMETER_GUIDES[field.iniKey] ?? inferredGuide(field);
}

function formatRules(field) {
  if (!field.rules.length) return "Regra não especificada no mapa";
  return field.rules
    .map((rule) => {
      if (rule.type === "enum") {
        return [...rule.labels].map(([value, label]) => `${value} = ${label}`).join(" · ");
      }
      const range = rule.min === rule.max ? `${rule.min}` : `${rule.min} a ${rule.max}`;
      return rule.modifiers ? `${range} (${rule.modifiers})` : range;
    })
    .join(" · ");
}

function renderSources() {
  return SOURCES.map((source) => {
    const label = source.href
      ? `<a href="${source.href}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`
      : escapeHtml(source.label);
    return `<li>${label}<span>${escapeHtml(source.note)}</span></li>`;
  }).join("");
}

function renderFaqReferences(references) {
  return references
    .map(
      (href, index) =>
        `<a href="${href}" target="_blank" rel="noreferrer">fonte ${index + 1}</a>`
    )
    .join(" · ");
}

function renderFaq() {
  return `
    <section class="tutorial-faq" aria-labelledby="tutorial-faq-heading">
      <h3 id="tutorial-faq-heading">FAQ — sintomas e primeiros ajustes</h3>
      <p class="tutorial-faq__intro">Identifique em que fase da curva o problema aparece, faça uma alteração pequena e repita a mesma situação. As sugestões abaixo são pontos de partida, não substituem a leitura de temperatura, desgaste e telemetria.</p>
      <div class="tutorial-faq__list">
        ${FAQ_ITEMS.map(
          (item) => `
            <details class="tutorial-faq__item">
              <summary>${escapeHtml(item.question)}</summary>
              <div class="tutorial-faq__answer">
                <p><strong>Comece por:</strong> ${escapeHtml(item.start)}</p>
                <p><strong>Exemplo:</strong> ${escapeHtml(item.example)}</p>
                <p><strong>Confirme:</strong> ${escapeHtml(item.check)}</p>
                <p><strong>Ajustes relacionados:</strong> ${escapeHtml(item.related)}</p>
                <p class="tutorial-faq__references">${renderFaqReferences(item.references)}</p>
              </div>
            </details>`
        ).join("")}
      </div>
    </section>`;
}

function renderCard(field) {
  const help = FHA_2025_HELP[field.iniKey];
  const guide = getGuide(field);
  const title = help?.title ?? field.title;
  const body = help?.body ?? "Parâmetro do setup do carro.";
  return `
    <article class="tutorial-card">
      <header class="tutorial-card__header">
        <div>
          <h4>${escapeHtml(title)}</h4>
          <code>${escapeHtml(field.iniKey)}</code>
        </div>
        <span class="tutorial-card__rule">${escapeHtml(formatRules(field))}</span>
      </header>
      <p class="tutorial-card__base"><strong>O que é:</strong> ${escapeHtml(body)}</p>
      <p><strong>O que o manual acrescenta:</strong> ${escapeHtml(guide.manual)}</p>
      <p><strong>Como usar no setup:</strong> ${escapeHtml(guide.use)}</p>
    </article>`;
}

export function renderTutorial(root, setupMap) {
  const groups = setupMap.groups
    .filter((groupName) => groupName !== "Geral")
    .map((groupName) => {
      const fields = setupMap.fields.filter(
        (field) =>
          field.group === groupName &&
          field.iniKey !== "ABOUT" &&
          field.iniKey !== "CAR"
      );
      const guide = GROUP_GUIDES[groupName] ?? GROUP_GUIDES.Main;
      return `
        <details class="tutorial-group">
          <summary class="tutorial-group__summary" id="tutorial-${slugify(groupName)}">
            ${escapeHtml(groupName)}
          </summary>
          <div class="tutorial-group__intro">
            <p>${escapeHtml(guide.intro)} <strong>Em pista:</strong> ${escapeHtml(guide.track)} <strong>Teste:</strong> ${escapeHtml(guide.order)}</p>
          </div>
          <div class="tutorial-grid">${fields.map(renderCard).join("")}</div>
        </details>`;
    })
    .join("");

  root.innerHTML = `
    <div class="tutorial-groups">${groups}</div>

    <section class="tutorial-sources" aria-labelledby="tutorial-sources-heading">
      <h3 id="tutorial-sources-heading">Fontes e leituras</h3>
      <ul>${renderSources()}</ul>
    </section>

    ${renderFaq()}`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

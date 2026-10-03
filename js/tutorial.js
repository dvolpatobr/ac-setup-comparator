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
    </section>`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Textos de ajuda extraídos do ReadMe_FHA-2025.pdf (RSS Formula Hybrid Alpine 2025).
 * @typedef {{ title: string, body: string, source?: string }} HelpEntry
 */

/** @type {Record<string, HelpEntry>} */
export const FHA_2025_HELP = {
  TYRES: {
    title: "Composto de pneu",
    source: "Manual p.5 — Tyre Temperature & Grip",
    body:
      "Seleção do composto seco (SOFT a HARD) ou INTER/WET. O manual descreve janelas ideais de temperatura por composto (ex.: C6 85–100°C, C1 110–125°C). Compostos mais macios aquecem rápido e oferecem mais grip inicial; os mais duros resistem melhor ao desgaste em stint longo.",
  },
  FUEL: {
    title: "Combustível",
    source: "Manual p.13 — MFD Fuel Level",
    body:
      "Quantidade de combustível no carro (litros). Mais combustível aumenta o peso e altera o equilíbrio e o consumo; menos combustível melhora performance mas reduz autonomia. O manual associa mapas de motor ao uso de combustível conforme o acelerador.",
  },
  MGUK_DELIVERY: {
    title: "MGU-K — modo de entrega (ERS)",
    source: "Manual p.12–15, 21–23 — ERS / MGU Deployment",
    body:
      "Define como a energia do MGU-K é liberada: NO DEPLOY, BUILD (recarga), LOW, BALANCED, HIGH ou ATTACK. Pode ser ajustado no setup ou ao vivo (Extended Controls / volante). Com o sistema de ERS Maps (CSP), zonas da pista podem sobrepor o modo manual.",
  },
  MGUK_RECOVERY: {
    title: "MGU-K — recuperação de energia",
    source: "Manual p.13–14 — Recovery %",
    body:
      "Intensidade da regeneração sob frenagem (0–100%). Mais recuperação recarrega a bateria mais rápido, mas pode alterar o feeling de freio motor e o equilíbrio na entrada de curva.",
  },
  MGUH_MODE: {
    title: "MGU-H — modo",
    source: "Manual p.15 — MGUH popup",
    body:
      "Escolhe se o MGU-H prioriza acoplamento ao motor (MOTOR) ou gestão da bateria (BATTERY). Afeta como a energia térmica/exaustão é convertida e entregue ao sistema híbrido.",
  },
  WING_0: {
    title: "Asa dianteira",
    source: "Manual p.4 — Aero",
    body:
      "Ângulo da asa dianteira (0–30 cliques). Mais ângulo = mais downforce na frente, melhor entrada em curva e estabilidade, porém mais arrasto e menor velocidade máxima. Modelado com aeromapa dinâmico (CSP).",
  },
  WING_1: {
    title: "Asa traseira",
    source: "Manual p.4 — Aero",
    body:
      "Ângulo da asa traseira (0–30 cliques). Influencia downforce traseiro, tração na saída e estabilidade em reta. Combinar com a asa dianteira para equilibrar subesterço/sobreesterço.",
  },
  BRAKE_POWER_MULT: {
    title: "Potência de frenagem",
    source: "Manual p.5–6 — Braking System",
    body:
      "Multiplicador da força total de freio (0–115%). Valores maiores reduzem distância de frenagem, mas facilitam bloqueio se o balanço e a migração não estiverem coerentes.",
  },
  FRONT_BIAS: {
    title: "Balanço de freio (base)",
    source: "Manual p.6, 14 — BBAL",
    body:
      "Percentual de frenagem enviado para o eixo dianteiro no início do pedal (ex.: 58% = 58% frente / 42% trás). É o bias estático antes da migração. Ajuste fino em corrida aparece no MFD como BBAL TUNE.",
  },
  CUSTOM_SCRIPT_ITEM_0: {
    title: "Migração de freio (Brake Migration)",
    source: "Manual p.6, 14 — BMIG",
    body:
      "Percentual extra de bias dianteiro aplicado no fim do curso do pedal. Ex.: bias 58% + migração +2% → até 60% na frenagem máxima. Estabiliza o carro em freadas longas; excesso pode travar a frente.",
  },
  CUSTOM_SCRIPT_ITEM_1: {
    title: "Ramp (limiar da migração)",
    source: "Manual p.6, 14 — RAMP",
    body:
      "Percentual do pedal de freio a partir do qual a migração começa a atuar. Ex.: Ramp 50% — de 0 a 50% do pedal o bias permanece fixo; acima disso a migração progride até o valor máximo.",
  },
  CUSTOM_SCRIPT_ITEM_6: {
    title: "Mapa de acelerador (Throttle Map)",
    source: "Manual p.8, 14 — TMAP",
    body:
      "Curva de resposta do acelerador (mapas 1–6). Mapa 1: progressivo (chuva/baixa aderência). Mapa 4: linear. Mapas 5–6: agressivos para saída rápida. Alterável no setup ou ao vivo pelo Extended Controls.",
  },
  CUSTOM_SCRIPT_ITEM_7: {
    title: "Mapa de freio motor (Engine Brake)",
    source: "Manual p.7–8, 14 — EB",
    body:
      "Escolhe entre 12 níveis de torque negativo ao fechar o acelerador. EB 1: mínimo (carro mais neutro). EB 12: máximo (mais rotação na entrada, risco de instabilidade traseira). Útil para ajustar suporte na entrada sem usar mais freio mecânico.",
  },
  CUSTOM_SCRIPT_ITEM_2: {
    title: "Diferencial — entrada",
    source: "Manual p.14 — Diff ENTRY",
    body:
      "Bloqueio do diferencial na entrada da curva (fração 1/12 a 12/12). Mais bloqueio = menos rodagem interna, carro pode entrar mais estável ou com menos rotação conforme o restante do setup.",
  },
  CUSTOM_SCRIPT_ITEM_3: {
    title: "Diferencial — meio da curva",
    source: "Manual p.14 — Diff MID",
    body:
      "Bloqueio no meio da curva. Afeta equilíbrio e tração com o volante já virado; trabalha em conjunto com entrada e saída.",
  },
  CUSTOM_SCRIPT_ITEM_4: {
    title: "Diferencial — saída",
    source: "Manual p.14 — Diff EXIT",
    body:
      "Bloqueio na saída da curva. Mais bloqueio melhora tração ao acelerar, mas pode gerar subesterço ou exigir mais cuidado no volante se o carro já estiver nervoso.",
  },
  CUSTOM_SCRIPT_ITEM_5: {
    title: "Diferencial — switch (velocidade)",
    source: "Manual p.14 — Diff SWITCH",
    body:
      "Velocidade (km/h) em que o mapa de diferencial alterna o comportamento. Permite ter curvas de diff diferentes abaixo e acima desse limiar — útil em circuitos com setores lentos e rápidos.",
  },
  DIFF_PRELOAD: {
    title: "Pré-carga do diferencial",
    source: "Manual p.4 — Suspension / Diff",
    body:
      "Tensão mecânica inicial nos planetários do diff (0–250). Aumenta a tendência de ambas as rodas girarem juntas mesmo sem torque; influencia tração, patinação e comportamento em mudança de direção.",
  },
  CAMBER_LF: {
    title: "Camber dianteiro esquerdo",
    source: "Manual p.4 — Suspension geometry",
    body:
      "Inclinação vertical da roda dianteira esquerda. Mais camber negativo costuma aquecer melhor o ombro interno do pneu e aumentar grip em curva, à custa de aderência em reta e desgaste.",
  },
  CAMBER_RF: {
    title: "Camber dianteiro direito",
    source: "Manual p.4 — Suspension geometry",
    body: "Mesma função do camber dianteiro esquerdo, lado direito. Em pistas com muito banking ou curvas predominantes, pode-se usar valores assimétricos.",
  },
  CAMBER_LR: {
    title: "Camber traseiro esquerdo",
    source: "Manual p.4 — Suspension geometry",
    body:
      "Inclinação da roda traseira esquerda. Afeta temperatura do pneu traseiro, tração na saída e estabilidade. Crítico em carros com muita potência e ERS.",
  },
  CAMBER_RR: {
    title: "Camber traseiro direito",
    source: "Manual p.4 — Suspension geometry",
    body: "Mesma função do camber traseiro esquerdo, lado direito.",
  },
  TOE_OUT_LF: {
    title: "Toe-out dianteiro esquerdo",
    source: "Manual p.4 — Geometry",
    body:
      "Abertura das rodas dianteiras (toe-out). Mais toe-out: resposta mais rápida na entrada, mais aquecimento e desgaste; toe neutro ou toe-in: mais estabilidade em reta.",
  },
  TOE_OUT_RF: {
    title: "Toe-out dianteiro direito",
    source: "Manual p.4 — Geometry",
    body: "Ajuste de convergência/divergência da roda dianteira direita.",
  },
  TOE_OUT_LR: {
    title: "Toe-out traseiro esquerdo",
    source: "Manual p.4 — Geometry",
    body:
      "Alinhamento traseiro. Influencia estabilidade em reta e agressividade na rotação — toe-out traseiro pode ajudar rotação, toe-in aumenta estabilidade.",
  },
  TOE_OUT_RR: {
    title: "Toe-out traseiro direito",
    source: "Manual p.4 — Geometry",
    body: "Ajuste de alinhamento da roda traseira direita.",
  },
  ARB_F: {
    title: "Barra anti-rolagem dianteira",
    source: "Manual p.4 — Suspension",
    body:
      "Rigidez da barra anti-rolagem dianteira. Mais rigidez reduz rolagem e transfere carga; tende a aumentar subesterço. Menos rigidez dá mais grip mecânico na frente em curvas lentas.",
  },
  ARB_R: {
    title: "Barra anti-rolagem traseira",
    source: "Manual p.4 — Suspension",
    body:
      "Rigidez da barra traseira. Mais rigidez na traseira pode favorecer sobreesterço e rotação; menos rigidez estabiliza a saída de curva.",
  },
  CUSTOM_SCRIPT_ITEM_253: {
    title: "Distribuição de peso",
    source: "Manual p.4 — Weight transfer",
    body:
      "Desloca o centro de gravidade longitudinal (aprox. 44,6% a 46,1% na frente). Mais peso na frente: melhor entrada; mais atrás: melhor tração na saída.",
  },
  PACKER_RANGE_LF: {
    title: "Packer / curso do batente (DE)",
    source: "Manual p.4 — Nonlinear bump stops",
    body:
      "Curso disponível antes do batente de suspensão atuar na roda dianteira esquerda. Batentes não lineares (CSP) permitem apoio progressivo sem perder curso útil.",
  },
  PACKER_RANGE_RF: {
    title: "Packer / curso do batente (DD)",
    source: "Manual p.4 — Nonlinear bump stops",
    body: "Curso de batente na roda dianteira direita.",
  },
  PACKER_RANGE_LR: {
    title: "Packer / curso do batente (TE)",
    source: "Manual p.4 — Nonlinear bump stops",
    body: "Curso de batente na roda traseira esquerda.",
  },
  PACKER_RANGE_RR: {
    title: "Packer / curso do batente (TD)",
    source: "Manual p.4 — Nonlinear bump stops",
    body: "Curso de batente na roda traseira direita.",
  },
  ROD_LENGTH_LF: {
    title: "Comprimento da haste (DE)",
    source: "Manual p.4 — Suspension geometry",
    body:
      "Ajuste fino da geometria (push/pull rod). Altera ride height efetivo e kinemática sem mudar mola — útil para equilibrar altura e aerodinâmica por canto.",
  },
  ROD_LENGTH_RF: {
    title: "Comprimento da haste (DD)",
    source: "Manual p.4 — Suspension geometry",
    body: "Ajuste geométrico na roda dianteira direita.",
  },
  ROD_LENGTH_LR: {
    title: "Comprimento da haste (TE)",
    source: "Manual p.4 — Suspension geometry",
    body: "Ajuste geométrico na roda traseira esquerda.",
  },
  ROD_LENGTH_RR: {
    title: "Comprimento da haste (TD)",
    source: "Manual p.4 — Suspension geometry",
    body: "Ajuste geométrico na roda traseira direita.",
  },
  SPRING_LF: {
    title: "Mola dianteira esquerda",
    source: "Manual p.4 — Suspension",
    body:
      "Rigidez da mola. Molas mais duras controlam rolagem e suportam downforce; mais macias aumentam aderência mecânica em superfícies irregulares.",
  },
  SPRING_RF: {
    title: "Mola dianteira direita",
    source: "Manual p.4 — Suspension",
    body: "Rigidez da mola dianteira direita.",
  },
  SPRING_LR: {
    title: "Mola traseira esquerda",
    source: "Manual p.4 — Suspension",
    body: "Rigidez da mola traseira esquerda — define suporte e reação ao ERS/traction.",
  },
  SPRING_RR: {
    title: "Mola traseira direita",
    source: "Manual p.4 — Suspension",
    body: "Rigidez da mola traseira direita.",
  },
  DAMP_BUMP_LF: {
    title: "Amortecimento compressão lenta (DE)",
    source: "Manual p.4 — Suspension",
    body:
      "Controle da velocidade de compressão da suspensão (bump). Mais cliques = mais resistência na compressão; afeta apoio em curvas, kerbs e freada.",
  },
  DAMP_BUMP_RF: {
    title: "Amortecimento compressão lenta (DD)",
    source: "Manual p.4 — Suspension",
    body: "Bump lento na roda dianteira direita.",
  },
  DAMP_BUMP_LR: {
    title: "Amortecimento compressão lenta (TE)",
    source: "Manual p.4 — Suspension",
    body: "Bump lento na roda traseira esquerda.",
  },
  DAMP_BUMP_RR: {
    title: "Amortecimento compressão lenta (TD)",
    source: "Manual p.4 — Suspension",
    body: "Bump lento na roda traseira direita.",
  },
  DAMP_REBOUND_LF: {
    title: "Amortecimento retorno lento (DE)",
    source: "Manual p.4 — Suspension",
    body:
      "Velocidade com que a suspensão estende após comprimir (rebound). Influencia contato do pneu com o solo na saída de buracos e transferência de carga.",
  },
  DAMP_REBOUND_RF: {
    title: "Amortecimento retorno lento (DD)",
    source: "Manual p.4 — Suspension",
    body: "Rebound lento dianteiro direito.",
  },
  DAMP_REBOUND_LR: {
    title: "Amortecimento retorno lento (TE)",
    source: "Manual p.4 — Suspension",
    body: "Rebound lento traseiro esquerdo.",
  },
  DAMP_REBOUND_RR: {
    title: "Amortecimento retorno lento (TD)",
    source: "Manual p.4 — Suspension",
    body: "Rebound lento traseiro direito.",
  },
  DAMP_FAST_BUMP_LF: {
    title: "Amortecimento compressão rápida (DE)",
    source: "Manual p.4 — Suspension",
    body:
      "Resposta a compressões rápidas (kerbs, ripple, freada brusca). Amortecimento de alta velocidade evita batida seca sem comprometer o curso lento.",
  },
  DAMP_FAST_BUMP_RF: {
    title: "Amortecimento compressão rápida (DD)",
    source: "Manual p.4 — Suspension",
    body: "Fast bump dianteiro direito.",
  },
  DAMP_FAST_BUMP_LR: {
    title: "Amortecimento compressão rápida (TE)",
    source: "Manual p.4 — Suspension",
    body: "Fast bump traseiro esquerdo.",
  },
  DAMP_FAST_BUMP_RR: {
    title: "Amortecimento compressão rápida (TD)",
    source: "Manual p.4 — Suspension",
    body: "Fast bump traseiro direito.",
  },
  DAMP_FAST_REBOUND_LF: {
    title: "Amortecimento retorno rápido (DE)",
    source: "Manual p.4 — Suspension",
    body:
      "Controla extensão rápida da suspensão. Crítico para manter o pneu colado após impactos e na transição acelerador/frenagem.",
  },
  DAMP_FAST_REBOUND_RF: {
    title: "Amortecimento retorno rápido (DD)",
    source: "Manual p.4 — Suspension",
    body: "Fast rebound dianteiro direito.",
  },
  DAMP_FAST_REBOUND_LR: {
    title: "Amortecimento retorno rápido (TE)",
    source: "Manual p.4 — Suspension",
    body: "Fast rebound traseiro esquerdo.",
  },
  DAMP_FAST_REBOUND_RR: {
    title: "Amortecimento retorno rápido (TD)",
    source: "Manual p.4 — Suspension",
    body: "Fast rebound traseiro direito.",
  },
};

/**
 * @param {string} iniKey
 * @returns {HelpEntry | null}
 */
export function getHelpForKey(iniKey) {
  return FHA_2025_HELP[iniKey] ?? null;
}

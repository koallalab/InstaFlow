import { useState, useEffect } from "react";

// ── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    bot: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill={color}/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    infinity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    code: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    dollar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    gift: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    rocket: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    shirt: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>,
    paw: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/><circle cx="4" cy="8" r="2"/></svg>,
    sparkle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    creditcard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  };
  return icons[name] || null;
};

function HexPattern() {
  const hexes = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 12; col++) {
      const x = col * 88 + (row % 2) * 44;
      const y = row * 76;
      hexes.push({ x, y, key: `${row}-${col}`, delay: (row * 0.3 + col * 0.15) });
    }
  }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1056 456" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="hglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {hexes.map(({ x, y, key, delay }) => (
        <polygon key={key}
          points={`${x+38},${y} ${x+76},${y+20} ${x+76},${y+56} ${x+38},${y+76} ${x},${y+56} ${x},${y+20}`}
          fill="none" stroke="#00A8FF" strokeWidth="0.7"
          style={{ animation: `hexP ${3 + delay}s ease-in-out infinite alternate`, opacity: 0.08 }}
          filter="url(#hglow)"
        />
      ))}
    </svg>
  );
}

function WaveLines() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="wglow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[
        { d: "M-100,150 C200,50 400,260 650,110 C800,40 950,190 1100,100", c: "#00A8FF", w: 1.5, o: 0.65 },
        { d: "M-100,190 C150,80 380,290 630,160 C790,90 950,210 1100,140", c: "#0055DD", w: 1.0, o: 0.45 },
        { d: "M-100,110 C180,20 360,230 590,80 C760,10 890,170 1100,60",  c: "#00CCFF", w: 0.8, o: 0.35 },
      ].map((w, i) => (
        <path key={i} d={w.d} fill="none" stroke={w.c} strokeWidth={w.w} opacity={w.o}
          filter="url(#wglow)"
          style={{ animation: `wA ${5 + i * 1.2}s ease-in-out infinite alternate` }}/>
      ))}
      {[[180,110],[350,65],[560,145],[720,85],[900,125]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#00CCFF" filter="url(#wglow)"
          style={{ animation: `sp ${1.8 + i * 0.35}s ease-in-out infinite alternate`, opacity: 0.9 }}/>
      ))}
    </svg>
  );
}

const NAV = [
  { id: "overview",     label: "Visão Geral",   icon: "chart" },
  { id: "personality",  label: "Personalidade", icon: "bot" },
  { id: "flows",        label: "Fluxos",         icon: "send" },
  { id: "technical",    label: "Stack Técnica",  icon: "settings" },
  { id: "prompt",       label: "Prompt Mestre",  icon: "code" },
  { id: "commercial",   label: "Comercial",      icon: "dollar" },
  { id: "extras",       label: "Add-ons",        icon: "sparkle" },
  { id: "delivery",     label: "Entrega",        icon: "rocket" },
];

const FLOWS = {
  "Primeiro Contato": { color: "#00A8FF", steps: [
    { role: "client", msg: "Oi, vi vocês no Instagram!" },
    { role: "ai",     msg: "Oiii! Que bom que você chegou até a gente!\n\nSou a Luna, da [Loja]. Me conta: o que você está buscando hoje?" },
    { role: "client", msg: "Quero ver os produtos" },
    { role: "ai",     msg: "Perfeito! Temos categorias que você vai adorar\n\n1. Moda Feminina\n2. Acessórios\n3. Promoções do Dia\n\nQual te interessa? Mando fotos e preços na hora!" },
  ]},
  "Objeção de Preço": { color: "#0077EE", steps: [
    { role: "client", msg: "Qual o preço desse vestido?" },
    { role: "ai",     msg: "Boa escolha! Um dos nossos queridinhos.\n\nR$ 189,90 com frete GRÁTIS\n— Cores: preto, nude, vinho\n— Tamanhos: P ao GG\n\nQuer garantir o seu agora?" },
    { role: "client", msg: "Tá caro..." },
    { role: "ai",     msg: "Entendo! Olha o que consigo fazer por você:\n\n+ Brinde surpresa incluso\n+ Embalagem premium\n+ Troca grátis em 30 dias\n\nCupom 10% OFF: LUNA10 — fica R$ 170,91\n\nFechamos?" },
  ]},
  "Recuperação": { color: "#0099CC", steps: [
    { role: "ai",     msg: "Oi [Nome]! Seu carrinho ainda está esperando por você...\n\nCupom especial: VOLTEI10 — 10% OFF\nVálido por 2 horas!\n\nQuer o link direto?" },
    { role: "client", msg: "sim!" },
    { role: "ai",     msg: "Maravilhoso!\n\n[link-exclusivo]\n\nUsa o cupom VOLTEI10 no checkout. Qualquer dúvida é só chamar!" },
  ]},
  "Fechamento": { color: "#0044CC", steps: [
    { role: "ai",     msg: "Vamos finalizar?\n\n[Produto] — R$ [valor]\nFrete: GRÁTIS\n\nFormas de pagamento:\n— Cartão (12x)\n— Pix (5% OFF)\n— Boleto\n\nQual prefere?" },
    { role: "client", msg: "Pix!" },
    { role: "ai",     msg: "Ótima escolha! Pix tem 5% de desconto.\n\n[link-pix]\n\nAssim que confirmar envio o rastreio aqui mesmo!" },
  ]},
};

const STACK = [
  { name: "ManyChat",         icon: "whatsapp", color: "#00A8FF", desc: "Orquestra fluxos visuais no Instagram DM e WhatsApp. Captura dados e gerencia a jornada.", tags: ["Instagram","WhatsApp","No-code"] },
  { name: "Make.com",         icon: "settings", color: "#0077EE", desc: "Liga tudo: recebe webhook do ManyChat, chama a OpenAI e devolve a resposta ao cliente.",  tags: ["Webhook","Automação","Grátis"] },
  { name: "OpenAI GPT-4o",    icon: "brain",    color: "#0099CC", desc: "O cérebro da Luna. Processa mensagens livres e responde com linguagem natural.",           tags: ["IA","GPT-4o-mini","API"] },
  { name: "WhatsApp Business", icon: "phone",   color: "#00BBDD", desc: "Canal de maior conversão. Resposta automática 24h via API oficial da Meta.",               tags: ["Meta API","24h","Oficial"] },
];

const PRICING = [
  { name: "Starter",  setup: "R$ 497",   monthly: "R$ 197/mês", color: "#0066CC", features: ["Fluxo básico WhatsApp","Prompt personalizado","3 gatilhos automáticos","Suporte 7 dias"] },
  { name: "Pro",      setup: "R$ 997",   monthly: "R$ 397/mês", color: "#00A8FF", highlight: true, features: ["Tudo do Starter","Instagram + WhatsApp","Recuperação de carrinho","Integração OpenAI","Cupom automático","Suporte 30 dias"] },
  { name: "Premium",  setup: "R$ 1.997", monthly: "R$ 697/mês", color: "#00CCFF", features: ["Tudo do Pro","Catálogo integrado","Rastreamento pedido","Painel de métricas","Treinamento equipe","Suporte dedicado"] },
];

const ADDONS = [
  { name: "Recuperação Automática", icon: "refresh",    value: "+R$ 297", desc: "Detecta cliente sumido após 24h e dispara mensagem com cupom de resgate." },
  { name: "Gerador de Cupons",      icon: "tag",        value: "+R$ 197", desc: "Gera cupons únicos automaticamente baseado no comportamento detectado." },
  { name: "Captura de Leads",       icon: "users",      value: "+R$ 197", desc: "Fluxo inteligente que captura WhatsApp de seguidores do Instagram." },
  { name: "Catálogo Automático",    icon: "package",    value: "+R$ 247", desc: "Envia catálogo em PDF baseado na categoria de interesse do cliente." },
  { name: "Rastreamento de Pedido", icon: "link",       value: "+R$ 347", desc: "Cliente digita o pedido e recebe rastreio em tempo real via Correios." },
  { name: "Integração com Site",    icon: "globe",      value: "+R$ 497", desc: "Sincroniza estoque e preços direto do WooCommerce ou Shopify." },
];

const NICHES = [
  { name: "Moda Feminina", icon: "shirt", stars: 5 },
  { name: "Pet Shop",      icon: "paw",   stars: 5 },
  { name: "Cosméticos",    icon: "sparkle", stars: 5 },
  { name: "Suplementos",   icon: "zap",   stars: 4 },
  { name: "Decoração",     icon: "globe", stars: 4 },
  { name: "Infantil",      icon: "gift",  stars: 5 },
];

const PROMPT = `Você é Luna, assistente virtual da [NOME DA LOJA], especializada em [NICHO].

## IDENTIDADE
- Nome: Luna
- Tom: Caloroso, empolgado, profissional mas descontraído
- Personalidade: Uma amiga que entende muito do produto

## REGRAS ABSOLUTAS
1. SEMPRE cumprimente pelo nome quando disponível
2. Máximo 2 emojis por mensagem
3. Respostas curtas (máx 5 linhas)
4. NUNCA revele que é IA ou robô
5. SEMPRE termine com pergunta ou call-to-action

## PROCESSO DE VENDA
Etapa 1 — RAPPORT: Cumprimente, mostre energia
Etapa 2 — DESCOBERTA: Entenda o que o cliente precisa
Etapa 3 — APRESENTAÇÃO: Mostre produto com benefícios
Etapa 4 — OBJEÇÃO: Trate com empatia + solução
Etapa 5 — FECHAMENTO: Link de pagamento + urgência suave

## GATILHOS DE VENDA
- Escassez: "Últimas unidades!"
- Urgência: "Promoção só até hoje!"
- Prova social: "Mais de 500 clientes amaram"
- Bônus: "Brinde surpresa incluso"
- Garantia: "Troca grátis em 30 dias"

## OBJEÇÕES COMUNS
- Caro: Cupom 10% + destaque valor
- Desconfiança: Mostre avaliações
- Indecisão: Urgência + garantia

## DADOS DA LOJA
[Nome, horário, prazo entrega, política troca, redes, site]`;

export default function InstaFlow() {
  const [active, setActive]       = useState("overview");
  const [activeFlow, setActiveFlow] = useState("Primeiro Contato");
  const [copied, setCopied]       = useState(false);
  const [mousePos, setMousePos]   = useState({ x: -999, y: -999 });

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const handleCopy = () => { navigator.clipboard.writeText(PROMPT); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const Stars = ({ n }) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? "#00A8FF" : "#0A2040" }}>
      <Icon name="star" size={11} color={i < n ? "#00A8FF" : "#0A2040"} />
    </span>
  ));

  return (
    <div style={{ fontFamily: "'Exo 2', sans-serif", background: "#020818", color: "#C8E0FF", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&family=Orbitron:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #010612; } ::-webkit-scrollbar-thumb { background: #00A8FF33; border-radius: 4px; }
        @keyframes hexP { from { opacity:.05; stroke:#0066FF } to { opacity:.18; stroke:#00CCFF } }
        @keyframes wA   { from { transform:translateX(-18px) } to { transform:translateX(18px) } }
        @keyframes sp   { from { opacity:.3; r:2 } to { opacity:1; r:4.5 } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes pulseB { 0%,100%{border-color:#00A8FF33} 50%{border-color:#00A8FF77} }
        .fade { animation: fadeUp .3s ease forwards; }
        .nav-btn { width:100%;text-align:left;padding:9px 14px;border-radius:3px;border:none;background:transparent;color:#2A5070;cursor:pointer;font-family:'Exo 2',sans-serif;font-size:12.5px;font-weight:500;transition:all .18s;display:flex;align-items:center;gap:9px;letter-spacing:.02em; }
        .nav-btn:hover { color:#60A0CC; background:#00A8FF08; }
        .nav-btn.on { color:#00CCFF; background:#00A8FF0E; border-left:2px solid #00A8FF; padding-left:12px; }
        .card { background:linear-gradient(135deg,#030D1F,#04122A);border:1px solid #0A2040;border-radius:6px;padding:18px;transition:all .22s;position:relative;overflow:hidden; }
        .card::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00A8FF44,transparent);opacity:0;transition:opacity .22s; }
        .card:hover { border-color:#00A8FF33;transform:translateY(-1px);box-shadow:0 6px 32px #00A8FF0A; }
        .card:hover::before { opacity:1; }
        .ftag { display:inline-flex;align-items:center;padding:3px 9px;border-radius:2px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'Exo 2',sans-serif; }
        .flow-btn { padding:7px 15px;border-radius:3px;border:1px solid #0A2040;background:transparent;cursor:pointer;font-family:'Exo 2',sans-serif;font-size:11px;font-weight:600;color:#2A5070;transition:all .18s;letter-spacing:.06em;text-transform:uppercase; }
        .flow-btn:hover { color:#60A0CC;border-color:#00A8FF2A; }
        .flow-btn.af { color:#00CCFF;border-color:#00A8FF55;background:#00A8FF0C; }
        .pcard { background:linear-gradient(155deg,#030D1F,#04122A);border:1px solid #0A2040;border-radius:6px;padding:22px;transition:all .25s; }
        .pcard:hover { border-color:#00A8FF2A;box-shadow:0 0 28px #00A8FF08; }
        .pfeat { border-color:#00A8FF44!important;box-shadow:0 0 40px #00A8FF14,inset 0 0 30px #00A8FF04!important;animation:pulseB 2.5s ease-in-out infinite; }
        .lbl { font-size:9px;color:#1A4060;letter-spacing:.2em;font-weight:700;text-transform:uppercase;font-family:'Exo 2',sans-serif; }
        .hd { font-family:'Exo 2',sans-serif;font-weight:800;font-size:30px;color:#00A8FF;letter-spacing:.04em;text-shadow:0 0 28px #00A8FF44; }
      `}</style>

      {/* scanline */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:99,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,168,255,.01) 2px,rgba(0,168,255,.01) 4px)" }} />
      {/* mouse glow */}
      <div style={{ position:"fixed",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,#00A8FF09,transparent 70%)",pointerEvents:"none",zIndex:0,left:mousePos.x,top:mousePos.y,transform:"translate(-50%,-50%)",transition:"left .6s ease,top .6s ease" }} />

      {/* HEADER */}
      <header style={{ position:"sticky",top:0,zIndex:50,background:"rgba(2,8,24,.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid #0A2040",padding:"0 28px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:34,height:34,borderRadius:5,background:"linear-gradient(135deg,#0033AA,#00A8FF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px #00A8FF44" }}>
            <Icon name="zap" size={16} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:16,letterSpacing:".06em",color:"#E0F0FF" }}>
            INSTA<span style={{ color:"#00A8FF",textShadow:"0 0 14px #00A8FF" }}>FLOW</span>
          </span>
          <div style={{ width:1,height:18,background:"#0A2040",margin:"0 4px" }} />
          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#00FF88",animation:"blink 1.6s ease infinite" }} />
            <span style={{ fontSize:9,color:"#00AA66",letterSpacing:".15em",fontWeight:600 }}>ONLINE 24H</span>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          {[["whatsapp","#00A8FF","WhatsApp"],["instagram","#0077EE","Instagram"],["zap","#00CCFF","IA Ativa"]].map(([ic,c,t]) => (
            <span key={t} className="ftag" style={{ background:"transparent",border:`1px solid ${c}33`,color:c,gap:5 }}>
              <Icon name={ic} size={11} color={c} />{t}
            </span>
          ))}
        </div>
      </header>

      <div style={{ display:"flex",position:"relative",zIndex:1 }}>
        {/* SIDEBAR */}
        <aside style={{ width:196,minWidth:196,padding:"24px 10px",position:"sticky",top:56,height:"calc(100vh - 56px)",overflowY:"auto",background:"linear-gradient(180deg,#020C1E,#020818)",borderRight:"1px solid #0A2040" }}>
          <div className="lbl" style={{ padding:"0 14px",marginBottom:10 }}>MÓDULOS</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn ${active===n.id?"on":""}`} onClick={() => setActive(n.id)}>
              <Icon name={n.icon} size={13} color={active===n.id?"#00CCFF":"#1A4060"} />
              {n.label}
            </button>
          ))}
          <div style={{ margin:"20px 14px",height:1,background:"#0A2040" }} />
          <div className="lbl" style={{ padding:"0 14px",marginBottom:12 }}>STATS</div>
          {[["MRR POTENCIAL","R$ 6.370","#00A8FF"],["CLIENTES ALVO","10 lojas","#0077EE"],["ROI CLIENTE","3× em 30d","#00CCFF"]].map(([l,v,c]) => (
            <div key={l} style={{ padding:"7px 14px",marginBottom:4 }}>
              <div className="lbl" style={{ marginBottom:3,fontSize:8 }}>{l}</div>
              <div style={{ fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:13,color:c,textShadow:`0 0 12px ${c}55` }}>{v}</div>
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main style={{ flex:1,padding:"38px 46px",maxWidth:980 }}>

          {/* ── OVERVIEW ── */}
          {active==="overview" && (
            <div className="fade">
              {/* hero */}
              <div style={{ position:"relative",borderRadius:8,overflow:"hidden",marginBottom:28,background:"linear-gradient(135deg,#020D22,#031628,#020E1E)",border:"1px solid #0A2A4A",minHeight:230,padding:"44px 42px" }}>
                <HexPattern />
                <div style={{ position:"absolute",right:0,top:0,bottom:0,width:"40%",background:"linear-gradient(135deg,transparent 20%,#00A8FF07 60%,#0055CC0E 100%)",pointerEvents:"none" }} />
                <div style={{ position:"relative",zIndex:2 }}>
                  <span className="ftag" style={{ background:"#00A8FF10",border:"1px solid #00A8FF2A",color:"#00A8FF",marginBottom:16,display:"inline-flex",gap:5 }}>
                    <Icon name="sparkle" size={10} color="#00A8FF"/> SOLUÇÃO COMPLETA
                  </span>
                  <h1 style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:46,letterSpacing:".04em",color:"#E8F4FF",marginBottom:12,lineHeight:1.1,textShadow:"0 0 40px #00A8FF33" }}>
                    INSTA<span style={{ color:"#00A8FF",textShadow:"0 0 18px #00A8FF" }}>FLOW</span>
                  </h1>
                  <p style={{ fontSize:13,color:"#2A5070",maxWidth:480,lineHeight:1.7,marginBottom:30,fontWeight:400 }}>
                    Agente de vendas com IA para lojas no Instagram e WhatsApp. Vende, atende e recupera clientes 24 horas por dia.
                  </p>
                  <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                    {[[<Icon name="trending" size={18} color="#00A8FF"/>,"300%","em vendas"],[<Icon name="clock" size={18} color="#0077EE"/>,"24h","ativo"],[<Icon name="zap" size={18} color="#0099CC"/>,"0s","resposta"],[<Icon name="infinity" size={18} color="#00BBDD"/>,"∞","escala"]].map(([ic,v,l],i) => (
                      <div key={l} style={{ background:"rgba(0,168,255,.06)",border:"1px solid #00A8FF1A",borderRadius:5,padding:"11px 16px",minWidth:100 }}>
                        <div style={{ marginBottom:4 }}>{ic}</div>
                        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:18,fontWeight:700,color:["#00A8FF","#0077EE","#0099CC","#00BBDD"][i],textShadow:`0 0 12px ${["#00A8FF","#0077EE","#0099CC","#00BBDD"][i]}88` }}>{v}</div>
                        <div style={{ fontSize:9,color:"#1A4060",letterSpacing:".1em",marginTop:2 }}>{l.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lbl" style={{ marginBottom:12 }}>ESTRUTURA DO AGENTE — 6 ETAPAS</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:26 }}>
                {[["01","BOAS-VINDAS","Cumprimento automático, coleta nome, identifica intenção","#00A8FF"],["02","DESCOBERTA","Pergunta o que busca, segmenta por categoria e interesse","#0088FF"],["03","APRESENTAÇÃO","Envia produtos, fotos, preços e benefícios personalizados","#0066FF"],["04","OBJEÇÃO","Trata preço, prazo e desconfiança com empatia","#0044DD"],["05","FECHAMENTO","Envia link de pagamento, cria urgência, confirma","#0033BB"],["06","PÓS-VENDA","Envia rastreio, pede avaliação, oferece próxima compra","#00AACC"]].map(([n,t,d,c]) => (
                  <div key={n} className="card">
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${c}44,transparent)` }} />
                    <div style={{ fontFamily:"'Orbitron',monospace",fontSize:9,color:c,letterSpacing:".14em",marginBottom:6 }}>ETAPA {n}</div>
                    <div style={{ fontWeight:700,fontSize:12,color:"#80B8D8",marginBottom:5,letterSpacing:".04em" }}>{t}</div>
                    <div style={{ fontSize:11,color:"#1A4060",lineHeight:1.5 }}>{d}</div>
                  </div>
                ))}
              </div>

              <div className="lbl" style={{ marginBottom:10 }}>GATILHOS AUTOMÁTICOS</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
                {[["alert","Escassez"],["clock","Urgência"],["users","Prova Social"],["gift","Bônus"],["shield","Garantia 30d"],["tag","Cupom DM"],["package","Frete Grátis"],["star","Mais Vendido"]].map(([ic,g]) => (
                  <span key={g} className="ftag" style={{ background:"#00A8FF07",border:"1px solid #00A8FF14",color:"#2A5070",padding:"5px 11px",fontSize:10,gap:5 }}>
                    <Icon name={ic} size={11} color="#00A8FF44"/>{g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── PERSONALITY ── */}
          {active==="personality" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>PERSONA</div>
              <h1 className="hd" style={{ marginBottom:4 }}>LUNA — VENDEDORA IA</h1>
              <p style={{ color:"#1A4060",marginBottom:26,fontSize:13 }}>A assistente que parece humana e vende como os melhores vendedores</p>

              <div style={{ background:"linear-gradient(135deg,#020E22,#030F28)",border:"1px solid #00A8FF2A",borderRadius:8,padding:26,marginBottom:20,position:"relative",overflow:"hidden",boxShadow:"0 0 40px #00A8FF08" }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00A8FF55,transparent)" }} />
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:20 }}>
                  <div style={{ width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#0033AA,#00A8FF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px #00A8FF44" }}>
                    <Icon name="bot" size={24} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Orbitron',monospace",fontSize:15,fontWeight:700,color:"#00CCFF",letterSpacing:".1em" }}>LUNA</div>
                    <div style={{ fontSize:10,color:"#1A4060",letterSpacing:".08em",marginTop:2 }}>ASSISTENTE VIRTUAL DE VENDAS v2.0</div>
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                  {[["TOM DE VOZ","Caloroso, empolgado — como uma amiga que entende muito do produto"],["LINGUAGEM","Português coloquial, sem formalidade, sem gírias forçadas"],["CADÊNCIA","1 a 2 emojis por mensagem, contextuais e naturais"],["TAMANHO","3–5 linhas por resposta, direto ao ponto"],["ENERGIA","Alta disposição, sempre positiva, nunca robótica"],["IDENTIDADE","NUNCA revela que é IA — responde como atendente real"]].map(([k,v]) => (
                    <div key={k} style={{ background:"#020C1C",border:"1px solid #0A2040",borderRadius:5,padding:12 }}>
                      <div style={{ fontSize:9,color:"#00A8FF",letterSpacing:".14em",marginBottom:4,fontFamily:"'Orbitron',monospace" }}>{k}</div>
                      <div style={{ fontSize:12,color:"#2A5070",lineHeight:1.5 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div style={{ background:"#020E14",border:"1px solid #00FF8822",borderRadius:6,padding:18 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:7,fontWeight:700,color:"#00CC66",marginBottom:14,fontSize:12,letterSpacing:".08em" }}>
                    <Icon name="check" size={14} color="#00CC66"/> LUNA FAZ
                  </div>
                  {["Chama pelo nome sempre","Termina com pergunta ou CTA","Usa 'a gente' em vez de 'nós'","Celebra a escolha do cliente","Oferece ajuda proativamente","Cria urgência sem pressão"].map(i => (
                    <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",fontSize:12,color:"#1A5040",marginBottom:8 }}>
                      <Icon name="check" size={12} color="#00AA55"/>{i}
                    </div>
                  ))}
                </div>
                <div style={{ background:"#140A08",border:"1px solid #FF444422",borderRadius:6,padding:18 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:7,fontWeight:700,color:"#FF5544",marginBottom:14,fontSize:12,letterSpacing:".08em" }}>
                    <Icon name="x" size={14} color="#FF5544"/> LUNA EVITA
                  </div>
                  {['"Conforme solicitado..."','"Prezado cliente"',"Responder sem CTA","Textos longos e densos","Revelar que é IA","Ignorar objeções de preço"].map(i => (
                    <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",fontSize:12,color:"#3A1A10",marginBottom:8 }}>
                      <Icon name="x" size={12} color="#CC3322"/>{i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FLOWS ── */}
          {active==="flows" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>SIMULAÇÃO</div>
              <h1 className="hd" style={{ marginBottom:4 }}>FLUXOS DE CONVERSA</h1>
              <p style={{ color:"#1A4060",marginBottom:22,fontSize:13 }}>Conversas reais simuladas pela Luna</p>
              <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:22 }}>
                {Object.keys(FLOWS).map(f => (
                  <button key={f} className={`flow-btn ${activeFlow===f?"af":""}`} onClick={() => setActiveFlow(f)}>{f}</button>
                ))}
              </div>
              <div style={{ background:"#020C1C",border:`1px solid ${FLOWS[activeFlow].color}33`,borderRadius:8,overflow:"hidden",boxShadow:`0 0 28px ${FLOWS[activeFlow].color}08` }}>
                <div style={{ padding:"11px 18px",background:`linear-gradient(90deg,${FLOWS[activeFlow].color}0E,transparent)`,borderBottom:`1px solid ${FLOWS[activeFlow].color}1A`,display:"flex",alignItems:"center",gap:9 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:FLOWS[activeFlow].color,boxShadow:`0 0 7px ${FLOWS[activeFlow].color}` }} />
                  <span style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:11,color:FLOWS[activeFlow].color,letterSpacing:".1em" }}>{activeFlow.toUpperCase()}</span>
                  <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:5 }}>
                    <Icon name="bot" size={11} color="#1A4060"/>
                    <span style={{ fontSize:9,color:"#1A4060",letterSpacing:".08em" }}>LUNA ACTIVE</span>
                  </div>
                </div>
                <div style={{ padding:22,display:"flex",flexDirection:"column",gap:14 }}>
                  {FLOWS[activeFlow].steps.map((s,i) => (
                    <div key={i} style={{ display:"flex",justifyContent:s.role==="ai"?"flex-start":"flex-end" }}>
                      <div style={{
                        maxWidth:"76%",borderRadius:s.role==="ai"?"2px 10px 10px 10px":"10px 2px 10px 10px",
                        padding:"11px 15px",fontSize:12.5,lineHeight:1.7,
                        background:s.role==="ai"?`linear-gradient(135deg,#030F20,#04142A)`:"#03101E",
                        border:s.role==="ai"?`1px solid ${FLOWS[activeFlow].color}28`:"1px solid #0A2040",
                        whiteSpace:"pre-wrap",color:s.role==="ai"?"#5A90B8":"#2A5060",
                        boxShadow:s.role==="ai"?`0 0 18px ${FLOWS[activeFlow].color}06`:"none",
                      }}>
                        {s.role==="ai" && (
                          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:9,color:FLOWS[activeFlow].color,letterSpacing:".14em",marginBottom:6,fontFamily:"'Orbitron',monospace" }}>
                            <Icon name="bot" size={10} color={FLOWS[activeFlow].color}/> LUNA
                          </div>
                        )}
                        <span dangerouslySetInnerHTML={{ __html: s.msg.replace(/\*\*(.*?)\*\*/g,`<strong style="color:${FLOWS[activeFlow].color}">$1</strong>`) }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TECHNICAL ── */}
          {active==="technical" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>ARQUITETURA</div>
              <h1 className="hd" style={{ marginBottom:4 }}>STACK TÉCNICA</h1>
              <p style={{ color:"#1A4060",marginBottom:26,fontSize:13 }}>100% no-code — zero programação necessária</p>
              <div style={{ background:"#020C1C",border:"1px solid #0A2040",borderRadius:6,padding:18,marginBottom:22 }}>
                <div className="lbl" style={{ marginBottom:12 }}>FLUXO DE DADOS</div>
                <div style={{ display:"flex",alignItems:"center",gap:7,overflowX:"auto",paddingBottom:4 }}>
                  {[["instagram","#00A8FF","INSTAGRAM/WA"],["whatsapp","#0088FF","MANYCHAT"],["settings","#0066FF","MAKE.COM"],["brain","#0099CC","OPENAI"],["zap","#00CCFF","CLIENTE"]].map(([ic,c,t],i,arr) => (
                    <div key={t} style={{ display:"flex",alignItems:"center",gap:7 }}>
                      <div style={{ background:"#030D1F",border:`1px solid ${c}22`,borderRadius:4,padding:"7px 12px",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",boxShadow:`0 0 8px ${c}14` }}>
                        <Icon name={ic} size={12} color={c}/>
                        <span style={{ fontSize:9,fontFamily:"'Orbitron',monospace",color:c,letterSpacing:".08em" }}>{t}</span>
                      </div>
                      {i<arr.length-1 && <span style={{ color:"#0A2040",fontSize:13 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {STACK.map(s => (
                  <div key={s.name} className="card" style={{ borderColor:s.color+"1A" }}>
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${s.color}33,transparent)` }} />
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                        <div style={{ width:40,height:40,borderRadius:6,background:`${s.color}14`,border:`1px solid ${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 12px ${s.color}18` }}>
                          <Icon name={s.icon} size={18} color={s.color}/>
                        </div>
                        <div>
                          <div style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:14,color:s.color,letterSpacing:".04em",marginBottom:3 }}>{s.name}</div>
                          <div style={{ fontSize:12,color:"#1A4060",lineHeight:1.5 }}>{s.desc}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end",marginLeft:16,flexShrink:0 }}>
                        {s.tags.map(t => (
                          <span key={t} className="ftag" style={{ background:s.color+"10",color:s.color,border:`1px solid ${s.color}28` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROMPT ── */}
          {active==="prompt" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>SISTEMA</div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22 }}>
                <div>
                  <h1 className="hd" style={{ marginBottom:3 }}>PROMPT MESTRE</h1>
                  <p style={{ color:"#1A4060",fontSize:13 }}>Cole como System Prompt na OpenAI</p>
                </div>
                <button onClick={handleCopy} style={{ background:copied?"#00FF8810":"#00A8FF10",border:`1px solid ${copied?"#00FF8840":"#00A8FF33"}`,color:copied?"#00DD77":"#00A8FF",padding:"8px 18px",borderRadius:4,fontSize:11,fontFamily:"'Exo 2',sans-serif",fontWeight:700,cursor:"pointer",letterSpacing:".1em",display:"flex",alignItems:"center",gap:7,boxShadow:`0 0 10px ${copied?"#00FF8820":"#00A8FF18"}` }}>
                  <Icon name={copied?"check":"copy"} size={13} color={copied?"#00DD77":"#00A8FF"}/>
                  {copied?"COPIADO":"COPIAR"}
                </button>
              </div>
              <div style={{ background:"#010812",border:"1px solid #0A2040",borderRadius:8,overflow:"hidden",boxShadow:"0 0 28px #00A8FF06" }}>
                <div style={{ padding:"9px 16px",background:"#020C1C",borderBottom:"1px solid #0A2040",display:"flex",alignItems:"center",gap:8 }}>
                  {["#FF5555","#FFAA00","#00FF88"].map(c => <div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c+"88" }}/>)}
                  <span style={{ fontSize:10,color:"#1A4060",fontFamily:"'Orbitron',monospace",marginLeft:6,letterSpacing:".06em" }}>system_prompt.txt</span>
                  <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ width:5,height:5,borderRadius:"50%",background:"#00A8FF",animation:"blink 1.5s infinite" }}/>
                    <span style={{ fontSize:9,color:"#1A4060",letterSpacing:".1em" }}>ATIVO</span>
                  </div>
                </div>
                <pre style={{ padding:22,fontSize:12,lineHeight:1.9,color:"#1A4060",fontFamily:"'Orbitron','Courier New',monospace",overflowX:"auto",whiteSpace:"pre-wrap" }}>{PROMPT}</pre>
              </div>
              <div style={{ background:"#00FF8806",border:"1px solid #00FF8818",borderRadius:5,padding:13,marginTop:14,display:"flex",alignItems:"center",gap:8 }}>
                <Icon name="zap" size={13} color="#00AA55"/>
                <span style={{ fontSize:12,color:"#1A5040" }}>Use temperatura 0.7 + gpt-4o-mini. Custo por conversa: menos de R$ 0,02.</span>
              </div>
            </div>
          )}

          {/* ── COMMERCIAL ── */}
          {active==="commercial" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>NEGÓCIO</div>
              <h1 className="hd" style={{ marginBottom:4 }}>ESTRATÉGIA COMERCIAL</h1>
              <p style={{ color:"#1A4060",marginBottom:26,fontSize:13 }}>Nichos, preços e como prospectar clientes</p>

              <div className="lbl" style={{ marginBottom:10 }}>NICHOS IDEAIS</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:26 }}>
                {NICHES.map(n => (
                  <div key={n.name} className="card" style={{ textAlign:"center",padding:16 }}>
                    <div style={{ width:36,height:36,borderRadius:6,background:"#00A8FF0E",border:"1px solid #00A8FF18",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px" }}>
                      <Icon name={n.icon} size={18} color="#00A8FF"/>
                    </div>
                    <div style={{ fontWeight:700,fontSize:12,color:"#3A6080",letterSpacing:".06em",marginBottom:6 }}>{n.name}</div>
                    <div style={{ display:"flex",justifyContent:"center",gap:2 }}><Stars n={n.stars}/></div>
                  </div>
                ))}
              </div>

              <div className="lbl" style={{ marginBottom:10 }}>TABELA DE PREÇOS</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:13,marginBottom:26 }}>
                {PRICING.map(p => (
                  <div key={p.name} className={`pcard ${p.highlight?"pfeat":""}`} style={{ position:"relative",marginTop:p.highlight?10:0 }}>
                    {p.highlight && <>
                      <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00A8FF,transparent)" }}/>
                      <div style={{ position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(90deg,#0033AA,#00A8FF)",color:"#fff",fontSize:9,padding:"3px 12px",borderRadius:2,fontFamily:"'Orbitron',monospace",letterSpacing:".1em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4 }}>
                        <Icon name="star" size={8} color="#fff"/> TOP SELLING
                      </div>
                    </>}
                    <div style={{ fontFamily:"'Orbitron',monospace",fontSize:10,color:p.color,letterSpacing:".12em",marginBottom:8 }}>{p.name.toUpperCase()}</div>
                    <div style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:24,color:"#C8E0FF",marginBottom:2 }}>{p.setup}</div>
                    <div style={{ fontSize:11,color:"#1A4060",marginBottom:15 }}>setup único + {p.monthly}</div>
                    {p.features.map(f => (
                      <div key={f} style={{ display:"flex",gap:7,alignItems:"flex-start",fontSize:11,color:"#1A4060",marginBottom:6 }}>
                        <Icon name="check" size={11} color={p.color}/>{f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="lbl" style={{ marginBottom:10 }}>MENSAGEM DE PROSPECÇÃO</div>
              <div style={{ background:"#010812",border:"1px solid #0A2040",borderRadius:7,padding:18,fontFamily:"'Orbitron','Courier New',monospace",fontSize:11,lineHeight:1.9,color:"#1A4060",position:"relative" }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:10,paddingBottom:10,borderBottom:"1px solid #0A2040" }}>
                  <Icon name="send" size={12} color="#1A4060"/>
                  <span style={{ fontSize:9,letterSpacing:".12em" }}>WhatsApp / Instagram DM</span>
                </div>
{`Oi [Nome]!

Vi sua loja no Instagram e percebi que vocês atendem 
muita gente por DM e WhatsApp...

Imagina ter uma atendente virtual respondendo seus 
clientes 24h, fechando vendas enquanto você dorme?

O InstaFlow faz exatamente isso:
[+] Responde automaticamente 24h
[+] Envia catálogo e preços
[+] Recupera clientes indecisos
[+] Instagram + WhatsApp integrados

Posso te mostrar uma demo de 10 minutos essa semana?`}
              </div>
            </div>
          )}

          {/* ── EXTRAS ── */}
          {active==="extras" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>MÓDULOS</div>
              <h1 className="hd" style={{ marginBottom:4 }}>ADD-ONS PREMIUM</h1>
              <p style={{ color:"#1A4060",marginBottom:26,fontSize:13 }}>Módulos extras para aumentar o ticket por cliente</p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22 }}>
                {ADDONS.map(a => (
                  <div key={a.name} className="card">
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00A8FF2A,transparent)" }}/>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                      <div style={{ width:34,height:34,borderRadius:6,background:"#00A8FF0C",border:"1px solid #00A8FF18",display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <Icon name={a.icon} size={16} color="#00A8FF"/>
                      </div>
                      <span className="ftag" style={{ background:"#00A8FF0E",color:"#00A8FF",border:"1px solid #00A8FF28" }}>{a.value}</span>
                    </div>
                    <div style={{ fontWeight:700,fontSize:12,color:"#4A80A0",marginBottom:5,letterSpacing:".04em" }}>{a.name}</div>
                    <div style={{ fontSize:11,color:"#1A4060",lineHeight:1.5 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"linear-gradient(135deg,#020E22,#030F2A)",border:"1px solid #00A8FF1A",borderRadius:8,padding:22,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00A8FF55,transparent)" }}/>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:16 }}>
                  <Icon name="chart" size={14} color="#00A8FF"/>
                  <span style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:12,color:"#2A6080",letterSpacing:".06em" }}>PROJEÇÃO — 10 CLIENTES PRO + ADD-ONS</span>
                </div>
                <div style={{ display:"flex",gap:28,flexWrap:"wrap" }}>
                  {[["SETUP ÚNICO","R$ 9.970","#00A8FF"],["MENSALIDADES","R$ 3.970/mês","#0077EE"],["ADD-ONS","R$ 2.400/mês","#00CCFF"],["TOTAL MÊS 1","R$ 16.340","#00EEFF"]].map(([l,v,c]) => (
                    <div key={l}>
                      <div style={{ fontSize:9,color:"#1A4060",letterSpacing:".15em",fontFamily:"'Exo 2',sans-serif",fontWeight:700,marginBottom:4 }}>{l}</div>
                      <div style={{ fontFamily:"'Orbitron',monospace",fontSize:20,fontWeight:700,color:c,textShadow:`0 0 14px ${c}55` }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DELIVERY ── */}
          {active==="delivery" && (
            <div className="fade">
              <div className="lbl" style={{ marginBottom:6 }}>DEPLOY</div>
              <h1 className="hd" style={{ marginBottom:4 }}>ENTREGA EM 48H</h1>
              <p style={{ color:"#1A4060",marginBottom:26,fontSize:13 }}>Cronograma de implementação do zero ao ar</p>
              <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:26 }}>
                {[
                  { phase:"H 01–04", title:"SETUP DAS FERRAMENTAS", color:"#00A8FF", pct:25,  tasks:["Criar conta ManyChat","Criar conta Make.com","Gerar API Key OpenAI","Conectar Instagram + WhatsApp"] },
                  { phase:"H 04–12", title:"CONSTRUÇÃO DOS FLUXOS", color:"#0088FF", pct:50,  tasks:["Criar fluxo boas-vindas","Configurar palavras-chave","Montar cenário no Make.com","Testar fluxo completo"] },
                  { phase:"H 12–24", title:"PERSONALIZAÇÃO DA IA",  color:"#0066FF", pct:75,  tasks:["Preencher prompt com dados da loja","Configurar produtos e preços","Criar cupons de recuperação","Testar 10 conversas"] },
                  { phase:"H 24–48", title:"ENTREGA AO CLIENTE",    color:"#00AACC", pct:100, tasks:["Ajustar respostas robóticas","Configurar recuperação 24h","Documentar acessos","Treinamento 1h com cliente"] },
                ].map(p => (
                  <div key={p.phase} className="card" style={{ borderColor:p.color+"18" }}>
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${p.color}33,transparent)` }}/>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                        <span className="ftag" style={{ background:p.color+"12",color:p.color,border:`1px solid ${p.color}33`,fontFamily:"'Orbitron',monospace",fontSize:9 }}>{p.phase}</span>
                        <span style={{ fontWeight:700,fontSize:13,color:"#4A80A0",letterSpacing:".04em" }}>{p.title}</span>
                      </div>
                      <span style={{ fontFamily:"'Orbitron',monospace",fontSize:11,color:p.color }}>{p.pct}%</span>
                    </div>
                    <div style={{ height:2,background:"#0A2040",borderRadius:2,marginBottom:13,overflow:"hidden" }}>
                      <div style={{ height:"100%",width:`${p.pct}%`,background:`linear-gradient(90deg,${p.color},#00CCFF)`,borderRadius:2,boxShadow:`0 0 6px ${p.color}88` }}/>
                    </div>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                      {p.tasks.map(t => (
                        <div key={t} style={{ display:"flex",gap:7,alignItems:"flex-start",fontSize:11,color:"#1A4060" }}>
                          <Icon name="check" size={11} color={p.color}/>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ position:"relative",borderRadius:8,overflow:"hidden",background:"linear-gradient(135deg,#020D22,#030F2A)",border:"1px solid #00A8FF22",padding:34,textAlign:"center",boxShadow:"0 0 50px #00A8FF08" }}>
                <WaveLines/>
                <div style={{ position:"relative",zIndex:2 }}>
                  <div style={{ width:52,height:52,borderRadius:10,background:"linear-gradient(135deg,#0033AA,#00A8FF)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 0 24px #00A8FF44" }}>
                    <Icon name="rocket" size={26} color="#fff"/>
                  </div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:20,color:"#00A8FF",textShadow:"0 0 18px #00A8FF44",marginBottom:7,letterSpacing:".06em" }}>
                    INSTAFLOW — PRONTO PARA VENDER
                  </div>
                  <p style={{ color:"#1A4060",fontSize:13,marginBottom:20 }}>48h de implementação. Sem código. Resultado no primeiro mês.</p>
                  <div style={{ display:"flex",justifyContent:"center",gap:9,flexWrap:"wrap" }}>
                    {[["clock","48H DEPLOY"],["code","SEM CÓDIGO"],["dollar","R$497–R$1.997"],["refresh","RECORRÊNCIA"]].map(([ic,b]) => (
                      <span key={b} className="ftag" style={{ background:"#00A8FF06",border:"1px solid #00A8FF14",color:"#1A4060",padding:"6px 13px",gap:6 }}>
                        <Icon name={ic} size={11} color="#00A8FF33"/>{b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

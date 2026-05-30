import { useState, useEffect, useRef } from "react";

const NAV = [
  { id: "overview", label: "Visão Geral" },
  { id: "personality", label: "Personalidade" },
  { id: "flows", label: "Fluxos" },
  { id: "technical", label: "Stack Técnica" },
  { id: "prompt", label: "Prompt Mestre" },
  { id: "commercial", label: "Comercial" },
  { id: "extras", label: "Add-ons" },
  { id: "delivery", label: "Entrega" },
];

const FLOWS = {
  "Primeiro Contato": {
    color: "#00A8FF",
    steps: [
      { role: "client", msg: "Oi, vi vocês no Instagram!" },
      { role: "ai", msg: "Oiii! 😊 Que bom que você chegou até a gente!\n\nSou a Luna, da [Loja]. Me conta: o que você está buscando hoje? 🛍️" },
      { role: "client", msg: "Quero ver os produtos" },
      { role: "ai", msg: "Perfeito! Temos categorias incríveis 💛\n\n1️⃣ Moda Feminina\n2️⃣ Acessórios\n3️⃣ Promoções do Dia\n\nQual te interessa? Mando as fotos e preços na hora!" },
    ]
  },
  "Objeção de Preço": {
    color: "#0066FF",
    steps: [
      { role: "client", msg: "Qual o preço desse vestido?" },
      { role: "ai", msg: "Boa escolha! Esse é um dos nossos queridinhos 😍\n\n💰 R$ 189,90 com frete GRÁTIS\n✅ Cores: preto, nude, vinho\n✅ Tamanhos: P ao GG\n\nQuer garantir o seu agora?" },
      { role: "client", msg: "Tá caro..." },
      { role: "ai", msg: "Entendo! 😊 Olha o que consigo fazer:\n\n🎁 Brinde surpresa incluso\n📦 Embalagem premium\n🔄 Troca grátis em 30 dias\n\nCupom 10% OFF: **LUNA10** → R$ 170,91\n\nFechamos? 🤝" },
    ]
  },
  "Recuperação": {
    color: "#0099CC",
    steps: [
      { role: "ai", msg: "Oi [Nome]! 👋 Seu carrinho está esperando por você...\n\n🎁 Cupom especial: **VOLTEI10** — 10% OFF\n⏰ Válido por 2 horas!\n\nQuer o link direto?" },
      { role: "client", msg: "sim!" },
      { role: "ai", msg: "Maravilhoso! 🎉\n\n🔗 [link-exclusivo]\n\nUsa o cupom **VOLTEI10** no checkout 💛" },
    ]
  },
  "Fechamento": {
    color: "#0044AA",
    steps: [
      { role: "ai", msg: "Vamos finalizar? 🎉\n\n📦 [Produto] — R$ [valor]\n🚚 Frete: GRÁTIS\n\nFormas de pagamento:\n💳 Cartão (12x) | 📱 Pix (5% OFF) | 🎫 Boleto\n\nQual prefere?" },
      { role: "client", msg: "Pix!" },
      { role: "ai", msg: "Ótima escolha! 5% de desconto 🤑\n\n🔗 [link-pix]\n\nConfirmado, envio o rastreio aqui mesmo! 📦✅" },
    ]
  },
};

const STACK = [
  { name: "ManyChat", icon: "💬", color: "#00A8FF", desc: "Orquestra fluxos visuais no Instagram DM e WhatsApp. Captura dados e gerencia a jornada.", tags: ["Instagram", "WhatsApp", "No-code"] },
  { name: "Make.com", icon: "⚙️", color: "#0066FF", desc: "Liga tudo: recebe webhook do ManyChat, chama a OpenAI e devolve a resposta ao cliente.", tags: ["Webhook", "Automação", "Grátis"] },
  { name: "OpenAI GPT-4o", icon: "🧠", color: "#0099CC", desc: "O cérebro da Luna. Processa mensagens livres e responde com linguagem natural.", tags: ["IA", "GPT-4o-mini", "API"] },
  { name: "WhatsApp Business", icon: "📱", color: "#00CCFF", desc: "Canal de maior conversão. Resposta automática 24h via API oficial da Meta.", tags: ["Meta API", "24h", "Oficial"] },
];

const PRICING = [
  { name: "Starter", setup: "R$ 497", monthly: "R$ 197/mês", color: "#0066FF", features: ["Fluxo básico WhatsApp", "Prompt personalizado", "3 gatilhos automáticos", "Suporte 7 dias"] },
  { name: "Pro", setup: "R$ 997", monthly: "R$ 397/mês", color: "#00A8FF", highlight: true, features: ["Tudo do Starter", "Instagram + WhatsApp", "Recuperação de carrinho", "Integração OpenAI", "Cupom automático", "Suporte 30 dias"] },
  { name: "Premium", setup: "R$ 1.997", monthly: "R$ 697/mês", color: "#00CCFF", features: ["Tudo do Pro", "Catálogo integrado", "Rastreamento pedido", "Painel de métricas", "Treinamento equipe", "Suporte dedicado"] },
];

const ADDONS = [
  { name: "Recuperação Automática", icon: "🔄", value: "+R$ 297", desc: "Detecta cliente sumido após 24h e dispara mensagem com cupom de resgate." },
  { name: "Gerador de Cupons", icon: "🎟️", value: "+R$ 197", desc: "Gera cupons únicos automaticamente baseado no comportamento detectado." },
  { name: "Captura de Leads", icon: "📲", value: "+R$ 197", desc: "Fluxo inteligente que captura WhatsApp de seguidores do Instagram." },
  { name: "Catálogo Automático", icon: "📱", value: "+R$ 247", desc: "Envia catálogo em PDF baseado na categoria de interesse do cliente." },
  { name: "Rastreamento de Pedido", icon: "📦", value: "+R$ 347", desc: "Cliente digita o pedido e recebe rastreio em tempo real via Correios." },
  { name: "Integração com Site", icon: "🌐", value: "+R$ 497", desc: "Sincroniza estoque e preços direto do WooCommerce ou Shopify." },
];

const PROMPT = `Você é Luna, assistente virtual da [NOME DA LOJA], especializada em [NICHO].

## IDENTIDADE
- Nome: Luna
- Tom: Caloroso, empolgado, profissional mas descontraído
- Personalidade: Uma amiga que entende muito do produto

## REGRAS ABSOLUTAS
1. SEMPRE cumprimente pelo nome quando disponível
2. Máximo 3 emojis por mensagem
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
- Caro → Cupom 10% + destaque valor
- Não conheço → Mostre avaliações
- Vou pensar → Urgência + garantia

## DADOS DA LOJA
[Nome, horário, prazo entrega, política troca, redes, site]`;

// Hexagon SVG pattern generator
function HexPattern({ opacity = 0.15 }) {
  const hexes = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      const x = col * 88 + (row % 2) * 44;
      const y = row * 76;
      hexes.push({ x, y, key: `${row}-${col}`, delay: (row + col) * 0.1 });
    }
  }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 880 456" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {hexes.map(({ x, y, key, delay }) => (
        <polygon
          key={key}
          points={`${x},${y + 20} ${x + 38},${y} ${x + 76},${y + 20} ${x + 76},${y + 56} ${x + 38},${y + 76} ${x},${y + 56}`}
          fill="none"
          stroke="#00A8FF"
          strokeWidth="0.6"
          opacity={opacity}
          style={{ animation: `hexPulse ${3 + delay}s ease-in-out infinite alternate` }}
        />
      ))}
    </svg>
  );
}

function WaveLines() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {[
        { d: "M-100,150 C150,50 350,250 600,120 C750,50 900,180 1100,100", color: "#00A8FF", w: 1.5, op: 0.7 },
        { d: "M-100,180 C200,80 400,280 650,150 C800,80 950,200 1100,130", color: "#0066FF", w: 1, op: 0.5 },
        { d: "M-100,120 C100,30 300,220 550,90 C700,20 850,160 1100,70", color: "#00CCFF", w: 0.8, op: 0.4 },
        { d: "M-100,200 C250,100 450,300 700,170 C850,100 950,230 1100,160", color: "#0044AA", w: 1.2, op: 0.35 },
      ].map((wave, i) => (
        <path key={i} d={wave.d} fill="none" stroke={wave.color} strokeWidth={wave.w} opacity={wave.op} filter="url(#waveGlow)"
          style={{ animation: `waveAnim ${5 + i}s ease-in-out infinite alternate` }} />
      ))}
      {/* Sparkle dots */}
      {[[200, 100], [400, 60], [600, 140], [750, 80], [900, 120]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#00CCFF" opacity="0.8" filter="url(#waveGlow)"
          style={{ animation: `sparkle ${2 + i * 0.4}s ease-in-out infinite alternate` }} />
      ))}
    </svg>
  );
}

export default function InstaFlow() {
  const [active, setActive] = useState("overview");
  const [activeFlow, setActiveFlow] = useState("Primeiro Contato");
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: "'Exo 2', 'Orbitron', sans-serif", background: "#020818", color: "#C8E0FF", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #010612; }
        ::-webkit-scrollbar-thumb { background: #00A8FF44; border-radius: 4px; }

        @keyframes hexPulse {
          from { opacity: 0.06; stroke: #00A8FF; }
          to { opacity: 0.22; stroke: #00CCFF; }
        }
        @keyframes waveAnim {
          from { transform: translateX(-20px); }
          to { transform: translateX(20px); }
        }
        @keyframes sparkle {
          from { opacity: 0.3; r: 2; }
          to { opacity: 1; r: 4; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px #00A8FF33, 0 0 40px #00A8FF11; }
          50% { box-shadow: 0 0 30px #00A8FF55, 0 0 60px #00A8FF22; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: #00A8FF33; }
          50% { border-color: #00A8FF77; }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .nav-btn {
          width: 100%; text-align: left;
          padding: 10px 16px; border-radius: 4px;
          border: none; background: transparent;
          color: #3A6080; cursor: pointer;
          font-family: 'Exo 2', sans-serif;
          font-size: 13px; font-weight: 500;
          transition: all 0.2s;
          position: relative; overflow: hidden;
          letter-spacing: 0.03em;
        }
        .nav-btn::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: #00A8FF;
          transform: scaleY(0); transition: transform 0.2s;
        }
        .nav-btn:hover { color: #80C0FF; background: #00A8FF08; }
        .nav-btn.active { color: #00CCFF; background: #00A8FF10; }
        .nav-btn.active::before { transform: scaleY(1); }

        .tech-card {
          background: linear-gradient(135deg, #030D1F 0%, #05112A 100%);
          border: 1px solid #0A2040;
          border-radius: 8px; padding: 20px;
          position: relative; overflow: hidden;
          transition: all 0.3s;
          animation: fadeUp 0.4s ease forwards;
        }
        .tech-card::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00A8FF66, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .tech-card:hover {
          border-color: #00A8FF44;
          transform: translateY(-2px);
          box-shadow: 0 8px 40px #00A8FF11, 0 0 0 1px #00A8FF22;
        }
        .tech-card:hover::after { opacity: 1; }

        .glow-card {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .flow-btn {
          padding: 8px 16px; border-radius: 4px;
          border: 1px solid #0A2040;
          background: transparent; cursor: pointer;
          font-family: 'Exo 2', sans-serif;
          font-size: 12px; font-weight: 500;
          color: #3A6080; transition: all 0.2s;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .flow-btn:hover { color: #80C0FF; border-color: #00A8FF33; }
        .flow-btn.active-flow { color: #00CCFF; border-color: #00A8FF66; background: #00A8FF0D; }

        .price-card {
          background: linear-gradient(160deg, #030D1F 0%, #05112A 100%);
          border: 1px solid #0A2040; border-radius: 8px; padding: 24px;
          transition: all 0.3s;
        }
        .price-card:hover { border-color: #00A8FF33; box-shadow: 0 0 30px #00A8FF0A; }
        .price-featured {
          border-color: #00A8FF55 !important;
          box-shadow: 0 0 40px #00A8FF18, inset 0 0 40px #00A8FF05 !important;
          animation: borderGlow 2.5s ease-in-out infinite;
        }

        .stat-num {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          background: linear-gradient(135deg, #00CCFF, #0066FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: flicker 8s ease-in-out infinite;
        }

        .section-enter { animation: fadeUp 0.35s ease forwards; }

        .tag-chip {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 2px;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          font-family: 'Exo 2', sans-serif;
        }

        .terminal-line::before {
          content: '> ';
          color: #00A8FF88;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #00A8FF33, transparent);
          margin: 24px 0;
        }
      `}</style>

      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,168,255,0.012) 2px, rgba(0,168,255,0.012) 4px)",
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(2,8,24,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #0A2040",
        padding: "0 32px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6,
            background: "linear-gradient(135deg, #0033AA, #00A8FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff",
            fontFamily: "'Orbitron', monospace",
            boxShadow: "0 0 20px #00A8FF44",
          }}>IF</div>
          <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.05em", color: "#E0F0FF" }}>
            INSTA<span style={{ color: "#00A8FF" }}>FLOW</span>
          </div>
          <div style={{ width: 1, height: 20, background: "#0A2040", margin: "0 6px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF88", animation: "dotBlink 1.5s ease infinite" }} />
            <span style={{ fontSize: 10, color: "#00AA66", letterSpacing: "0.15em", fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}>ONLINE 24H</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["WhatsApp", "Instagram", "IA Ativa"].map((t, i) => (
            <span key={t} className="tag-chip" style={{
              background: "transparent",
              border: `1px solid ${["#00A8FF44","#0066FF44","#00CCFF44"][i]}`,
              color: ["#00A8FF","#0088FF","#00CCFF"][i],
            }}>{t}</span>
          ))}
        </div>
      </header>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, minWidth: 200,
          padding: "28px 12px",
          position: "sticky", top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          background: "linear-gradient(180deg, #020C1E 0%, #020818 100%)",
          borderRight: "1px solid #0A2040",
        }}>
          <div style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 10, padding: "0 16px", fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
            MÓDULOS
          </div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn ${active === n.id ? "active" : ""}`} onClick={() => setActive(n.id)}>
              {n.label}
            </button>
          ))}

          <div className="divider-line" style={{ margin: "20px 16px" }} />

          <div style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 14, padding: "0 16px", fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
            MÉTRICAS
          </div>
          {[["MRR POTENCIAL", "R$ 6.370", "#00A8FF"], ["CLIENTES ALVO", "10 lojas", "#0088FF"], ["ROI CLIENTE", "3× / 30d", "#00CCFF"]].map(([l, v, c]) => (
            <div key={l} style={{ padding: "8px 16px", marginBottom: 4 }}>
              <div style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.12em", marginBottom: 3, fontFamily: "'Exo 2', sans-serif" }}>{l}</div>
              <div className="stat-num" style={{ fontSize: 14, background: `linear-gradient(90deg, ${c}, #00CCFF)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 1000 }}>

          {/* ── OVERVIEW ── */}
          {active === "overview" && (
            <div className="section-enter">
              {/* Hero */}
              <div style={{
                position: "relative", borderRadius: 8, overflow: "hidden", marginBottom: 32,
                background: "linear-gradient(135deg, #020D22 0%, #031628 50%, #020E1E 100%)",
                border: "1px solid #0A2A4A",
                minHeight: 240, padding: "48px 44px",
              }}>
                <HexPattern opacity={0.12} />
                <div style={{
                  position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", pointerEvents: "none",
                  background: "linear-gradient(135deg, transparent 20%, #00A8FF08 50%, #0066FF12 100%)",
                }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="tag-chip" style={{ background: "#00A8FF12", border: "1px solid #00A8FF33", color: "#00A8FF", marginBottom: 18, display: "inline-flex" }}>
                    SOLUÇÃO COMPLETA
                  </div>
                  <h1 style={{
                    fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 48,
                    letterSpacing: "0.04em", color: "#E8F4FF", marginBottom: 14, lineHeight: 1.1,
                    textShadow: "0 0 40px #00A8FF44",
                  }}>
                    INSTA<span style={{ color: "#00A8FF", textShadow: "0 0 20px #00A8FF" }}>FLOW</span>
                  </h1>
                  <p style={{ fontSize: 14, color: "#4A80A0", maxWidth: 500, lineHeight: 1.7, marginBottom: 32, fontWeight: 400 }}>
                    Agente de vendas com IA para lojas no Instagram e WhatsApp. Vende, atende e recupera clientes 24 horas por dia, sem você precisar estar online.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {[["↑300%", "em vendas"], ["24h", "ativo"], ["0s", "resposta"], ["∞", "escala"]].map(([v, l]) => (
                      <div key={l} style={{
                        background: "rgba(0,168,255,0.06)", border: "1px solid #00A8FF22",
                        borderRadius: 6, padding: "12px 18px",
                        backdropFilter: "blur(4px)",
                      }}>
                        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 700, color: "#00A8FF", textShadow: "0 0 15px #00A8FF88" }}>{v}</div>
                        <div style={{ fontSize: 10, color: "#2A5070", letterSpacing: "0.1em", marginTop: 2 }}>{l.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6 etapas */}
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
                ESTRUTURA DO AGENTE — 6 ETAPAS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
                {[
                  ["01", "BOAS-VINDAS", "Cumprimento automático, coleta nome, identifica intenção", "#00A8FF"],
                  ["02", "DESCOBERTA", "Pergunta o que busca, segmenta por categoria e interesse", "#0088FF"],
                  ["03", "APRESENTAÇÃO", "Envia produtos, fotos, preços e benefícios personalizados", "#0066FF"],
                  ["04", "OBJEÇÃO", "Trata preço, prazo e desconfiança com empatia e argumentos", "#0044DD"],
                  ["05", "FECHAMENTO", "Envia link de pagamento, cria urgência, confirma pedido", "#0033AA"],
                  ["06", "PÓS-VENDA", "Envia rastreio, pede avaliação, oferece próxima compra", "#00AACC"],
                ].map(([n, t, d, c]) => (
                  <div key={n} className="tech-card">
                    <div style={{ fontSize: 9, color: c, letterSpacing: "0.15em", marginBottom: 6, fontFamily: "'Orbitron', monospace" }}>ETAPA {n}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#C0D8F0", marginBottom: 6, letterSpacing: "0.05em" }}>{t}</div>
                    <div style={{ fontSize: 11, color: "#2A5070", lineHeight: 1.5 }}>{d}</div>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c}55, transparent)` }} />
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 12, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
                GATILHOS AUTOMÁTICOS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🔥 Escassez", "⏰ Urgência", "👥 Prova Social", "🎁 Bônus", "🔄 Garantia 30d", "💸 Cupom DM", "📲 Frete Grátis", "🏆 Mais Vendido"].map(g => (
                  <span key={g} className="tag-chip" style={{
                    background: "#00A8FF08", border: "1px solid #00A8FF1A",
                    color: "#3A6080", padding: "6px 12px", fontSize: 11,
                  }}>{g}</span>
                ))}
              </div>
            </div>
          )}

          {/* ── PERSONALITY ── */}
          {active === "personality" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>PERSONA</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                LUNA — VENDEDORA IA
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 28, fontSize: 13 }}>A assistente que parece humana e vende como os melhores vendedores</p>

              <div style={{
                background: "linear-gradient(135deg, #020E22, #030F28)",
                border: "1px solid #00A8FF33", borderRadius: 8, padding: 28, marginBottom: 24,
                position: "relative", overflow: "hidden",
                boxShadow: "0 0 40px #00A8FF0A",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00A8FF66, transparent)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "linear-gradient(135deg, #0033AA, #00A8FF)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, boxShadow: "0 0 20px #00A8FF44",
                  }}>🌙</div>
                  <div>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: "#00CCFF", letterSpacing: "0.1em" }}>LUNA</div>
                    <div style={{ fontSize: 11, color: "#1A4060", letterSpacing: "0.08em", marginTop: 2 }}>ASSISTENTE VIRTUAL DE VENDAS v2.0</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["TOM DE VOZ","Caloroso, empolgado — como uma amiga que entende muito do produto"],["LINGUAGEM","Português coloquial, sem formalidade, sem gírias forçadas"],["EMOJIS","1 a 3 por mensagem, sempre contextuais e naturais"],["TAMANHO","3–5 linhas por resposta, direto ao ponto"],["ENERGIA","Alta disposição, sempre positiva, nunca apática"],["IDENTIDADE","NUNCA revela que é IA — responde como atendente real"],].map(([k, v]) => (
                    <div key={k} style={{ background: "#020C1C", border: "1px solid #0A2040", borderRadius: 6, padding: 12 }}>
                      <div style={{ fontSize: 9, color: "#00A8FF", letterSpacing: "0.15em", marginBottom: 5, fontFamily: "'Orbitron', monospace" }}>{k}</div>
                      <div style={{ fontSize: 12, color: "#4A7090", lineHeight: 1.5 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: "#020E14", border: "1px solid #00FF8833", borderRadius: 8, padding: 20 }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: "#00DD77", marginBottom: 14, fontSize: 12, letterSpacing: "0.1em" }}>✓ LUNA FAZ</div>
                  {["Chama pelo nome sempre","Termina com pergunta ou CTA","Usa 'a gente' em vez de 'nós'","Celebra a escolha do cliente","Oferece ajuda proativamente","Cria urgência sem pressão"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#2A5060", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #00FF8844" }}>{i}</div>
                  ))}
                </div>
                <div style={{ background: "#140A08", border: "1px solid #FF444433", borderRadius: 8, padding: 20 }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: "#FF6655", marginBottom: 14, fontSize: 12, letterSpacing: "0.1em" }}>✗ LUNA EVITA</div>
                  {['"Conforme solicitado..."','"Prezado cliente"',"Responder sem CTA","Textos longos","Dizer que é IA","Ignorar objeções"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#2A5060", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #FF444433" }}>{i}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FLOWS ── */}
          {active === "flows" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>SIMULAÇÃO</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                FLUXOS DE CONVERSA
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 24, fontSize: 13 }}>Conversas reais simuladas pela Luna</p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {Object.keys(FLOWS).map(f => (
                  <button key={f} className={`flow-btn ${activeFlow === f ? "active-flow" : ""}`} onClick={() => setActiveFlow(f)}>{f}</button>
                ))}
              </div>

              <div style={{ background: "#020C1C", border: `1px solid ${FLOWS[activeFlow].color}44`, borderRadius: 8, overflow: "hidden", boxShadow: `0 0 30px ${FLOWS[activeFlow].color}0A` }}>
                <div style={{
                  padding: "12px 20px",
                  background: `linear-gradient(90deg, ${FLOWS[activeFlow].color}12, transparent)`,
                  borderBottom: `1px solid ${FLOWS[activeFlow].color}22`,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: FLOWS[activeFlow].color, boxShadow: `0 0 8px ${FLOWS[activeFlow].color}` }} />
                  <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 12, color: FLOWS[activeFlow].color, letterSpacing: "0.08em" }}>
                    {activeFlow.toUpperCase()}
                  </span>
                  <div style={{ marginLeft: "auto", fontSize: 10, color: "#1A4060" }}>LUNA AI ACTIVE</div>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                  {FLOWS[activeFlow].steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: s.role === "ai" ? "flex-start" : "flex-end" }}>
                      <div style={{
                        maxWidth: "78%", borderRadius: s.role === "ai" ? "2px 12px 12px 12px" : "12px 2px 12px 12px",
                        padding: "12px 16px", fontSize: 13, lineHeight: 1.7,
                        background: s.role === "ai"
                          ? `linear-gradient(135deg, #030F20, #04142A)`
                          : "#03101E",
                        border: s.role === "ai"
                          ? `1px solid ${FLOWS[activeFlow].color}33`
                          : "1px solid #0A2040",
                        whiteSpace: "pre-wrap",
                        color: s.role === "ai" ? "#80B8D8" : "#4A7090",
                        boxShadow: s.role === "ai" ? `0 0 20px ${FLOWS[activeFlow].color}08` : "none",
                      }}>
                        {s.role === "ai" && (
                          <div style={{ fontSize: 9, color: FLOWS[activeFlow].color, letterSpacing: "0.15em", marginBottom: 6, fontFamily: "'Orbitron', monospace" }}>
                            ◈ LUNA
                          </div>
                        )}
                        <span dangerouslySetInnerHTML={{ __html: s.msg.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${FLOWS[activeFlow].color}">$1</strong>`) }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TECHNICAL ── */}
          {active === "technical" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>ARQUITETURA</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                STACK TÉCNICA
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 28, fontSize: 13 }}>100% no-code — zero programação necessária</p>

              <div style={{ background: "#020C1C", border: "1px solid #0A2040", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.18em", marginBottom: 14, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>FLUXO DE DADOS</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                  {["INSTAGRAM/WA", "MANYCHAT", "MAKE.COM", "OPENAI", "CLIENTE"].map((item, i, arr) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{
                        background: "#030D1F", border: `1px solid ${["#00A8FF","#0088FF","#0066FF","#00AACC","#00CCFF"][i]}33`,
                        borderRadius: 4, padding: "8px 12px",
                        fontSize: 10, fontFamily: "'Orbitron', monospace", whiteSpace: "nowrap",
                        color: ["#00A8FF","#0088FF","#0066FF","#00AACC","#00CCFF"][i],
                        boxShadow: `0 0 10px ${["#00A8FF","#0088FF","#0066FF","#00AACC","#00CCFF"][i]}18`,
                      }}>{item}</div>
                      {i < arr.length - 1 && <span style={{ color: "#0A2040", fontSize: 14 }}>⟶</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {STACK.map(s => (
                  <div key={s.name} className="tech-card" style={{ borderColor: s.color + "22" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${s.color}44, transparent)` }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 28 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 15, color: s.color, letterSpacing: "0.05em" }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: "#2A5070", marginTop: 3, lineHeight: 1.5 }}>{s.desc}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", marginLeft: 16 }}>
                        {s.tags.map(t => (
                          <span key={t} className="tag-chip" style={{ background: s.color + "12", color: s.color, border: `1px solid ${s.color}33` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROMPT ── */}
          {active === "prompt" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>SISTEMA</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 4, letterSpacing: "0.04em" }}>PROMPT MESTRE</h1>
                  <p style={{ color: "#2A5070", fontSize: 13 }}>Cole como System Prompt na OpenAI</p>
                </div>
                <button onClick={handleCopy} style={{
                  background: copied ? "#00FF8812" : "#00A8FF12",
                  border: `1px solid ${copied ? "#00FF8855" : "#00A8FF44"}`,
                  color: copied ? "#00FF88" : "#00A8FF",
                  padding: "9px 20px", borderRadius: 4,
                  fontSize: 11, fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
                  cursor: "pointer", letterSpacing: "0.1em",
                  boxShadow: copied ? "0 0 12px #00FF8822" : "0 0 12px #00A8FF22",
                }}>{copied ? "✓ COPIADO" : "COPIAR"}</button>
              </div>

              <div style={{ background: "#010812", border: "1px solid #0A2040", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 30px #00A8FF08" }}>
                <div style={{
                  padding: "10px 18px", background: "#020C1C",
                  borderBottom: "1px solid #0A2040",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {["#FF5555","#FFAA00","#00FF88"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c + "88" }} />)}
                  <span style={{ fontSize: 10, color: "#1A4060", fontFamily: "'Orbitron', monospace", marginLeft: 6 }}>system_prompt.txt</span>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8FF", animation: "dotBlink 1.5s infinite" }} />
                    <span style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.1em" }}>ATIVO</span>
                  </div>
                </div>
                <pre style={{
                  padding: 24, fontSize: 12, lineHeight: 1.9,
                  color: "#2A6080", fontFamily: "'Orbitron', 'Courier New', monospace",
                  overflowX: "auto", whiteSpace: "pre-wrap",
                }}>{PROMPT}</pre>
              </div>

              <div style={{ background: "#00FF8808", border: "1px solid #00FF8822", borderRadius: 6, padding: 14, marginTop: 16 }}>
                <span style={{ fontSize: 10, color: "#00AA55", letterSpacing: "0.1em", fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>// DICA: </span>
                <span style={{ fontSize: 12, color: "#1A4040" }}>Use temperatura 0.7 + gpt-4o-mini. Custo por conversa: menos de R$ 0,02.</span>
              </div>
            </div>
          )}

          {/* ── COMMERCIAL ── */}
          {active === "commercial" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>NEGÓCIO</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                ESTRATÉGIA COMERCIAL
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 28, fontSize: 13 }}>Nichos, preços e como prospectar clientes</p>

              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>NICHOS IDEAIS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
                {[["👗","MODA FEMININA","⭐⭐⭐⭐⭐"],["🐾","PET SHOP","⭐⭐⭐⭐⭐"],["💄","COSMÉTICOS","⭐⭐⭐⭐⭐"],["💪","SUPLEMENTOS","⭐⭐⭐⭐"],["🏠","DECORAÇÃO","⭐⭐⭐⭐"],["🧸","INFANTIL","⭐⭐⭐⭐⭐"]].map(([icon,name,r]) => (
                  <div key={name} className="tech-card" style={{ textAlign: "center", padding: 16 }}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 11, color: "#4A80A0", letterSpacing: "0.08em", marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: 10 }}>{r}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>TABELA DE PREÇOS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
                {PRICING.map(p => (
                  <div key={p.name} className={`price-card ${p.highlight ? "price-featured" : ""}`} style={{ position: "relative" }}>
                    {p.highlight && (
                      <>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00A8FF, transparent)" }} />
                        <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #0033AA, #00A8FF)", color: "#fff", fontSize: 9, padding: "3px 12px", borderRadius: 2, fontFamily: "'Orbitron', monospace", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>TOP SELLING</div>
                      </>
                    )}
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, color: p.color, letterSpacing: "0.12em", marginBottom: 10 }}>{p.name.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 26, color: "#C8E0FF", marginBottom: 2 }}>{p.setup}</div>
                    <div style={{ fontSize: 11, color: "#1A4060", marginBottom: 16 }}>setup único + {p.monthly}</div>
                    {p.features.map(f => (
                      <div key={f} style={{ fontSize: 11, color: "#2A5070", marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: p.color }}>›</span> {f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>MENSAGEM DE PROSPECÇÃO</div>
              <div style={{ background: "#010812", border: "1px solid #0A2040", borderRadius: 8, padding: 20, fontFamily: "'Orbitron', 'Courier New', monospace", fontSize: 11, lineHeight: 1.9, color: "#2A5070" }}>
                <div style={{ color: "#0A2A40", marginBottom: 8, fontSize: 9 }}>// WhatsApp / Instagram DM</div>
{`Oi [Nome]! 👋

Vi sua loja no Instagram e percebi que vocês 
atendem muita gente por DM e WhatsApp...

Imagina ter uma atendente virtual respondendo 
seus clientes 24h, fechando vendas enquanto 
você dorme? 🤖

O InstaFlow faz exatamente isso:
✅ Responde automaticamente 24h
✅ Envia catálogo e preços
✅ Recupera clientes indecisos
✅ Instagram + WhatsApp integrados

Posso te mostrar uma demo de 10 minutos?`}
              </div>
            </div>
          )}

          {/* ── EXTRAS ── */}
          {active === "extras" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>MÓDULOS</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                ADD-ONS PREMIUM
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 28, fontSize: 13 }}>Módulos extras para aumentar o ticket por cliente</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {ADDONS.map((a, i) => (
                  <div key={a.name} className="tech-card">
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, #00A8FF33, transparent)` }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{a.icon}</span>
                      <span className="tag-chip" style={{ background: "#00A8FF10", color: "#00A8FF", border: "1px solid #00A8FF33" }}>{a.value}</span>
                    </div>
                    <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 12, color: "#80B8D8", marginBottom: 6, letterSpacing: "0.05em" }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#1A4060", lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg, #020E22, #030F2A)", border: "1px solid #00A8FF22", borderRadius: 8, padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00A8FF66, transparent)" }} />
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, color: "#4A80A0", letterSpacing: "0.08em", marginBottom: 16 }}>PROJEÇÃO — 10 CLIENTES PRO + ADD-ONS</div>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {[["SETUP ÚNICO","R$ 9.970","#00A8FF"],["MENSALIDADES","R$ 3.970/mês","#0088FF"],["ADD-ONS","R$ 2.400/mês","#00CCFF"],["TOTAL MÊS 1","R$ 16.340","#00EEFF"]].map(([l,v,c]) => (
                    <div key={l}>
                      <div style={{ fontSize: 9, color: "#1A4060", letterSpacing: "0.15em", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, marginBottom: 4 }}>{l}</div>
                      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 700, color: c, textShadow: `0 0 15px ${c}55` }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DELIVERY ── */}
          {active === "delivery" && (
            <div className="section-enter">
              <div style={{ fontSize: 10, color: "#1A4060", letterSpacing: "0.2em", marginBottom: 8, fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>DEPLOY</div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 32, color: "#00A8FF", textShadow: "0 0 30px #00A8FF44", marginBottom: 6, letterSpacing: "0.04em" }}>
                ENTREGA EM 48H
              </h1>
              <p style={{ color: "#2A5070", marginBottom: 28, fontSize: 13 }}>Cronograma de implementação do zero ao ar</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  { phase: "H 01–04", title: "SETUP DAS FERRAMENTAS", color: "#00A8FF", pct: 25, tasks: ["Criar conta ManyChat","Criar conta Make.com","Gerar API Key OpenAI","Conectar Instagram + WhatsApp"] },
                  { phase: "H 04–12", title: "CONSTRUÇÃO DOS FLUXOS", color: "#0088FF", pct: 50, tasks: ["Criar fluxo boas-vindas","Configurar palavras-chave","Montar cenário no Make.com","Testar fluxo completo"] },
                  { phase: "H 12–24", title: "PERSONALIZAÇÃO DA IA", color: "#0066FF", pct: 75, tasks: ["Preencher prompt com dados da loja","Configurar produtos e preços","Criar cupons de recuperação","Testar 10 conversas"] },
                  { phase: "H 24–48", title: "ENTREGA AO CLIENTE", color: "#00AACC", pct: 100, tasks: ["Ajustar respostas robóticas","Configurar recuperação 24h","Documentar acessos","Treinamento 1h com cliente"] },
                ].map(p => (
                  <div key={p.phase} className="tech-card" style={{ borderColor: p.color + "22" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}44, transparent)` }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="tag-chip" style={{ background: p.color + "14", color: p.color, border: `1px solid ${p.color}44`, fontFamily: "'Orbitron', monospace", fontSize: 9 }}>{p.phase}</span>
                        <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, color: "#80B8D8", letterSpacing: "0.05em" }}>{p.title}</span>
                      </div>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, color: p.color }}>{p.pct}%</span>
                    </div>
                    <div style={{ height: 2, background: "#0A2040", borderRadius: 2, marginBottom: 14, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.pct}%`, background: `linear-gradient(90deg, ${p.color}, #00CCFF)`, borderRadius: 2, boxShadow: `0 0 8px ${p.color}88` }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {p.tasks.map(t => (
                        <div key={t} style={{ display: "flex", gap: 8, fontSize: 11, color: "#1A4060" }}>
                          <span style={{ color: p.color, fontSize: 9, marginTop: 2 }}>◻</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                position: "relative", borderRadius: 8, overflow: "hidden",
                background: "linear-gradient(135deg, #020D22, #030F2A)",
                border: "1px solid #00A8FF33", padding: 36, textAlign: "center",
                boxShadow: "0 0 60px #00A8FF0A",
              }}>
                <WaveLines />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, marginBottom: 12 }}>🚀</div>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 22, color: "#00A8FF", textShadow: "0 0 20px #00A8FF44", marginBottom: 8, letterSpacing: "0.06em" }}>
                    INSTAFLOW — PRONTO PARA VENDER
                  </div>
                  <p style={{ color: "#1A4060", fontSize: 13, marginBottom: 22 }}>48h de implementação. Sem código. Resultado no primeiro mês.</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                    {["48H DEPLOY","SEM CÓDIGO","R$497–R$1.997","RECORRÊNCIA MENSAL"].map(b => (
                      <span key={b} className="tag-chip" style={{ background: "#00A8FF08", border: "1px solid #00A8FF1A", color: "#1A4060", padding: "6px 14px", fontSize: 10, fontFamily: "'Orbitron', monospace" }}>{b}</span>
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

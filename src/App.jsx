import { useState, useEffect, useRef } from "react";

const NAV = [
  { id: "overview", label: "Visão Geral", icon: "⬡" },
  { id: "personality", label: "Personalidade", icon: "◈" },
  { id: "flows", label: "Fluxos", icon: "⟋" },
  { id: "technical", label: "Stack Técnica", icon: "⬢" },
  { id: "prompt", label: "Prompt Mestre", icon: "◉" },
  { id: "commercial", label: "Comercial", icon: "◆" },
  { id: "extras", label: "Add-ons", icon: "✦" },
  { id: "delivery", label: "Entrega", icon: "▲" },
];

const FLOWS = {
  "Primeiro Contato": {
    tag: "TOP FUNIL",
    tagColor: "#7C3AED",
    steps: [
      { role: "client", msg: "Oi, vi vocês no Instagram!" },
      { role: "ai", msg: "Oiii! 😊 Que bom que você chegou até a gente!\n\nSou a Luna, da [Loja]. Me conta: o que você está buscando hoje? 🛍️" },
      { role: "client", msg: "Quero ver os produtos" },
      { role: "ai", msg: "Perfeito! Temos categorias incríveis que você vai amar 💛\n\n1️⃣ Moda Feminina\n2️⃣ Acessórios\n3️⃣ Promoções do Dia\n\nQual te interessa? Mando as fotos e preços na hora!" },
    ]
  },
  "Objeção de Preço": {
    tag: "CONVERSÃO",
    tagColor: "#0EA5E9",
    steps: [
      { role: "client", msg: "Qual o preço desse vestido?" },
      { role: "ai", msg: "Boa escolha! Esse é um dos nossos queridinhos 😍\n\n💰 R$ 189,90 com frete GRÁTIS\n✅ Cores: preto, nude, vinho\n✅ Tamanhos: P ao GG\n\nQuer garantir o seu agora?" },
      { role: "client", msg: "Tá caro..." },
      { role: "ai", msg: "Entendo! 😊 Olha o que consigo fazer por você:\n\n🎁 Brinde surpresa incluso\n📦 Embalagem premium\n🔄 Troca grátis em 30 dias\n\nE ainda aplico cupom de 10% OFF: **LUNA10**\n\nFicou R$ 170,91. Fechamos? 🤝" },
    ]
  },
  "Recuperação": {
    tag: "RETENÇÃO",
    tagColor: "#10B981",
    steps: [
      { role: "ai", msg: "Oi [Nome]! 👋 Seu carrinho ainda está guardadinho aqui...\n\nPreparei um mimo especial pra você:\n🎁 Cupom **VOLTEI10** — 10% OFF\n⏰ Válido por 2 horas!\n\nQuer o link direto?" },
      { role: "client", msg: "sim!" },
      { role: "ai", msg: "Maravilhoso! 🎉\n\n🔗 [link-exclusivo]\n\nUsa o cupom **VOLTEI10** no checkout.\n\nQualquer dúvida, estou aqui! 💛" },
    ]
  },
  "Fechamento": {
    tag: "VENDA",
    tagColor: "#F59E0B",
    steps: [
      { role: "ai", msg: "Vamos finalizar sua compra? 🎉\n\n📦 [Produto] — R$ [valor]\n🚚 Frete: GRÁTIS\n💳 Total: R$ [valor]\n\nFormas de pagamento:\n💳 Cartão (12x)\n📱 Pix (5% OFF)\n🎫 Boleto\n\nQual prefere?" },
      { role: "client", msg: "Pix!" },
      { role: "ai", msg: "Ótima escolha! Ganhou 5% de desconto 🤑\n\n🔗 [link-pix]\n\nAsim que confirmar, você recebe o rastreio aqui mesmo! 📦✅" },
    ]
  },
};

const STACK = [
  { name: "ManyChat", icon: "💬", color: "#7C3AED", bg: "#7C3AED18", desc: "Orquestra os fluxos visuais no Instagram DM e WhatsApp. Captura dados e gerencia a jornada.", tags: ["Instagram", "WhatsApp", "No-code"] },
  { name: "Make.com", icon: "⚙️", color: "#0EA5E9", bg: "#0EA5E918", desc: "Liga tudo: recebe webhook do ManyChat, chama a OpenAI e devolve a resposta ao cliente.", tags: ["Webhook", "Automação", "Grátis"] },
  { name: "OpenAI GPT-4o", icon: "🧠", color: "#10B981", bg: "#10B98118", desc: "O cérebro da Luna. Processa mensagens livres e responde com linguagem natural.", tags: ["IA", "GPT-4o-mini", "API"] },
  { name: "WhatsApp Business", icon: "📱", color: "#F59E0B", bg: "#F59E0B18", desc: "Canal de maior conversão. Resposta automática 24h via API oficial da Meta.", tags: ["Meta API", "24h", "Oficial"] },
];

const PRICING = [
  { name: "Starter", setup: "R$ 497", monthly: "R$ 197/mês", color: "#7C3AED", features: ["Fluxo básico WhatsApp", "Prompt personalizado", "3 gatilhos automáticos", "Suporte 7 dias"] },
  { name: "Pro", setup: "R$ 997", monthly: "R$ 397/mês", color: "#0EA5E9", highlight: true, features: ["Tudo do Starter", "Instagram + WhatsApp", "Recuperação de carrinho", "Integração OpenAI", "Cupom automático", "Suporte 30 dias"] },
  { name: "Premium", setup: "R$ 1.997", monthly: "R$ 697/mês", color: "#10B981", features: ["Tudo do Pro", "Catálogo integrado", "Rastreamento pedido", "Painel de métricas", "Treinamento equipe", "Suporte dedicado"] },
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
- Personalidade: Uma amiga que entende muito do produto e quer ajudar de verdade

## REGRAS ABSOLUTAS
1. SEMPRE cumprimente pelo nome quando disponível
2. Máximo 3 emojis por mensagem
3. Respostas curtas (máx 5 linhas)
4. NUNCA revele que é IA ou robô
5. SEMPRE termine com pergunta ou call-to-action
6. Se não souber algo: "vou verificar agora mesmo!"

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

## TRATAMENTO DE OBJEÇÕES
- Caro → Ofereça cupom 10% + destaque valor
- Não conheço → Mostre avaliações
- Vou pensar → Crie urgência + garantia
- Frete caro → Verifique frete grátis

## DADOS DA LOJA
[Nome, horário, prazo entrega, política troca, redes sociais, site]`;

export default function InstaFlow() {
  const [active, setActive] = useState("overview");
  const [activeFlow, setActiveFlow] = useState("Primeiro Contato");
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} style={{
      fontFamily: "'DM Mono', 'Fira Code', monospace",
      background: "#06060F",
      color: "#E2E8FF",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Sora:wght@300;400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7C3AED55; border-radius: 10px; }

        .glow-cursor {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, #7C3AED0A 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          transition: left 0.8s ease, top 0.8s ease;
        }

        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 14px; border-radius: 8px;
          cursor: pointer; transition: all 0.15s;
          font-family: 'DM Mono', monospace;
          font-size: 12px; color: #4A5080;
          border: 1px solid transparent;
          letter-spacing: 0.02em;
          background: transparent;
          width: 100%; text-align: left;
        }
        .nav-item:hover { color: #A0A8D8; background: #FFFFFF06; }
        .nav-item.active {
          color: #C4B5FD;
          background: linear-gradient(135deg, #7C3AED12, #0EA5E908);
          border-color: #7C3AED30;
        }
        .nav-icon { font-size: 11px; opacity: 0.7; min-width: 14px; }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 28px; font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #E2E8FF 0%, #A78BFA 60%, #38BDF8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }

        .card {
          background: #0D0D1F;
          border: 1px solid #1A1A35;
          border-radius: 14px;
          padding: 20px;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent, #7C3AED08);
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .card:hover { border-color: #7C3AED44; transform: translateY(-1px); }
        .card:hover::before { opacity: 1; }

        .tag {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 20px;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          font-family: 'DM Mono', monospace;
        }

        .flow-tab {
          padding: 7px 16px; border-radius: 6px;
          font-size: 11px; font-family: 'DM Mono', monospace;
          cursor: pointer; transition: all 0.15s;
          border: 1px solid #1A1A35;
          background: transparent; color: #4A5080;
          letter-spacing: 0.05em;
        }
        .flow-tab:hover { color: #A0A8D8; border-color: #2A2A45; }
        .flow-tab.active-tab { color: #C4B5FD; background: #7C3AED18; border-color: #7C3AED44; }

        .bubble-ai {
          background: linear-gradient(135deg, #0D0D2A, #12122A);
          border: 1px solid #7C3AED33;
          border-radius: 14px 14px 14px 2px;
          padding: 12px 16px;
          max-width: 78%;
          font-size: 12.5px; line-height: 1.7;
          white-space: pre-wrap;
        }
        .bubble-client {
          background: #0F1628;
          border: 1px solid #0EA5E933;
          border-radius: 14px 14px 2px 14px;
          padding: 12px 16px;
          max-width: 78%;
          font-size: 12.5px; line-height: 1.7;
          color: #BAC8F0;
        }

        .grid-dots {
          background-image: radial-gradient(circle, #FFFFFF08 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .metric-card {
          background: #0D0D1F;
          border: 1px solid #1A1A35;
          border-radius: 12px; padding: 18px 20px;
          transition: all 0.2s;
        }
        .metric-card:hover { border-color: #7C3AED33; }

        .kbd {
          background: #12122A; border: 1px solid #2A2A45;
          border-radius: 5px; padding: 2px 8px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: #7C85B0;
        }

        .highlight-plan {
          background: linear-gradient(135deg, #0F0F28, #12102A) !important;
          border-color: #7C3AED66 !important;
        }

        .step-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; flex-shrink: 0;
          font-family: 'Sora', sans-serif;
        }

        .copy-btn {
          padding: 8px 18px; border-radius: 8px;
          font-size: 11px; font-family: 'DM Mono', monospace;
          cursor: pointer; transition: all 0.15s;
          letter-spacing: 0.05em;
          border: none;
        }

        .progress-bar {
          height: 3px; border-radius: 10px; background: #1A1A35;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%; border-radius: 10px;
          background: linear-gradient(90deg, #7C3AED, #0EA5E9);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.3s ease forwards; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10B981;
          animation: pulse-dot 1.8s ease infinite;
        }
      `}</style>

      {/* Ambient glow that follows mouse */}
      <div className="glow-cursor" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Background grid */}
      <div className="grid-dots" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        opacity: 0.6,
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(6,6,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1A1A35",
        padding: "0 28px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #7C3AED, #0EA5E9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff",
            fontFamily: "'Sora', sans-serif",
          }}>IF</div>
          <div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
              Insta<span style={{ background: "linear-gradient(90deg, #A78BFA, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Flow</span>
            </span>
          </div>
          <div style={{ width: 1, height: 20, background: "#1A1A35", margin: "0 4px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="live-dot" />
            <span style={{ fontSize: 10, color: "#10B981", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>SISTEMA ATIVO</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["WhatsApp", "Instagram", "24h IA"].map((t, i) => (
            <span key={t} className="tag" style={{
              background: ["#7C3AED18","#0EA5E918","#10B98118"][i],
              color: ["#A78BFA","#38BDF8","#6EE7B7"][i],
              border: `1px solid ${["#7C3AED33","#0EA5E933","#10B98133"][i]}`,
            }}>{t}</span>
          ))}
        </div>
      </header>

      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>

        {/* Sidebar */}
        <aside style={{
          width: 210, minWidth: 210,
          padding: "24px 12px",
          position: "sticky", top: 56,
          height: "calc(100vh - 56px)",
          overflowY: "auto",
          borderRight: "1px solid #1A1A3588",
          background: "rgba(6,6,15,0.6)",
          backdropFilter: "blur(10px)",
        }}>
          <div style={{ fontSize: 9, color: "#2A3060", letterSpacing: "0.15em", marginBottom: 12, padding: "0 14px", fontFamily: "'DM Mono', monospace" }}>
            NAVEGAÇÃO
          </div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${active === n.id ? "active" : ""}`} onClick={() => setActive(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}

          <div style={{ margin: "24px 14px 12px", height: 1, background: "#1A1A35" }} />
          <div style={{ fontSize: 9, color: "#2A3060", letterSpacing: "0.15em", marginBottom: 12, padding: "0 14px", fontFamily: "'DM Mono', monospace" }}>
            STATS
          </div>
          {[["MRR Potencial", "R$ 6.370", "#A78BFA"], ["Clientes Alvo", "10 lojas", "#38BDF8"], ["ROI Cliente", "3x em 30d", "#6EE7B7"]].map(([l,v,c]) => (
            <div key={l} style={{ padding: "8px 14px" }}>
              <div style={{ fontSize: 10, color: "#4A5080", marginBottom: 2 }}>{l}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c, fontFamily: "'Sora', sans-serif" }}>{v}</div>
            </div>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "36px 44px", maxWidth: 960, overflowY: "auto" }}>

          {/* ── OVERVIEW ── */}
          {active === "overview" && (
            <div className="fade-up">
              <div style={{
                background: "linear-gradient(135deg, #0D0D1F 0%, #0F0A28 50%, #0A1228 100%)",
                border: "1px solid #1A1A35",
                borderRadius: 18, padding: "40px 44px", marginBottom: 32,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -120, right: -120,
                  width: 400, height: 400, borderRadius: "50%",
                  background: "radial-gradient(circle, #7C3AED18, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: -80, left: -80,
                  width: 300, height: 300, borderRadius: "50%",
                  background: "radial-gradient(circle, #0EA5E910, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <span className="tag" style={{ background: "#7C3AED18", color: "#A78BFA", border: "1px solid #7C3AED44", marginBottom: 20, display: "inline-flex" }}>
                  SOLUÇÃO COMPLETA
                </span>

                <h1 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 48, fontWeight: 800,
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1, marginBottom: 14,
                }}>
                  InstaFlow
                </h1>

                <p style={{ fontSize: 15, color: "#7C85B0", maxWidth: 560, lineHeight: 1.7, marginBottom: 36, fontFamily: "'Sora', sans-serif", fontWeight: 300 }}>
                  Agente de vendas com IA para lojas no Instagram e WhatsApp. Vende, atende e recupera clientes 24 horas por dia.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    ["↑ 300%", "Aumento em vendas", "#7C3AED"],
                    ["24h", "Atendimento ativo", "#0EA5E9"],
                    ["0s", "Tempo de resposta", "#10B981"],
                    ["∞", "Escalabilidade", "#F59E0B"],
                  ].map(([val, label, color]) => (
                    <div key={label} className="metric-card" style={{ minWidth: 130, flex: 1 }}>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800, color, marginBottom: 4 }}>{val}</div>
                      <div style={{ fontSize: 11, color: "#4A5080" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 18, color: "#7C85B0", letterSpacing: "-0.01em" }}>
                ESTRUTURA DO AGENTE — 6 ETAPAS
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
                {[
                  ["01", "Boas-vindas", "Cumprimento automático, coleta nome, identifica intenção", "#7C3AED"],
                  ["02", "Descoberta", "Pergunta o que busca, segmenta por categoria e interesse", "#0EA5E9"],
                  ["03", "Apresentação", "Envia produtos, fotos, preços e benefícios personalizados", "#10B981"],
                  ["04", "Objeção", "Trata preço, prazo, desconfiança com empatia e argumentos", "#F59E0B"],
                  ["05", "Fechamento", "Envia link de pagamento, cria urgência, confirma pedido", "#EF4444"],
                  ["06", "Pós-venda", "Envia rastreio, pede avaliação, oferece próxima compra", "#8B5CF6"],
                ].map(([num, title, desc, color]) => (
                  <div key={num} className="card" style={{ borderColor: `${color}22` }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: color, marginBottom: 8, letterSpacing: "0.1em" }}>ETAPA {num}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#4A5080", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#7C85B0" }}>GATILHOS DE VENDA</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🔥 Escassez — últimas unidades", "⏰ Urgência — tempo limitado", "👥 Prova social — 500+ clientes", "🎁 Bônus surpresa incluso", "🔄 Garantia 30 dias", "💸 Cupom exclusivo por DM", "📲 Frete grátis acima de X", "🏆 Mais vendido da semana"].map(g => (
                  <span key={g} className="tag" style={{ background: "#0D0D1F", border: "1px solid #1A1A35", color: "#7C85B0", padding: "6px 12px", fontSize: 11 }}>{g}</span>
                ))}
              </div>
            </div>
          )}

          {/* ── PERSONALITY ── */}
          {active === "personality" && (
            <div className="fade-up">
              <div style={{ marginBottom: 8 }}>
                <span className="tag" style={{ background: "#0EA5E918", color: "#38BDF8", border: "1px solid #0EA5E933", marginBottom: 12, display: "inline-flex" }}>PERSONA</span>
              </div>
              <h1 className="section-title">Luna — A IA Vendedora</h1>
              <p style={{ color: "#4A5080", marginBottom: 32, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>A assistente virtual que parece humana e vende como os melhores vendedores</p>

              <div style={{
                background: "linear-gradient(135deg, #0D0D2A, #0A1228)",
                border: "1px solid #7C3AED33", borderRadius: 16, padding: 28, marginBottom: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, #7C3AED, #0EA5E9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                  }}>🌙</div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: "#C4B5FD" }}>Luna</div>
                    <div style={{ fontSize: 11, color: "#4A5080", fontFamily: "'DM Mono', monospace" }}>Assistente Virtual de Vendas</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["Tom de Voz", "Caloroso, empolgado, amigável — como uma amiga que entende muito do produto"],
                    ["Linguagem", "Português coloquial brasileiro, sem formalidade excessiva, sem gírias forçadas"],
                    ["Emojis", "Moderados — 1 a 3 por mensagem, sempre contextuais e naturais"],
                    ["Tamanho", "Respostas curtas (3–5 linhas), claras e diretas ao ponto"],
                    ["Energia", "Alta disposição, sempre positiva, nunca apática ou mecânica"],
                    ["Identidade", "NUNCA se identifica como IA — responde como atendente real da loja"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: "#0A0A1A", borderRadius: 10, padding: 14, border: "1px solid #1A1A35" }}>
                      <div style={{ fontSize: 9, color: "#7C3AED", letterSpacing: "0.12em", marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>{k.toUpperCase()}</div>
                      <div style={{ fontSize: 12, color: "#A0A8D8", lineHeight: 1.5, fontFamily: "'Sora', sans-serif", fontWeight: 300 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#0A1A10", border: "1px solid #10B98133", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#6EE7B7", marginBottom: 14, fontSize: 13 }}>✓ Luna FAZ</div>
                  {["Chama pelo nome sempre que possível", "Termina com pergunta ou CTA", "Usa 'a gente' em vez de 'nós'", "Celebra a escolha do cliente", "Oferece ajuda proativamente", "Cria urgência sem pressão"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#7C85B0", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #10B98144", lineHeight: 1.5 }}>{i}</div>
                  ))}
                </div>
                <div style={{ background: "#1A0A0A", border: "1px solid #EF444433", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#FCA5A5", marginBottom: 14, fontSize: 13 }}>✗ Luna EVITA</div>
                  {['"Conforme solicitado..."', '"Prezado cliente"', "Responder sem CTA", "Textos longos e densos", "Dizer que é robô/IA", "Ignorar objeções de preço"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#7C85B0", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid #EF444444", lineHeight: 1.5 }}>{i}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FLOWS ── */}
          {active === "flows" && (
            <div className="fade-up">
              <span className="tag" style={{ background: "#10B98118", color: "#6EE7B7", border: "1px solid #10B98133", marginBottom: 12, display: "inline-flex" }}>CONVERSAS</span>
              <h1 className="section-title">Fluxos Prontos</h1>
              <p style={{ color: "#4A5080", marginBottom: 28, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Exemplos reais de atendimento automatizado pela Luna</p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {Object.keys(FLOWS).map(f => (
                  <button key={f} className={`flow-tab ${activeFlow === f ? "active-tab" : ""}`} onClick={() => setActiveFlow(f)}>
                    <span className="tag" style={{ background: FLOWS[f].tagColor + "22", color: FLOWS[f].tagColor, marginRight: 6, fontSize: 9, padding: "2px 6px" }}>{FLOWS[f].tag}</span>
                    {f}
                  </button>
                ))}
              </div>

              <div style={{ background: "#0A0A18", border: `1px solid ${FLOWS[activeFlow].tagColor}33`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{
                  padding: "14px 20px",
                  background: `linear-gradient(135deg, ${FLOWS[activeFlow].tagColor}18, transparent)`,
                  borderBottom: `1px solid ${FLOWS[activeFlow].tagColor}22`,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: FLOWS[activeFlow].tagColor }} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: FLOWS[activeFlow].tagColor }}>{activeFlow}</span>
                  <span className="tag" style={{ background: FLOWS[activeFlow].tagColor + "22", color: FLOWS[activeFlow].tagColor, fontSize: 9, marginLeft: "auto" }}>{FLOWS[activeFlow].tag}</span>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                  {FLOWS[activeFlow].steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: s.role === "ai" ? "flex-start" : "flex-end" }}>
                      <div className={s.role === "ai" ? "bubble-ai" : "bubble-client"}>
                        {s.role === "ai" && (
                          <div style={{ fontSize: 9, color: "#7C3AED", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 6 }}>🌙 LUNA</div>
                        )}
                        <div dangerouslySetInnerHTML={{ __html: s.msg.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C4B5FD">$1</strong>') }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TECHNICAL ── */}
          {active === "technical" && (
            <div className="fade-up">
              <span className="tag" style={{ background: "#F59E0B18", color: "#FCD34D", border: "1px solid #F59E0B33", marginBottom: 12, display: "inline-flex" }}>NO-CODE</span>
              <h1 className="section-title">Stack Técnica</h1>
              <p style={{ color: "#4A5080", marginBottom: 28, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Implementação 100% sem código — apenas ferramentas visuais</p>

              <div style={{ background: "#0D0D1F", border: "1px solid #1A1A35", borderRadius: 14, padding: 20, marginBottom: 28 }}>
                <div style={{ fontSize: 10, color: "#4A5080", fontFamily: "'DM Mono', monospace", marginBottom: 14, letterSpacing: "0.1em" }}>FLUXO DE INTEGRAÇÃO</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                  {["Instagram / WA", "ManyChat", "Make.com", "OpenAI", "Cliente"].map((item, i, arr) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        background: "#0A0A1A", border: "1px solid #2A2A45",
                        borderRadius: 8, padding: "8px 14px",
                        fontSize: 11, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
                        color: ["#A78BFA","#EF4444","#FCD34D","#6EE7B7","#38BDF8"][i],
                      }}>{item}</div>
                      {i < arr.length - 1 && <span style={{ color: "#2A2A45", fontSize: 16 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {STACK.map(s => (
                  <div key={s.name} className="card" style={{ background: s.bg, borderColor: s.color + "33" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 26 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: s.color }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: "#4A5080", marginTop: 2 }}>{s.desc}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                        {s.tags.map(t => (
                          <span key={t} className="tag" style={{ background: s.color + "18", color: s.color, border: `1px solid ${s.color}33` }}>{t}</span>
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
            <div className="fade-up">
              <span className="tag" style={{ background: "#8B5CF618", color: "#C4B5FD", border: "1px solid #8B5CF633", marginBottom: 12, display: "inline-flex" }}>CORE</span>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                <div>
                  <h1 className="section-title">Prompt Mestre</h1>
                  <p style={{ color: "#4A5080", fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Cole como instrução de sistema na OpenAI</p>
                </div>
                <button className="copy-btn" onClick={handleCopy} style={{
                  background: copied ? "#10B98118" : "#7C3AED18",
                  border: `1px solid ${copied ? "#10B98144" : "#7C3AED44"}`,
                  color: copied ? "#6EE7B7" : "#A78BFA",
                }}>
                  {copied ? "✓ copiado" : "$ copiar"}
                </button>
              </div>

              <div style={{
                background: "#070710",
                border: "1px solid #1A1A35",
                borderRadius: 14, overflow: "hidden",
              }}>
                <div style={{
                  padding: "12px 18px",
                  background: "#0A0A1A",
                  borderBottom: "1px solid #1A1A35",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {["#EF4444","#F59E0B","#10B981"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c + "88" }} />
                  ))}
                  <span className="kbd" style={{ marginLeft: 8 }}>system_prompt.txt</span>
                </div>
                <pre style={{
                  padding: 24, fontSize: 12, lineHeight: 1.8,
                  color: "#7C85B0", fontFamily: "'DM Mono', monospace",
                  overflowX: "auto", whiteSpace: "pre-wrap",
                }}>{PROMPT}</pre>
              </div>

              <div style={{ background: "#0A1A10", border: "1px solid #10B98133", borderRadius: 12, padding: 16, marginTop: 16 }}>
                <div style={{ fontSize: 11, color: "#6EE7B7", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>// DICA DE IMPLEMENTAÇÃO</div>
                <p style={{ fontSize: 12, color: "#4A5080", lineHeight: 1.6, fontFamily: "'Sora', sans-serif", fontWeight: 300 }}>
                  Substitua os campos entre colchetes [ASSIM] com dados reais da loja. Use temperatura 0.7 na OpenAI para respostas naturais. Com gpt-4o-mini, cada conversa custa menos de R$ 0,02.
                </p>
              </div>
            </div>
          )}

          {/* ── COMMERCIAL ── */}
          {active === "commercial" && (
            <div className="fade-up">
              <span className="tag" style={{ background: "#F59E0B18", color: "#FCD34D", border: "1px solid #F59E0B33", marginBottom: 12, display: "inline-flex" }}>NEGÓCIO</span>
              <h1 className="section-title">Estratégia Comercial</h1>
              <p style={{ color: "#4A5080", marginBottom: 32, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Como precificar, prospectar e fechar clientes</p>

              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4A5080", letterSpacing: "0.1em", marginBottom: 16 }}>NICHOS IDEAIS</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
                {[
                  ["👗", "Moda Feminina", "⭐⭐⭐⭐⭐"],
                  ["🐾", "Pet Shop", "⭐⭐⭐⭐⭐"],
                  ["💄", "Cosméticos", "⭐⭐⭐⭐⭐"],
                  ["💪", "Suplementos", "⭐⭐⭐⭐"],
                  ["🏠", "Decoração", "⭐⭐⭐⭐"],
                  ["🧸", "Infantil", "⭐⭐⭐⭐⭐"],
                ].map(([icon, name, rating]) => (
                  <div key={name} className="card" style={{ textAlign: "center", padding: 16 }}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: 10 }}>{rating}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4A5080", letterSpacing: "0.1em", marginBottom: 16 }}>TABELA DE PREÇOS</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
                {PRICING.map(p => (
                  <div key={p.name} className={`card ${p.highlight ? "highlight-plan" : ""}`} style={{
                    borderColor: p.highlight ? p.color + "55" : p.color + "22",
                    position: "relative",
                  }}>
                    {p.highlight && (
                      <div style={{
                        position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                        background: `linear-gradient(90deg, #7C3AED, #0EA5E9)`,
                        color: "#fff", fontSize: 9, padding: "3px 12px", borderRadius: 20,
                        fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", whiteSpace: "nowrap",
                      }}>MAIS VENDIDO</div>
                    )}
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: p.color, letterSpacing: "0.1em", marginBottom: 8 }}>{p.name.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800, color: "#E2E8FF", marginBottom: 2 }}>{p.setup}</div>
                    <div style={{ fontSize: 11, color: "#4A5080", marginBottom: 16 }}>setup + {p.monthly}</div>
                    {p.features.map(f => (
                      <div key={f} style={{ fontSize: 11, color: "#7C85B0", marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: p.color }}>›</span> {f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4A5080", letterSpacing: "0.1em", marginBottom: 12 }}>MENSAGEM DE PROSPECÇÃO</h3>
              <div style={{
                background: "#070710", border: "1px solid #1A1A35",
                borderRadius: 12, padding: 20,
                fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.8, color: "#7C85B0",
              }}>
                <div style={{ color: "#2A3060", marginBottom: 8, fontSize: 10 }}>// copie e envie pelo WhatsApp ou Instagram DM</div>
{`Oi [Nome]! 👋

Vi sua loja no Instagram e percebi que vocês atendem muita gente por DM e WhatsApp...

Imagina ter uma atendente virtual respondendo seus clientes 24h, enviando preços e fechando vendas enquanto você dorme? 🤖

Minha solução, o InstaFlow, faz exatamente isso:
✅ Responde clientes automaticamente
✅ Envia catálogo e preços
✅ Recupera clientes indecisos
✅ Funciona 24h no Instagram e WhatsApp

Tenho lojas do mesmo segmento faturando mais no primeiro mês.

Posso te mostrar uma demo de 10 minutos essa semana?`}
              </div>
            </div>
          )}

          {/* ── EXTRAS ── */}
          {active === "extras" && (
            <div className="fade-up">
              <span className="tag" style={{ background: "#EF444418", color: "#FCA5A5", border: "1px solid #EF444433", marginBottom: 12, display: "inline-flex" }}>ADD-ONS</span>
              <h1 className="section-title">Funções Extras</h1>
              <p style={{ color: "#4A5080", marginBottom: 32, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Módulos premium que aumentam o ticket médio por cliente</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                {ADDONS.map(a => (
                  <div key={a.name} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: 24 }}>{a.icon}</span>
                      <span className="tag" style={{ background: "#0EA5E918", color: "#38BDF8", border: "1px solid #0EA5E933" }}>{a.value}</span>
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "#4A5080", lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "linear-gradient(135deg, #0D0D2A, #0A1228)",
                border: "1px solid #0EA5E933", borderRadius: 14, padding: 24,
              }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🧮 Projeção com 10 clientes Pro + add-ons</div>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 16 }}>
                  {[["Setup (único)", "R$ 9.970", "#A78BFA"], ["Mensalidades", "R$ 3.970/mês", "#38BDF8"], ["Add-ons médios", "R$ 2.400/mês", "#6EE7B7"], ["Total Mês 1", "R$ 16.340", "#FCD34D"]].map(([l, v, c]) => (
                    <div key={l}>
                      <div style={{ fontSize: 10, color: "#4A5080", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{l}</div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DELIVERY ── */}
          {active === "delivery" && (
            <div className="fade-up">
              <span className="tag" style={{ background: "#10B98118", color: "#6EE7B7", border: "1px solid #10B98133", marginBottom: 12, display: "inline-flex" }}>CHECKLIST</span>
              <h1 className="section-title">Entrega em 48h</h1>
              <p style={{ color: "#4A5080", marginBottom: 32, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>Cronograma completo de implementação do zero ao ar</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {[
                  { phase: "H 01–04", title: "Setup das ferramentas", color: "#7C3AED", pct: 25, tasks: ["Criar conta ManyChat", "Criar conta Make.com", "Gerar API Key OpenAI", "Conectar Instagram + WhatsApp Business"] },
                  { phase: "H 04–12", title: "Construção dos fluxos", color: "#0EA5E9", pct: 50, tasks: ["Criar fluxo boas-vindas no ManyChat", "Configurar palavras-chave gatilho", "Montar cenário no Make.com", "Testar fluxo completo"] },
                  { phase: "H 12–24", title: "Personalização da IA", color: "#10B981", pct: 75, tasks: ["Preencher prompt com dados da loja", "Configurar produtos e preços", "Criar cupons de recuperação", "Testar 10 conversas"] },
                  { phase: "H 24–48", title: "Entrega ao cliente", color: "#F59E0B", pct: 100, tasks: ["Ajustar respostas robóticas", "Configurar recuperação de carrinho", "Documentar acessos", "Treinamento de 1h com cliente"] },
                ].map(p => (
                  <div key={p.phase} className="card" style={{ borderColor: p.color + "22" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="tag" style={{ background: p.color + "18", color: p.color, border: `1px solid ${p.color}44` }}>{p.phase}</span>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{p.title}</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: p.color }}>{p.pct}%</span>
                    </div>
                    <div className="progress-bar" style={{ marginBottom: 16 }}>
                      <div className="progress-fill" style={{ width: `${p.pct}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {p.tasks.map(t => (
                        <div key={t} style={{ display: "flex", gap: 8, fontSize: 12, color: "#4A5080" }}>
                          <span style={{ color: p.color, marginTop: 1, fontSize: 10 }}>◻</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "linear-gradient(135deg, #0D0D2A, #0A1228)",
                border: "1px solid #7C3AED33",
                borderRadius: 16, padding: 32, textAlign: "center",
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>🚀</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8, background: "linear-gradient(90deg, #C4B5FD, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InstaFlow — Pronto para Vender</div>
                <p style={{ color: "#4A5080", fontSize: 13, marginBottom: 22, fontFamily: "'Sora', sans-serif" }}>Implementação em 48h. Sem código. Resultado no primeiro mês.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                  {["48h para implementar", "Sem código", "R$ 497–R$ 1.997/cliente", "Recorrência mensal"].map(b => (
                    <span key={b} className="tag" style={{ background: "#FFFFFF08", border: "1px solid #1A1A35", color: "#7C85B0", fontSize: 11, padding: "7px 14px" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

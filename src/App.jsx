import { useState } from "react";

const sections = [
  { id: "overview", label: "Visão Geral" },
  { id: "personality", label: "Personalidade" },
  { id: "flows", label: "Fluxos Prontos" },
  { id: "technical", label: "Estrutura Técnica" },
  { id: "prompt", label: "Prompt Mestre" },
  { id: "commercial", label: "Estratégia Comercial" },
  { id: "extras", label: "Funções Extras" },
  { id: "delivery", label: "Entrega Final" },
];

const flowData = {
  "Primeiro Atendimento": {
    color: "#00E5FF",
    steps: [
      { role: "cliente", msg: "Oi, vi vocês no Instagram!" },
      { role: "ia", msg: "Oiii! 😊 Que bom que você chegou até a gente! Seja muito bem-vindo(a)! Sou a **Luna**, assistente virtual da [Loja]. Posso te ajudar a encontrar exatamente o que você precisa.\n\nMe conta: o que você está buscando hoje? 🛍️" },
      { role: "cliente", msg: "Quero ver os produtos" },
      { role: "ia", msg: "Perfeito! Temos algumas categorias incríveis que você vai amar 💛\n\n1️⃣ Moda Feminina\n2️⃣ Acessórios\n3️⃣ Promoções do Dia\n\nQual te interessa mais? Posso já te mandar as fotos e preços! 📸" },
    ]
  },
  "Cliente Pergunta Preço": {
    color: "#69FF47",
    steps: [
      { role: "cliente", msg: "Qual o preço desse vestido?" },
      { role: "ia", msg: "Boa escolha! Esse vestido é um dos nossos queridinhos 😍\n\nEle está por **R$ 189,90** e ainda tem frete GRÁTIS para todo o Brasil!\n\n✅ Disponível nas cores: preto, nude e vinho\n✅ Tamanhos: P, M, G, GG\n✅ Entrega em 5 a 8 dias úteis\n\nQuer garantir o seu? Posso te enviar o link de pagamento agora mesmo! 🔗" },
      { role: "cliente", msg: "Tá caro..." },
      { role: "ia", msg: "Entendo! 😊 Posso te ajudar com isso.\n\nOlha, além do preço justo, você também leva:\n🎁 Brinde surpresa\n📦 Embalagem presenteável\n🔄 Troca grátis em 30 dias\n\nE posso aplicar um cupom de **10% OFF** pra você: **LUNA10**\n\nFicou **R$ 170,91**. Fechamos? 🤝" },
    ]
  },
  "Cliente Pergunta Prazo": {
    color: "#FF6B6B",
    steps: [
      { role: "cliente", msg: "Quando chega se eu pedir hoje?" },
      { role: "ia", msg: "Ótima pergunta! ⏱️\n\nPedidos feitos até as **18h** saem no mesmo dia.\n\n📦 Prazo estimado:\n• Capitais: 3 a 5 dias úteis\n• Interior: 5 a 8 dias úteis\n• Express disponível! (+R$ 15)\n\nPosso rastrear seu pedido em tempo real pelo WhatsApp também 📍\n\nQuer garantir o seu agora para já sair hoje?" },
    ]
  },
  "Recuperação de Carrinho": {
    color: "#FFD93D",
    steps: [
      { role: "ia", msg: "Oi [Nome]! 👋 Notei que você ficou de olho em alguns produtos ontem...\n\nSeu carrinho ainda está guardadinho esperando por você! 🛒\n\nComo a gente gosta de você, preparei um mimo especial:\n🎁 **Cupom: VOLTEI10** — 10% OFF só pra você\n⏰ Válido por apenas **2 horas!**\n\nQuer que eu te envie o link direto? É só dizer 'sim'! 😊" },
      { role: "cliente", msg: "sim!" },
      { role: "ia", msg: "Maravilhoso! 🎉 Aqui está seu link exclusivo:\n\n🔗 [link-do-carrinho]\n\nLembra de usar o cupom **VOLTEI10** no checkout!\n\nQualquer dúvida, pode me chamar. Boa compra! 💛" },
    ]
  },
  "Fechamento da Venda": {
    color: "#C77DFF",
    steps: [
      { role: "ia", msg: "Perfeito [Nome]! Vamos finalizar sua compra? 🎉\n\nResumo do pedido:\n📦 [Produto] — R$ [valor]\n🚚 Frete: GRÁTIS\n💳 Total: R$ [valor]\n\nFormas de pagamento:\n💳 Cartão (até 12x)\n📱 Pix (5% desconto)\n🎫 Boleto\n\nQual prefere?" },
      { role: "cliente", msg: "Pix!" },
      { role: "ia", msg: "Ótima escolha! Com Pix você ainda ganha **5% desconto** 🤑\n\nValor com desconto: **R$ [valor]**\n\nAqui está seu link de pagamento:\n🔗 [link-pix]\n\nAssim que confirmar, você recebe o código de rastreio por aqui mesmo! 📦✅" },
    ]
  },
};

const promptMaster = `Você é Luna, assistente virtual da [NOME DA LOJA], uma loja online especializada em [NICHO].

## IDENTIDADE
- Nome: Luna
- Tom: Caloroso, empolgado, profissional mas descontraído
- Personalidade: Como uma amiga que entende muito de moda/produto e quer ajudar de verdade

## REGRAS DE COMPORTAMENTO
1. SEMPRE cumprimente pelo nome quando disponível
2. Use emojis com moderação (máx 3 por mensagem)
3. Respostas curtas e diretas (máx 5 linhas por mensagem)
4. NUNCA diga que é uma IA ou robô
5. Se não souber algo, diga "vou verificar agora mesmo!"
6. SEMPRE termine com uma pergunta ou call-to-action

## PROCESSO DE VENDA
Etapa 1 - RAPPORT: Cumprimente, mostre energia
Etapa 2 - DESCOBERTA: Entenda o que o cliente precisa
Etapa 3 - APRESENTAÇÃO: Mostre produto com benefícios
Etapa 4 - OBJEÇÃO: Trate com empatia + solução
Etapa 5 - FECHAMENTO: Link de pagamento + urgência suave

## GATILHOS DE VENDA
- Escassez: "Últimas unidades!"
- Urgência: "Promoção só até hoje!"
- Prova social: "Mais de 500 clientes amaram"
- Bônus: "Brinde surpresa incluso"
- Garantia: "Troca grátis em 30 dias"

## CAPTURA DE LEADS
Sempre que possível, pergunte:
- "Posso te enviar novidades por aqui?"
- "Qual seu tamanho/preferência para personalizar ofertas?"

## OBJEÇÕES COMUNS
- Caro: Ofereça cupom 10% + destaque valor/benefícios
- Não conheço a loja: Mostre avaliações/prints
- Vou pensar: Crie urgência + ofereça garantia
- Frete caro: Verifique se qualifica frete grátis

## DADOS DA LOJA
[PREENCHER: nome, horário, prazo entrega, política troca, redes sociais, site]

## FORMATO DAS RESPOSTAS
- Português brasileiro coloquial
- Parágrafos curtos
- Use negrito para destaques importantes
- Liste opções numeradas quando houver escolha`;

const technicalStack = [
  {
    tool: "ManyChat",
    icon: "💬",
    color: "#FF6B6B",
    role: "Automação de fluxos",
    desc: "Cria os fluxos visuais para Instagram DM e WhatsApp. Captura dados, aciona gatilhos e gerencia a jornada do cliente.",
    steps: ["Crie conta no ManyChat", "Conecte Instagram + WhatsApp Business", "Crie fluxo de boas-vindas", "Configure palavras-chave gatilho", "Integre via Webhook com Make.com"]
  },
  {
    tool: "OpenAI API",
    icon: "🧠",
    color: "#00E5FF",
    role: "Inteligência da IA",
    desc: "Processa mensagens livres, responde com linguagem natural e executa o prompt mestre. Usa GPT-4o-mini para custo-benefício.",
    steps: ["Crie conta na OpenAI", "Gere API Key", "Configure o prompt mestre", "Defina temperatura 0.7", "Use gpt-4o-mini (barato)"]
  },
  {
    tool: "Make.com",
    icon: "⚙️",
    color: "#69FF47",
    role: "Integração central",
    desc: "Liga tudo: recebe webhook do ManyChat, envia para OpenAI, devolve resposta ao cliente. É o cérebro da operação.",
    steps: ["Crie cenário Webhook → OpenAI → ManyChat", "Configure módulo HTTP para OpenAI", "Parse a resposta JSON", "Envie de volta via ManyChat API", "Adicione filtros e condicionais"]
  },
  {
    tool: "WhatsApp Business",
    icon: "📱",
    color: "#FFD93D",
    role: "Canal principal",
    desc: "Canal de maior conversão. Configure via API oficial ou integração nativa do ManyChat para resposta automática 24h.",
    steps: ["Crie conta Business", "Solicite acesso à API (Meta)", "Conecte ao ManyChat", "Configure mensagem de saudação", "Ative respostas automáticas"]
  },
];

const niches = [
  { name: "Moda Feminina", icon: "👗", potential: "⭐⭐⭐⭐⭐", why: "Alta demanda por DM, ticket médio R$150+" },
  { name: "Pet Shop", icon: "🐾", potential: "⭐⭐⭐⭐⭐", why: "Donos compulsivos, nicho emocional" },
  { name: "Cosméticos", icon: "💄", potential: "⭐⭐⭐⭐⭐", why: "Muitas dúvidas = precisa de atendimento" },
  { name: "Suplementos", icon: "💪", potential: "⭐⭐⭐⭐", why: "Perguntas técnicas = IA brilha" },
  { name: "Decoração", icon: "🏠", potential: "⭐⭐⭐⭐", why: "Catálogos extensos, cliente indeciso" },
  { name: "Infantil", icon: "🧸", potential: "⭐⭐⭐⭐⭐", why: "Mães muito ativas no Instagram" },
];

const pricing = [
  { plan: "Starter", price: "R$ 497", period: "setup + R$ 197/mês", color: "#69FF47", includes: ["Fluxo básico WhatsApp", "Prompt personalizado", "3 gatilhos automáticos", "Suporte 7 dias"] },
  { plan: "Pro", price: "R$ 997", period: "setup + R$ 397/mês", color: "#00E5FF", includes: ["Tudo do Starter", "Instagram + WhatsApp", "Recuperação de carrinho", "Integração OpenAI", "Cupom automático", "Suporte 30 dias"], highlight: true },
  { plan: "Premium", price: "R$ 1.997", period: "setup + R$ 697/mês", color: "#C77DFF", includes: ["Tudo do Pro", "Catálogo integrado", "Rastreamento de pedido", "Painel de métricas", "Treinamento da equipe", "Suporte dedicado"] },
];

const extras = [
  { name: "Recuperação Automática", icon: "🔄", desc: "Detecta cliente sumido após 24h e envia mensagem personalizada com cupom de resgate", value: "R$ 297" },
  { name: "Envio de Cupom", icon: "🎟️", desc: "Gera e envia cupons únicos automaticamente baseado no comportamento do cliente", value: "R$ 197" },
  { name: "Captura de Telefone", icon: "📲", desc: "Fluxo inteligente que captura WhatsApp de seguidores do Instagram de forma natural", value: "R$ 197" },
  { name: "Catálogo Automatizado", icon: "📱", desc: "Envia catálogo em PDF ou fotos baseado na categoria de interesse detectada", value: "R$ 247" },
  { name: "Rastreamento de Pedido", icon: "📦", desc: "Cliente digita o pedido e recebe atualização de rastreio em tempo real via Correios API", value: "R$ 347" },
  { name: "Integração com Site", icon: "🌐", desc: "Sincroniza estoque, preços e links de produto direto do WooCommerce ou Shopify", value: "R$ 497" },
];

export default function VendAIPro() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeFlow, setActiveFlow] = useState("Primeiro Atendimento");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptMaster);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      background: "#060608",
      color: "#E8E8F0",
      minHeight: "100vh",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d14; }
        ::-webkit-scrollbar-thumb { background: #00E5FF44; border-radius: 2px; }
        .nav-btn { transition: all 0.2s; border: none; cursor: pointer; }
        .nav-btn:hover { background: #ffffff12 !important; }
        .nav-btn.active { background: #00E5FF18 !important; color: #00E5FF !important; border-left: 2px solid #00E5FF !important; }
        .flow-btn { transition: all 0.2s; cursor: pointer; border: 1px solid #ffffff18; }
        .flow-btn:hover { border-color: #00E5FF44 !important; }
        .flow-btn.active-flow { border-color: #00E5FF !important; background: #00E5FF12 !important; }
        .card { transition: transform 0.2s, box-shadow 0.2s; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px #00000060; }
        .highlight-plan { position: relative; }
        .highlight-plan::before { content: 'MAIS VENDIDO'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #00E5FF; color: #060608; font-size: 10px; font-weight: 800; padding: 2px 10px; border-radius: 20px; white-space: nowrap; letter-spacing: 1px; }
        .bubble-ia { background: linear-gradient(135deg, #1a1a2e, #16213e); border-left: 3px solid #00E5FF; }
        .bubble-client { background: #1e1e2e; border-left: 3px solid #69FF47; }
        .grid-bg { background-image: radial-gradient(circle, #ffffff08 1px, transparent 1px); background-size: 30px 30px; }
        .glow-text { text-shadow: 0 0 40px #00E5FF66; }
        .tag { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
        pre { white-space: pre-wrap; word-break: break-word; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0a14 0%, #0d1a2e 50%, #0a0a14 100%)",
        borderBottom: "1px solid #ffffff0f",
        padding: "28px 32px",
        display: "flex", alignItems: "center", gap: 16,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "linear-gradient(135deg, #00E5FF, #0080FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 800, color: "#060608",
        }}>V</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>
            Insta<span style={{ color: "#00E5FF" }}>Flow</span>
          </div>
          <div style={{ fontSize: 11, color: "#666", letterSpacing: "2px", textTransform: "uppercase" }}>Agente de Vendas IA Completo</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span className="tag" style={{ background: "#00E5FF18", color: "#00E5FF", border: "1px solid #00E5FF44" }}>WhatsApp</span>
          <span className="tag" style={{ background: "#C77DFF18", color: "#C77DFF", border: "1px solid #C77DFF44" }}>Instagram</span>
          <span className="tag" style={{ background: "#69FF4718", color: "#69FF47", border: "1px solid #69FF4744" }}>IA 24h</span>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto" }}>

        {/* Sidebar */}
        <div style={{
          width: 220, minWidth: 220, padding: "24px 12px",
          position: "sticky", top: 73, height: "calc(100vh - 73px)",
          overflowY: "auto", borderRight: "1px solid #ffffff08",
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              className={`nav-btn ${activeSection === s.id ? "active" : ""}`}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: "100%", textAlign: "left", padding: "10px 14px",
                background: "transparent", color: activeSection === s.id ? "#00E5FF" : "#888",
                borderRadius: 8, fontSize: 13, fontWeight: 500,
                display: "block", marginBottom: 2, borderLeft: "2px solid transparent",
              }}
            >{s.label}</button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "32px 40px", maxWidth: 1000 }}>

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <div className="grid-bg" style={{
                borderRadius: 16, padding: "40px", marginBottom: 32,
                border: "1px solid #ffffff0a", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -80, right: -80,
                  width: 300, height: 300, borderRadius: "50%",
                  background: "radial-gradient(circle, #00E5FF22, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <div className="tag" style={{ background: "#00E5FF18", color: "#00E5FF", border: "1px solid #00E5FF33", marginBottom: 16 }}>SOLUÇÃO COMPLETA</div>
                <h1 className="glow-text" style={{ fontSize: 42, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-1px" }}>
                  InstaFlow
                </h1>
                <p style={{ fontSize: 16, color: "#aaa", maxWidth: 600, lineHeight: 1.6, margin: "0 0 32px" }}>
                  O agente de vendas com IA mais completo para lojas no Instagram e WhatsApp. Vende, atende e recupera clientes 24 horas por dia, sem você precisar estar online.
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {[["💰", "Aumenta vendas", "em até 300%"], ["🤖", "Atendimento", "24h automático"], ["📈", "Captura leads", "sem esforço"], ["🔄", "Recupera", "clientes perdidos"]].map(([icon, t1, t2]) => (
                    <div key={t1} style={{
                      background: "#0d0d18", border: "1px solid #ffffff0f",
                      borderRadius: 12, padding: "16px 20px", minWidth: 140,
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{t1}</div>
                      <div style={{ fontSize: 12, color: "#00E5FF" }}>{t2}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ Estrutura Completa do Agente</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                {[
                  { title: "Etapa 1 — Boas-vindas", icon: "👋", color: "#00E5FF", desc: "Cumprimento automático, coleta nome, identifica intenção do cliente" },
                  { title: "Etapa 2 — Descoberta", icon: "🔍", color: "#69FF47", desc: "Pergunta o que o cliente busca, segmenta por categoria e interesse" },
                  { title: "Etapa 3 — Apresentação", icon: "🛍️", color: "#FFD93D", desc: "Envia produtos, fotos, preços e benefícios de forma personalizada" },
                  { title: "Etapa 4 — Objeção", icon: "🤝", color: "#FF6B6B", desc: "Trata preço, prazo e desconfiança com empatia e argumentos" },
                  { title: "Etapa 5 — Fechamento", icon: "💳", color: "#C77DFF", desc: "Envia link de pagamento, cria urgência, confirma pedido" },
                  { title: "Etapa 6 — Pós-venda", icon: "📦", color: "#FF9F43", desc: "Envia rastreio, pede avaliação, oferece próxima compra" },
                ].map(item => (
                  <div className="card" key={item.title} style={{
                    background: "#0d0d18", border: `1px solid ${item.color}22`,
                    borderRadius: 12, padding: "18px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: item.color }}>{item.title}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚡ Gatilhos de Venda Automáticos</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["🔥 Escassez — últimas unidades", "⏰ Urgência — promoção por tempo", "👥 Prova social — 500+ clientes", "🎁 Bônus surpresa incluso", "🔄 Garantia de troca 30 dias", "💸 Cupom exclusivo por DM", "📲 Frete grátis acima de X", "🏆 Mais vendido da semana"].map(g => (
                  <span key={g} className="tag" style={{
                    background: "#1a1a2a", border: "1px solid #ffffff18",
                    color: "#ccc", fontSize: 12, padding: "6px 14px", borderRadius: 20,
                  }}>{g}</span>
                ))}
              </div>
            </div>
          )}

          {/* PERSONALITY */}
          {activeSection === "personality" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎭 Personalidade da IA</h1>
              <p style={{ color: "#888", marginBottom: 32 }}>A IA que parece humana e vende como os melhores vendedores</p>

              <div style={{
                background: "linear-gradient(135deg, #0d1a2e, #1a0d2e)",
                border: "1px solid #00E5FF33", borderRadius: 16, padding: 28, marginBottom: 24,
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, color: "#00E5FF" }}>🌙 Luna</div>
                <div style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>Sua assistente virtual de vendas</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    ["Tom de voz", "Caloroso, empolgado, amigável — como uma amiga que entende muito do produto"],
                    ["Linguagem", "Português coloquial brasileiro, sem formalidade excessiva, sem gírias forçadas"],
                    ["Emojis", "Moderados, 1-3 por mensagem, sempre contextuais e não forçados"],
                    ["Tamanho", "Respostas curtas (3-5 linhas), claras e diretas ao ponto"],
                    ["Energia", "Alta disposição, sempre positiva, nunca apática ou mecânica"],
                    ["Identidade", "NUNCA se identifica como IA, responde como atendente real da loja"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: "#0d0d18", borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 11, color: "#00E5FF", fontWeight: 700, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>{k}</div>
                      <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Faça vs ❌ Evite</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#0d180d", border: "1px solid #69FF4733", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontWeight: 700, color: "#69FF47", marginBottom: 12 }}>✅ Luna FAZ</div>
                  {["Chama pelo nome sempre que possível", "Termina com pergunta ou CTA", "Usa 'a gente' no lugar de 'nós'", "Celebra a escolha do cliente", "Oferece ajuda proativamente", "Cria urgência sem pressão"].map(i => (
                    <div key={i} style={{ fontSize: 13, color: "#aaa", marginBottom: 6, paddingLeft: 8, borderLeft: "2px solid #69FF4755" }}>
                      {i}
                    </div>
                  ))}
                </div>
                <div style={{ background: "#180d0d", border: "1px solid #FF6B6B33", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontWeight: 700, color: "#FF6B6B", marginBottom: 12 }}>❌ Luna EVITA</div>
                  {["\"Conforme solicitado...\"", "\"Prezado cliente\"", "Responder sem CTA", "Textos longos e densos", "Dizer que é robô/IA", "Ignorar objeções de preço"].map(i => (
                    <div key={i} style={{ fontSize: 13, color: "#aaa", marginBottom: 6, paddingLeft: 8, borderLeft: "2px solid #FF6B6B55" }}>
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FLOWS */}
          {activeSection === "flows" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💬 Fluxos de Conversa Prontos</h1>
              <p style={{ color: "#888", marginBottom: 24 }}>Copie e use — exemplos reais de atendimento automatizado</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {Object.keys(flowData).map(f => (
                  <button
                    key={f}
                    className={`flow-btn ${activeFlow === f ? "active-flow" : ""}`}
                    onClick={() => setActiveFlow(f)}
                    style={{
                      padding: "8px 16px", borderRadius: 20, fontSize: 13,
                      background: "transparent", color: activeFlow === f ? flowData[f].color : "#888",
                      cursor: "pointer",
                    }}
                  >{f}</button>
                ))}
              </div>

              <div style={{
                background: "#0d0d18", border: `1px solid ${flowData[activeFlow].color}33`,
                borderRadius: 16, padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: flowData[activeFlow].color }} />
                  <span style={{ fontWeight: 700, color: flowData[activeFlow].color }}>{activeFlow}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {flowData[activeFlow].steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: step.role === "ia" ? "flex-start" : "flex-end" }}>
                      <div
                        className={step.role === "ia" ? "bubble-ia" : "bubble-client"}
                        style={{
                          maxWidth: "78%", borderRadius: 14, padding: "12px 16px",
                          fontSize: 13, lineHeight: 1.6,
                        }}
                      >
                        {step.role === "ia" && (
                          <div style={{ fontSize: 10, color: "#00E5FF", fontWeight: 700, marginBottom: 4, letterSpacing: 1 }}>🤖 LUNA — IA</div>
                        )}
                        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{
                          __html: step.msg
                            .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff">$1</strong>')
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TECHNICAL */}
          {activeSection === "technical" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚙️ Estrutura Técnica</h1>
              <p style={{ color: "#888", marginBottom: 32 }}>Stack completo — sem código, apenas ferramentas no-code</p>

              <div style={{
                background: "#0d0d18", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24, marginBottom: 32,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 16, color: "#aaa", fontSize: 13 }}>FLUXO DE INTEGRAÇÃO</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                  {["Instagram / WhatsApp", "ManyChat", "Make.com", "OpenAI GPT-4o", "Resposta ao Cliente"].map((item, i, arr) => (
                    <>
                      <div key={item} style={{
                        background: "#1a1a2e", border: "1px solid #ffffff18",
                        borderRadius: 10, padding: "10px 16px", whiteSpace: "nowrap",
                        fontSize: 12, fontWeight: 600, color: ["#C77DFF","#FF6B6B","#FFD93D","#00E5FF","#69FF47"][i],
                      }}>{item}</div>
                      {i < arr.length - 1 && <span style={{ color: "#444", fontSize: 18 }}>→</span>}
                    </>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {technicalStack.map(t => (
                  <div className="card" key={t.tool} style={{
                    background: "#0d0d18", border: `1px solid ${t.color}22`, borderRadius: 14, padding: 24,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>{t.icon}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16, color: t.color }}>{t.tool}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{t.role}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#999", margin: "0 0 16px", lineHeight: 1.6 }}>{t.desc}</p>
                    <div style={{ borderTop: `1px solid ${t.color}22`, paddingTop: 14 }}>
                      <div style={{ fontSize: 11, color: t.color, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PASSO A PASSO</div>
                      {t.steps.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                          <span style={{ color: t.color, fontSize: 12, fontWeight: 700, minWidth: 16 }}>{i + 1}.</span>
                          <span style={{ fontSize: 13, color: "#bbb" }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROMPT */}
          {activeSection === "prompt" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>🧠 Prompt Mestre da IA</h1>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? "#69FF4722" : "#00E5FF18",
                    border: `1px solid ${copied ? "#69FF47" : "#00E5FF"}44`,
                    color: copied ? "#69FF47" : "#00E5FF",
                    padding: "8px 20px", borderRadius: 8,
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >{copied ? "✓ Copiado!" : "Copiar Prompt"}</button>
              </div>
              <p style={{ color: "#888", marginBottom: 24 }}>Cole este prompt no sistema da OpenAI como instrução de sistema</p>

              <div style={{
                background: "#080810", border: "1px solid #00E5FF22",
                borderRadius: 14, padding: 24, position: "relative",
              }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                  ))}
                  <span style={{ fontSize: 11, color: "#555", marginLeft: 8 }}>system_prompt.txt</span>
                </div>
                <pre style={{
                  fontSize: 12.5, lineHeight: 1.8, color: "#b8b8d0", margin: 0,
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                }}>{promptMaster}</pre>
              </div>

              <div style={{
                background: "#0d1a14", border: "1px solid #69FF4733",
                borderRadius: 12, padding: 18, marginTop: 20,
              }}>
                <div style={{ fontWeight: 700, color: "#69FF47", marginBottom: 8 }}>💡 Dica de Implementação</div>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0, lineHeight: 1.6 }}>
                  Substitua os campos entre colchetes [ASSIM] com dados reais da loja do cliente. Use temperatura 0.7 na OpenAI para respostas naturais mas consistentes. Com gpt-4o-mini, cada conversa custa menos de R$ 0,02.
                </p>
              </div>
            </div>
          )}

          {/* COMMERCIAL */}
          {activeSection === "commercial" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💼 Estratégia Comercial</h1>
              <p style={{ color: "#888", marginBottom: 32 }}>Como vender o InstaFlow e faturar alto</p>

              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Nichos Ideais</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
                {niches.map(n => (
                  <div className="card" key={n.name} style={{
                    background: "#0d0d18", border: "1px solid #ffffff0f",
                    borderRadius: 12, padding: 16, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{n.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{n.name}</div>
                    <div style={{ fontSize: 12, marginBottom: 6 }}>{n.potential}</div>
                    <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4 }}>{n.why}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💰 Tabela de Preços</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                {pricing.map(p => (
                  <div
                    className={`card ${p.highlight ? "highlight-plan" : ""}`}
                    key={p.plan}
                    style={{
                      background: p.highlight ? `linear-gradient(135deg, #0d1a2e, #1a0d2e)` : "#0d0d18",
                      border: `1px solid ${p.color}${p.highlight ? "66" : "33"}`,
                      borderRadius: 14, padding: 20,
                      marginTop: p.highlight ? 12 : 0,
                    }}>
                    <div style={{ fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.plan}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 2 }}>{p.price}</div>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: 16 }}>{p.period}</div>
                    {p.includes.map(i => (
                      <div key={i} style={{ fontSize: 12, color: "#bbb", marginBottom: 6, display: "flex", gap: 6 }}>
                        <span style={{ color: p.color }}>✓</span> {i}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📩 Mensagem Pronta de Prospecção</h2>
              <div style={{
                background: "#080810", border: "1px solid #C77DFF33",
                borderRadius: 14, padding: 24, fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, lineHeight: 1.8, color: "#c8c8e0",
              }}>
                <div style={{ color: "#666", marginBottom: 8, fontSize: 11 }}>// Enviar por WhatsApp ou Instagram DM</div>
                {`Oi [Nome]! 👋

Vi sua loja no Instagram e percebi que vocês atendem muita gente por DM e WhatsApp...

Imagina ter uma atendente virtual respondendo seus clientes 24h, enviando preços e fechando vendas enquanto você dorme? 🤖

Minha solução, o InstaFlow, faz exatamente isso:
✅ Responde clientes automaticamente
✅ Envia catálogo e preços
✅ Recupera clientes indecisos
✅ Funciona 24h no Instagram e WhatsApp

Tenho lojas do mesmo segmento faturando [X]% a mais no primeiro mês.

Posso te mostrar uma demo de 10 minutos esta semana?`}
              </div>
            </div>
          )}

          {/* EXTRAS */}
          {activeSection === "extras" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>✨ Funções Extras</h1>
              <p style={{ color: "#888", marginBottom: 32 }}>Add-ons premium para aumentar valor percebido e ticket médio</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {extras.map(e => (
                  <div className="card" key={e.name} style={{
                    background: "#0d0d18", border: "1px solid #ffffff0a",
                    borderRadius: 14, padding: 20,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <span style={{ fontSize: 24 }}>{e.icon}</span>
                        <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6 }}>{e.name}</div>
                      </div>
                      <span className="tag" style={{ background: "#00E5FF18", color: "#00E5FF", border: "1px solid #00E5FF33", whiteSpace: "nowrap" }}>
                        +{e.value}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{e.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{
                background: "linear-gradient(135deg, #0d1a2e, #1a0d2e)",
                border: "1px solid #00E5FF33", borderRadius: 14, padding: 24, marginTop: 24,
              }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🧮 Potencial de Receita</div>
                <p style={{ fontSize: 13, color: "#aaa", margin: "0 0 16px" }}>Com 10 clientes no plano Pro + 3 add-ons cada:</p>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {[["Setup (único)", "R$ 9.970"], ["Mensalidade", "R$ 3.970/mês"], ["Add-ons médios", "R$ 2.400/mês"], ["Total Mês 1", "R$ 16.340"]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#00E5FF" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DELIVERY */}
          {activeSection === "delivery" && (
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚀 Entrega Final</h1>
              <p style={{ color: "#888", marginBottom: 32 }}>Checklist completo para ir ao ar em 48 horas</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { phase: "Hora 1-4", title: "Setup das ferramentas", color: "#00E5FF", tasks: ["Criar conta ManyChat (gratuito)", "Criar conta Make.com (gratuito)", "Gerar API Key OpenAI", "Conectar Instagram e WhatsApp Business ao ManyChat"] },
                  { phase: "Hora 4-12", title: "Construção dos fluxos", color: "#69FF47", tasks: ["Criar fluxo de boas-vindas no ManyChat", "Configurar palavras-chave (oi, olá, preço, prazo...)", "Montar cenário no Make.com (Webhook → OpenAI → Resposta)", "Testar fluxo completo"] },
                  { phase: "Hora 12-24", title: "Personalização da IA", color: "#FFD93D", tasks: ["Preencher prompt mestre com dados da loja", "Configurar produtos, preços e políticas", "Criar cupons de recuperação", "Testar 10 conversas diferentes"] },
                  { phase: "Hora 24-48", title: "Otimização e entrega", color: "#C77DFF", tasks: ["Ajustar respostas que soaram robóticas", "Configurar recuperação de carrinho (24h)", "Documentar acesso para o cliente", "Treinamento de 1h com o cliente"] },
                ].map(p => (
                  <div key={p.phase} className="card" style={{
                    background: "#0d0d18", border: `1px solid ${p.color}22`, borderRadius: 14, padding: 20,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span className="tag" style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}44` }}>{p.phase}</span>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {p.tasks.map(t => (
                        <div key={t} style={{ display: "flex", gap: 8, fontSize: 13, color: "#aaa" }}>
                          <span style={{ color: p.color, marginTop: 1 }}>◻</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "linear-gradient(135deg, #060612, #0d0d20)",
                border: "1px solid #ffffff18", borderRadius: 16, padding: 32, textAlign: "center",
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>InstaFlow — Pronto para Vender</h2>
                <p style={{ color: "#888", marginBottom: 20, maxWidth: 500, margin: "0 auto 20px" }}>
                  Uma solução moderna, escalável e com alto valor percebido. Mínimo de implementação, máximo de resultado para o cliente.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  {["48h para implementar", "Sem código necessário", "R$ 497 a R$ 1.997 por venda", "Recorrência mensal"].map(b => (
                    <span key={b} className="tag" style={{
                      background: "#ffffff08", border: "1px solid #ffffff18",
                      color: "#ccc", fontSize: 13, padding: "8px 16px",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const createStack = (title, groups) => {
  const section = document.createElement('section');
  section.className = 'tech-stack reveal visible';
  section.innerHTML = `
    <div class="tech-stack-heading">
      <p class="eyebrow">TECH STACK</p>
      <h3>${title}</h3>
    </div>
    <div class="tech-stack-list">
      ${groups.map(({ label, value }) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}
    </div>`;
  return section;
};

const insertAfter = (target, element) => target?.insertAdjacentElement('afterend', element);

const cadLead = document.querySelector('.detail-page:not(.ai-page) .detail-lead');
if (cadLead) {
  const stack = createStack('工程资料智能处理', [
    { label: '语言', value: 'Python · TypeScript' },
    { label: '服务与前端', value: 'FastAPI · Vue 3 · Vite · Element Plus' },
    { label: '模型与文档智能', value: 'OpenAI-Compatible LLM · LangChain · RapidOCR · GOT-OCR 2' },
    { label: '数据与交付', value: 'SQLite · Chroma · Docker Compose' },
  ]);
  cadLead.closest('.detail-hero')?.insertAdjacentElement('afterend', stack);
}

const aiStacks = {
  finance: {
    title: '金融垂域模型工程',
    groups: [
      { label: '训练范式', value: 'SFT · DPO · 数据增强与质量筛选' },
      { label: '评测', value: 'GPT-4-as-a-Judge · 问答与问答对评测' },
      { label: '推理与编排', value: 'Ascend 910B · FastChat · LangChain' },
    ],
  },
  codura: {
    title: 'IDE 原生代码智能',
    groups: [
      { label: '语言', value: 'Java · JavaScript' },
      { label: '客户端与服务端', value: 'IntelliJ Platform SDK · Spring Boot · Vue 2' },
      { label: '大模型交互', value: 'OpenAI-Compatible API · SSE Streaming · FIM 补全' },
      { label: '数据与交付', value: 'MySQL · Redis · Docker Compose' },
    ],
  },
  compliance: {
    title: '法律合规 RAG 系统',
    groups: [
      { label: '语言', value: 'Java · JavaScript' },
      { label: '应用框架', value: 'Spring Boot · Vue 2 · LangChain4j' },
      { label: '检索与推理', value: 'LightRAG · RAG · 知识图谱 · SSE' },
      { label: '数据与交付', value: 'MySQL · Milvus · Neo4j · Redis · Docker' },
    ],
  },
  talent: {
    title: '可信 Text-to-SQL',
    groups: [
      { label: '核心能力', value: 'Text-to-SQL · 复杂问题拆解 · LLM 推理' },
      { label: '可靠性设计', value: 'SQL 语义校验 · 错误感知校验 · 模式感知列名扩展' },
      { label: '数据链路', value: '自然语言 → SQL → 结构化人才数据' },
    ],
  },
};

Object.entries(aiStacks).forEach(([id, config]) => {
  const project = document.getElementById(id);
  const pmr = project?.querySelector('.pmr-grid');
  if (pmr) insertAfter(pmr, createStack(config.title, config.groups));
});

const coduraProject = document.getElementById('codura');
if (coduraProject) {
  const gate = document.createElement('article');
  gate.className = 'feature-project llm-gate-project';
  gate.id = 'llm-gate';
  gate.innerHTML = `
    <div class="section-wrap">
      <div class="feature-heading reveal visible">
        <p class="eyebrow">04 / LLM INFRASTRUCTURE</p>
        <h2>LLMGate 大模型网关</h2>
        <p>为多模型调用提供统一接入、模型路由、流式转发、并发控制、用量统计与额度管理。</p>
      </div>
      <div class="pmr-grid reveal visible" aria-label="LLMGate 的问题、方法与结果">
        <article><p class="eyebrow">PROBLEM</p><h3>多模型接入与调用治理</h3><p>不同模型服务商接口、模型别名与流式协议存在差异，业务侧还需要统一管理调用并控制成本和并发。</p></article>
        <article><p class="eyebrow">METHOD</p><h3>协议代理与策略链路</h3><p>构建兼容 OpenAI 的流式代理，按服务商与模型映射进行路由，并在请求链路中处理并发限制、用量统计与额度计算。</p></article>
        <article><p class="eyebrow">RESULT</p><h3>统一模型调用入口</h3><p>形成覆盖模型选择、SSE 流式响应、调用日志和配额管理的网关能力，降低上层应用对单一模型服务商的耦合。</p></article>
      </div>
    </div>`;
  gate.querySelector('.pmr-grid')?.insertAdjacentElement('afterend', createStack('多模型服务治理', [
    { label: '语言', value: 'Java · JavaScript' },
    { label: '服务与前端', value: 'Spring Boot · Netty · Vue 2' },
    { label: '模型服务', value: 'OpenAI-Compatible API · SSE Streaming · 模型路由' },
    { label: '数据与交付', value: 'MySQL · Redis · Docker Compose' },
  ]));
  coduraProject.insertAdjacentElement('afterend', gate);
}

const projectLabels = {
  compliance: '05 / COMPLIANCE AI',
  talent: '06 / TALENT ANALYTICS',
};

Object.entries(projectLabels).forEach(([id, label]) => {
  const heading = document.querySelector(`#${id} .feature-heading .eyebrow`);
  if (heading) heading.textContent = label;
});

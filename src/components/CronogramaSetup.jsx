import { useState } from 'react';
import { MATERIAS } from '../utils/geradorCronograma';

const DIAS = [
  { key: 'segunda', label: 'Segunda' },
  { key: 'terca', label: 'Terça' },
  { key: 'quarta', label: 'Quarta' },
  { key: 'quinta', label: 'Quinta' },
  { key: 'sexta', label: 'Sexta' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
];

const DURACOES = [
  { value: 45, label: '45 min', desc: 'Sessões curtas e objetivas' },
  { value: 60, label: '1 hora', desc: 'Balanceado — ideal para a maioria' },
  { value: 90, label: '1h 30min', desc: 'Imersão profunda' },
];

const NIVEIS = [
  { value: 'forte', label: 'Domino', desc: 'Preciso só revisar', color: '#10b981' },
  { value: 'medio', label: 'Razoável', desc: 'Sei o básico', color: '#f59e0b' },
  { value: 'fraco', label: 'Dificuldade', desc: 'Preciso estudar muito', color: '#ef4444' },
];

export default function CronogramaSetup({ focus, onConfirm, onCancel }) {
  const [step, setStep] = useState(1);
  const materiasDisponiveis = MATERIAS[focus] || MATERIAS.ambos;

  const [diasAtivos, setDiasAtivos] = useState({
    segunda: true, terca: true, quarta: true, quinta: true,
    sexta: true, sabado: true, domingo: false,
  });
  const [horasPorDia, setHorasPorDia] = useState({
    segunda: 3, terca: 3, quarta: 3, quinta: 3,
    sexta: 3, sabado: 4, domingo: 0,
  });
  const [niveis, setNiveis] = useState(() => {
    const n = {};
    materiasDisponiveis.forEach(m => { n[m] = 'medio'; });
    return n;
  });
  const [duracaoSessao, setDuracaoSessao] = useState(60);
  const [incluirRedacao, setIncluirRedacao] = useState(true);
  const [incluirSimulado, setIncluirSimulado] = useState(true);
  const [prioridades, setPrioridades] = useState([]);

  const totalHoras = DIAS.reduce((acc, d) =>
    acc + (diasAtivos[d.key] ? horasPorDia[d.key] : 0), 0
  );
  const diasAtivosCount = DIAS.filter(d => diasAtivos[d.key]).length;

  function toggleDia(key) {
    setDiasAtivos(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function setHoras(key, valor) {
    setHorasPorDia(prev => ({ ...prev, [key]: valor }));
  }

  function togglePrioridade(materia) {
    setPrioridades(prev =>
      prev.includes(materia) ? prev.filter(m => m !== materia) : [...prev, materia]
    );
  }

  function confirmar() {
    onConfirm({
      focus, diasAtivos, horasPorDia, niveis,
      duracaoSessao, incluirRedacao, incluirSimulado, prioridades,
    });
  }

  const canProgress = {
    1: totalHoras >= 2 && diasAtivosCount >= 2,
    2: true,
    3: true,
    4: true,
  };

  return (
    <div className="setup-wrap">
      <div className="setup-card">
        <div className="setup-header">
          <div>
            <p className="setup-eyebrow">Configuração do cronograma</p>
            <h1>Vamos montar seu plano de estudos</h1>
          </div>
          {onCancel && (
            <button className="setup-close" onClick={onCancel}>✕</button>
          )}
        </div>

        <div className="setup-progress">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className={`progress-step ${step >= n ? 'active' : ''} ${step === n ? 'current' : ''}`}>
              <span className="step-num">{n}</span>
              <span className="step-label">
                {n === 1 && 'Disponibilidade'}
                {n === 2 && 'Conhecimento'}
                {n === 3 && 'Prioridades'}
                {n === 4 && 'Preferências'}
              </span>
            </div>
          ))}
        </div>

        <div className="setup-body">

          {step === 1 && (
            <div className="step-content">
              <h2>Quando você pode estudar?</h2>
              <p className="step-desc">
                Marque os dias disponíveis e ajuste a carga horária. Seja realista —
                consistência vale mais que volume.
              </p>

              <div className="dias-grid">
                {DIAS.map(d => (
                  <div key={d.key} className={`dia-row ${diasAtivos[d.key] ? 'ativo' : ''}`}>
                    <label className="dia-toggle">
                      <input
                        type="checkbox"
                        checked={diasAtivos[d.key]}
                        onChange={() => toggleDia(d.key)}
                      />
                      <span className="dia-name">{d.label}</span>
                    </label>
                    {diasAtivos[d.key] && (
                      <div className="horas-controle">
                        <button
                          className="horas-btn"
                          onClick={() => setHoras(d.key, Math.max(1, horasPorDia[d.key] - 1))}
                          disabled={horasPorDia[d.key] <= 1}
                        >−</button>
                        <span className="horas-valor">{horasPorDia[d.key]}h</span>
                        <button
                          className="horas-btn"
                          onClick={() => setHoras(d.key, Math.min(12, horasPorDia[d.key] + 1))}
                          disabled={horasPorDia[d.key] >= 12}
                        >+</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="setup-summary">
                <strong>{totalHoras}h</strong> por semana em <strong>{diasAtivosCount}</strong> dia{diasAtivosCount !== 1 && 's'}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Como está seu conhecimento?</h2>
              <p className="step-desc">
                Para cada matéria, diga seu nível atual. Vamos alocar mais tempo às matérias
                onde você tem mais dificuldade.
              </p>
              <div className="niveis-lista">
                {materiasDisponiveis.map(m => (
                  <div key={m} className="nivel-row">
                    <span className="nivel-materia">{m}</span>
                    <div className="nivel-opcoes">
                      {NIVEIS.map(n => (
                        <button
                          key={n.value}
                          className={`nivel-chip ${niveis[m] === n.value ? 'ativo' : ''}`}
                          style={niveis[m] === n.value ? { background: n.color, borderColor: n.color, color: '#fff' } : {}}
                          onClick={() => setNiveis(prev => ({ ...prev, [m]: n.value }))}
                          title={n.desc}
                        >
                          {n.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Quais matérias são prioridade?</h2>
              <p className="step-desc">
                Escolha até 3 matérias que têm maior peso no seu VesTibular-alvo.
                Receberão 50% a mais de tempo no cronograma.
              </p>
              <div className="prioridades-grid">
                {materiasDisponiveis.map(m => {
                  const ativo = prioridades.includes(m);
                  const bloqueado = !ativo && prioridades.length >= 3;
                  return (
                    <button
                      key={m}
                      className={`prioridade-chip ${ativo ? 'ativo' : ''}`}
                      onClick={() => togglePrioridade(m)}
                      disabled={bloqueado}
                    >
                      {ativo && '⭐ '}{m}
                    </button>
                  );
                })}
              </div>
              <p className="setup-hint">
                {prioridades.length === 0
                  ? 'Nenhuma matéria priorizada — a distribuição será equilibrada.'
                  : `${prioridades.length} de 3 selecionadas`}
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h2>Últimos ajustes</h2>
              <p className="step-desc">
                Defina quanto tempo você consegue focar em uma única sessão de estudos.
              </p>

              <div className="pref-grupo">
                <label className="pref-label">Duração de cada sessão</label>
                <div className="duracao-opcoes">
                  {DURACOES.map(d => (
                    <button
                      key={d.value}
                      className={`duracao-card ${duracaoSessao === d.value ? 'ativo' : ''}`}
                      onClick={() => setDuracaoSessao(d.value)}
                    >
                      <span className="duracao-label">{d.label}</span>
                      <span className="duracao-desc">{d.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pref-grupo">
                <label className="pref-toggle">
                  <input
                    type="checkbox"
                    checked={incluirRedacao}
                    onChange={e => setIncluirRedacao(e.target.checked)}
                  />
                  <div>
                    <span className="pref-toggle-title">Incluir sessões de redação</span>
                    <span className="pref-toggle-desc">Reserva 2+ blocos semanais para treinar dissertação</span>
                  </div>
                </label>

                <label className="pref-toggle">
                  <input
                    type="checkbox"
                    checked={incluirSimulado}
                    onChange={e => setIncluirSimulado(e.target.checked)}
                  />
                  <div>
                    <span className="pref-toggle-title">Incluir simulados semanais</span>
                    <span className="pref-toggle-desc">Adiciona até 2 simulados duplos na semana</span>
                  </div>
                </label>
              </div>

              <div className="resumo-final">
                <h3>Resumo do seu plano</h3>
                <ul>
                  <li><strong>{totalHoras}h</strong> semanais em <strong>{diasAtivosCount}</strong> dias</li>
                  <li>Sessões de <strong>{duracaoSessao} min</strong></li>
                  <li>
                    Foco em: <strong>{focus === 'ambos' ? 'ENEM + UERJ' : focus.toUpperCase()}</strong>
                  </li>
                  {prioridades.length > 0 && (
                    <li>Prioridades: <strong>{prioridades.join(', ')}</strong></li>
                  )}
                </ul>
              </div>
            </div>
          )}

        </div>

        <div className="setup-footer">
          <button
            className="btn-secundario"
            onClick={() => step === 1 ? onCancel && onCancel() : setStep(s => s - 1)}
            disabled={step === 1 && !onCancel}
          >
            {step === 1 ? 'Cancelar' : '← Voltar'}
          </button>
          {step < 4 ? (
            <button
              className="btn-primario"
              onClick={() => setStep(s => s + 1)}
              disabled={!canProgress[step]}
            >
              Continuar →
            </button>
          ) : (
            <button className="btn-primario" onClick={confirmar}>
              ✓ Gerar cronograma
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

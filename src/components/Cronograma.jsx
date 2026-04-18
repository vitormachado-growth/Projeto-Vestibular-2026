import { useState, useEffect } from 'react';
import CronogramaSetup from './CronogramaSetup';
import { gerarCronograma } from '../utils/geradorCronograma';
import './Cronograma.css';

const STORAGE_KEY    = 'cronograma_config_v1';
const SCHEDULE_KEY   = 'cronograma_gerado_v1';
const CONCLUIDAS_KEY = 'cronograma_concluidas_v2';

const DIAS_LABEL = {
  segunda: 'Segunda', terca: 'Terça', quarta: 'Quarta',
  quinta: 'Quinta', sexta: 'Sexta', sabado: 'Sábado', domingo: 'Domingo',
};

const DIA_INDEX = { domingo: 0, segunda: 1, terca: 2, quarta: 3, quinta: 4, sexta: 5, sabado: 6 };

const HOJE_KEY = (() => {
  const dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  return dias[new Date().getDay()];
})();

// Retorna 'YYYY-MM-DD' para o dia desta semana
function dateForDay(dayKey) {
  const today = new Date();
  const diff = DIA_INDEX[dayKey] - today.getDay();
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toISOString().split('T')[0];
}

// Chave única por sessão atrelada à data real
function sessionKey(dayKey, index) {
  return `${dateForDay(dayKey)}-${index}`;
}

export default function Cronograma({ focus, onOpenQuestoes, onOpenRedacao }) {
  const [config, setConfig] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [schedule, setSchedule] = useState(() => {
    try {
      const raw = localStorage.getItem(SCHEDULE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [editando, setEditando] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(HOJE_KEY);
  const [concluidas, setConcluidas] = useState(() => {
    try {
      const raw = localStorage.getItem(CONCLUIDAS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(CONCLUIDAS_KEY, JSON.stringify(concluidas));
  }, [concluidas]);

  function handleConfirm(novaConfig) {
    const novoSchedule = gerarCronograma(novaConfig);
    setConfig(novaConfig);
    setSchedule(novoSchedule);
    setEditando(false);
    setConcluidas({});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaConfig));
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(novoSchedule));
  }

  function regenerar() {
    if (!config) return;
    const novo = gerarCronograma(config);
    setSchedule(novo);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(novo));
    setConcluidas({});
  }

  function toggleConcluida(key) {
    setConcluidas(prev => ({ ...prev, [key]: !prev[key] }));
  }

  if (!config || editando) {
    return (
      <CronogramaSetup
        focus={focus}
        onConfirm={handleConfirm}
        onCancel={editando ? () => setEditando(false) : null}
      />
    );
  }

  if (!schedule || schedule.totalSessoes === 0) {
    return (
      <div className="cronograma-container">
        <p>Nenhum cronograma gerado. {schedule?.aviso}</p>
        <button className="btn-primario" onClick={() => setEditando(true)}>
          Configurar
        </button>
      </div>
    );
  }

  const sessoesDoDia = schedule.porDia[diaSelecionado] || [];
  const sessoesHoje  = schedule.porDia[HOJE_KEY] || [];

  const concluidasHoje = sessoesHoje.filter((_, i) => concluidas[sessionKey(HOJE_KEY, i)]).length;
  const progressoHoje  = sessoesHoje.length > 0
    ? Math.round((concluidasHoje / sessoesHoje.length) * 100) : 0;
  const diaHojeCompleto = sessoesHoje.length > 0 && concluidasHoje === sessoesHoje.length;

  // Progresso semanal
  const DIAS_ORDEM = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const totalSemana = DIAS_ORDEM.reduce((s, d) => s + (schedule.porDia[d]?.length || 0), 0);
  const feitasSemana = DIAS_ORDEM.reduce((s, d) =>
    s + (schedule.porDia[d] || []).filter((_, i) => concluidas[sessionKey(d, i)]).length, 0);
  const progressoSemana = totalSemana > 0 ? Math.round((feitasSemana / totalSemana) * 100) : 0;

  return (
    <div className="cronograma-container">
      <div className="cronograma-header">
        <div className="header-info">
          <h2>Seu Cronograma</h2>
          <p>
            {schedule.totalHoras}h semanais · {schedule.totalSessoes} sessões ·{' '}
            {config.focus === 'ambos' ? 'ENEM + UERJ' : config.focus.toUpperCase()}
          </p>
        </div>
        <div className="progress-duo">
          <div className="progress-summary">
            <div className="progress-text">
              <span>Hoje {diaHojeCompleto ? '🎉' : ''}</span>
              <span style={{ color: diaHojeCompleto ? '#16a34a' : 'inherit' }}>
                {concluidasHoje}/{sessoesHoje.length}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressoHoje}%`,
                background: diaHojeCompleto ? '#16a34a' : undefined }} />
            </div>
          </div>
          <div className="progress-summary">
            <div className="progress-text">
              <span>Semana</span>
              <span>{feitasSemana}/{totalSemana}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill secondary" style={{ width: `${progressoSemana}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="cronograma-actions">
        <button className="btn-acao" onClick={regenerar}>
          🎲 Embaralhar
        </button>
        <button className="btn-acao" onClick={() => setEditando(true)}>
          ⚙️ Reconfigurar
        </button>
      </div>

      <div className="dias-tabs">
        {DIAS_ORDEM.map(dia => {
          const sessoes = schedule.porDia[dia] || [];
          const feitas  = sessoes.filter((_, i) => concluidas[sessionKey(dia, i)]).length;
          const completo = sessoes.length > 0 && feitas === sessoes.length;
          const ativo  = diaSelecionado === dia;
          const eHoje  = dia === HOJE_KEY;
          return (
            <button
              key={dia}
              className={`dia-tab ${ativo ? 'ativo' : ''} ${eHoje ? 'hoje' : ''} ${sessoes.length === 0 ? 'vazio' : ''} ${completo ? 'completo' : ''}`}
              onClick={() => setDiaSelecionado(dia)}
            >
              <span className="dia-tab-label">{DIAS_LABEL[dia]}</span>
              <span className="dia-tab-count">
                {sessoes.length > 0
                  ? completo ? '✓ completo' : `${feitas}/${sessoes.length} feitas`
                  : 'descanso'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="schedule-list">
        {sessoesDoDia.length === 0 ? (
          <div className="dia-descanso">
            <span className="descanso-icon">😌</span>
            <h3>Dia de descanso</h3>
            <p>Aproveite para recarregar — consistência exige pausas.</p>
          </div>
        ) : (
          sessoesDoDia.map((sessao, i) => {
            const key  = sessionKey(diaSelecionado, i);
            const done = !!concluidas[key];
            const podeAbrir = sessao.tipo === 'redacao'
              ? !!onOpenRedacao
              : sessao.tipo === 'estudo' && !!onOpenQuestoes;
            const abrir = () => {
              if (sessao.tipo === 'redacao' && onOpenRedacao) onOpenRedacao();
              else if (sessao.tipo === 'estudo' && onOpenQuestoes) onOpenQuestoes(sessao.materia);
            };
            return (
              <div key={key} className={`schedule-card ${done ? 'completed' : 'pending'} ${podeAbrir ? 'clickable' : ''}`}>
                <button
                  className={`card-check ${done ? 'checked' : ''}`}
                  onClick={() => toggleConcluida(key)}
                  aria-label="Marcar como concluída"
                >
                  {done ? '✓' : ''}
                </button>
                <div className="card-content">
                  <div className="card-top">
                    <span className={`subject-tag tipo-${sessao.tipo}`}>
                      {sessao.tipo === 'redacao' ? '✒️ Redação'
                        : sessao.tipo === 'simulado' ? '📝 Simulado'
                        : sessao.materia}
                    </span>
                    <span className="duration-tag">⏱ {sessao.duracao} min</span>
                  </div>
                  <h3 className={done ? 'task-done' : ''}>{sessao.topico}</h3>
                  <div className="card-footer">
                    <span className="horario">🕐 {sessao.horario}</span>
                    {podeAbrir && (
                      <button className="btn-estudar" onClick={abrir}>
                        {sessao.tipo === 'redacao' ? 'Ir à redação' : `Praticar ${sessao.materia} →`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

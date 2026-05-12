import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Perfil.css';

const DOG_API = 'https://dog.ceo/api/breeds/image/random/8';

const ANOS_OPCOES = [
  '1º ano do Ensino Médio',
  '2º ano do Ensino Médio',
  '3º ano do Ensino Médio',
  'Cursinho pré-vestibular',
  'Já concluí o Ensino Médio',
  'Outro',
];

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const FOCO_OPCOES = [
  { value: 'enem',  label: 'ENEM',         tema: 'pink'   },
  { value: 'uerj',  label: 'UERJ',         tema: 'yellow' },
  { value: 'ambos', label: 'ENEM + UERJ',  tema: 'violet' },
];

export default function Perfil({ user, profile, focus, course, onProfileUpdated, onChangeFocus, onChangeCourse }) {
  const [apelido,        setApelido]        = useState(profile?.apelido || '');
  const [nomeCompleto,   setNomeCompleto]   = useState(profile?.nome_completo || '');
  const [dataNascimento, setDataNascimento] = useState(profile?.data_nascimento || '');
  const [anoSerie,       setAnoSerie]       = useState(profile?.ano_serie || '');
  const [escola,         setEscola]         = useState(profile?.escola || '');
  const [cidade,         setCidade]         = useState(profile?.cidade || '');
  const [estado,         setEstado]         = useState(profile?.estado || '');
  const [avatarUrl,      setAvatarUrl]      = useState(profile?.avatar_url || '');

  const [editAvatar, setEditAvatar] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [loadingDogs, setLoadingDogs] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Resetar dirty se profile externo mudar
  useEffect(() => {
    setApelido(profile?.apelido || '');
    setNomeCompleto(profile?.nome_completo || '');
    setDataNascimento(profile?.data_nascimento || '');
    setAnoSerie(profile?.ano_serie || '');
    setEscola(profile?.escola || '');
    setCidade(profile?.cidade || '');
    setEstado(profile?.estado || '');
    setAvatarUrl(profile?.avatar_url || '');
  }, [profile]);

  const fetchDogs = async () => {
    setLoadingDogs(true);
    try {
      const res = await fetch(DOG_API);
      const json = await res.json();
      setDogs(json.message || []);
    } catch {
      setDogs([]);
    } finally {
      setLoadingDogs(false);
    }
  };

  const openAvatarPicker = () => {
    setEditAvatar(true);
    if (dogs.length === 0) fetchDogs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!apelido.trim() || !nomeCompleto.trim() || !anoSerie) {
      setError('Preencha os campos obrigatórios.');
      return;
    }
    if (!avatarUrl) {
      setError('Escolha uma foto de perfil.');
      return;
    }

    setSaving(true);
    const payload = {
      id: user.id,
      apelido: apelido.trim(),
      nome_completo: nomeCompleto.trim(),
      data_nascimento: dataNascimento || null,
      ano_serie: anoSerie,
      escola: escola.trim() || null,
      cidade: cidade.trim() || null,
      estado: estado || null,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    };

    const { data, error: dbError } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    setSaving(false);

    if (dbError) {
      setError('Não foi possível salvar: ' + dbError.message);
      return;
    }

    setSuccess(true);
    setEditAvatar(false);
    if (onProfileUpdated) onProfileUpdated(data);
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="perfil-wrap">
      <header className="perfil-header">
        <div>
          <span className="perfil-tag">
            <span className="perfil-tag-dot" />
            Seu perfil
          </span>
          <h1>Editar perfil</h1>
          <p>Atualize seus dados e personalize sua experiência no VesTibular.</p>
        </div>
      </header>

      {error && (
        <div className="perfil-alert error" role="alert">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="perfil-alert success" role="status">
          <span>✓</span>
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}

      <form className="perfil-form" onSubmit={handleSubmit} noValidate>

        {/* ── Avatar + identidade ─────────────────────────────────── */}
        <section className="perfil-section">
          <div className="perfil-section-head">
            <h2>Identidade</h2>
            <p>Como você aparece no app.</p>
          </div>

          <div className="perfil-identity">
            <div className="perfil-avatar-current">
              {avatarUrl ? (
                <img src={avatarUrl} alt={apelido || 'Avatar'} />
              ) : (
                <div className="perfil-avatar-fallback">
                  {(apelido || nomeCompleto || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <button
                type="button"
                className="perfil-avatar-edit"
                onClick={openAvatarPicker}
                aria-label="Trocar foto"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>

            <div className="perfil-identity-fields">
              <div className="perfil-field">
                <label htmlFor="apelido">
                  Apelido <span className="req">*</span>
                </label>
                <input
                  id="apelido"
                  type="text"
                  placeholder="Como quer ser chamado"
                  value={apelido}
                  onChange={(e) => setApelido(e.target.value)}
                  maxLength={30}
                  required
                />
              </div>

              <div className="perfil-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="perfil-input-readonly"
                />
                <span className="perfil-field-note">Não pode ser alterado.</span>
              </div>
            </div>
          </div>

          {editAvatar && (
            <div className="perfil-avatar-picker">
              <div className="perfil-avatar-picker-head">
                <strong>Escolha um novo avatar 🐶</strong>
                <div className="perfil-avatar-picker-actions">
                  <button
                    type="button"
                    className="perfil-btn-ghost"
                    onClick={fetchDogs}
                    disabled={loadingDogs}
                  >
                    {loadingDogs ? 'Carregando…' : 'Ver outros'}
                  </button>
                  <button
                    type="button"
                    className="perfil-btn-ghost"
                    onClick={() => setEditAvatar(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
              <div className="perfil-avatar-grid">
                {loadingDogs && dogs.length === 0
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="perfil-avatar-item skeleton" />
                    ))
                  : dogs.map((url) => (
                      <button
                        key={url}
                        type="button"
                        className={`perfil-avatar-item ${avatarUrl === url ? 'selected' : ''}`}
                        onClick={() => setAvatarUrl(url)}
                        aria-label="Selecionar foto"
                      >
                        <img src={url} alt="" loading="lazy" />
                        {avatarUrl === url && <span className="perfil-avatar-check">✓</span>}
                      </button>
                    ))
                }
              </div>
            </div>
          )}
        </section>

        {/* ── Foco de estudos ─────────────────────────────────── */}
        <section className="perfil-section">
          <div className="perfil-section-head">
            <h2>Foco de estudos</h2>
            <p>Você pode trocar a qualquer momento — o conteúdo se adapta.</p>
          </div>

          <div className="perfil-foco-row">
            {FOCO_OPCOES.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`perfil-foco-chip tema-${f.tema} ${focus === f.value ? 'active' : ''}`}
                onClick={() => onChangeFocus && onChangeFocus(f.value)}
              >
                {f.label}
                {focus === f.value && <span className="perfil-foco-check">✓</span>}
              </button>
            ))}
          </div>

          {(focus === 'uerj' || focus === 'ambos') && (
            <div className="perfil-course-row">
              <span className="perfil-course-label">Curso UERJ:</span>
              <span className="perfil-course-pill">{course || 'Não definido'}</span>
              {onChangeCourse && (
                <button type="button" className="perfil-btn-ghost" onClick={onChangeCourse}>
                  Trocar curso
                </button>
              )}
            </div>
          )}
        </section>

        {/* ── Dados pessoais ──────────────────────────────────── */}
        <section className="perfil-section">
          <div className="perfil-section-head">
            <h2>Dados pessoais</h2>
            <p>Informações para personalizar seu plano.</p>
          </div>

          <div className="perfil-field">
            <label htmlFor="nome">
              Nome completo <span className="req">*</span>
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </div>

          <div className="perfil-row">
            <div className="perfil-field">
              <label htmlFor="data">Data de nascimento</label>
              <input
                id="data"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="perfil-field">
              <label htmlFor="ano">
                Ano escolar <span className="req">*</span>
              </label>
              <select
                id="ano"
                value={anoSerie}
                onChange={(e) => setAnoSerie(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {ANOS_OPCOES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ── Onde você estuda ────────────────────────────────── */}
        <section className="perfil-section">
          <div className="perfil-section-head">
            <h2>Onde você estuda</h2>
            <p>Opcional — usado em rankings regionais futuros.</p>
          </div>

          <div className="perfil-field">
            <label htmlFor="escola">Escola / Colégio</label>
            <input
              id="escola"
              type="text"
              placeholder="Nome da sua escola (opcional)"
              value={escola}
              onChange={(e) => setEscola(e.target.value)}
            />
          </div>

          <div className="perfil-row">
            <div className="perfil-field" style={{ flex: 2 }}>
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                placeholder="Sua cidade (opcional)"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="perfil-field" style={{ flex: 1 }}>
              <label htmlFor="uf">Estado</label>
              <select
                id="uf"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">UF</option>
                {UFS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ── Ações ───────────────────────────────────────────── */}
        <div className="perfil-actions">
          <p className="perfil-required-note">
            <span className="req">*</span> Campos obrigatórios
          </p>
          <button
            type="submit"
            className="perfil-btn-primary"
            disabled={saving}
          >
            {saving ? (
              <><span className="perfil-spinner" /> Salvando…</>
            ) : (
              'Salvar alterações'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

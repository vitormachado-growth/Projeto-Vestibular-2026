import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './ProfileSetupScreen.css';

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

const ProfileSetupScreen = ({ user, onComplete, onLogout }) => {
  const metaName = user?.user_metadata?.full_name || '';

  const [apelido, setApelido] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState(metaName);
  const [dataNascimento, setDataNascimento] = useState('');
  const [anoSerie, setAnoSerie] = useState('');
  const [escola, setEscola] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!apelido.trim() || !nomeCompleto.trim() || !anoSerie) {
      setError('Preencha os campos obrigatórios.');
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

    onComplete(data);
  };

  return (
    <div className="profile-setup-screen">
      <div className="profile-setup-card">
        <header className="profile-setup-header">
          <div className="profile-logo">
            <span>V</span>es<span>T</span>ibular
          </div>
          <h1>Complete seu perfil</h1>
          <p>Só mais alguns dados pra personalizar sua jornada de estudos.</p>
        </header>

        {error && (
          <div className="profile-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="profile-row">
            <div className="profile-field">
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

            <div className="profile-field">
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
          </div>

          <div className="profile-row">
            <div className="profile-field">
              <label htmlFor="data">Data de nascimento</label>
              <input
                id="data"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="profile-field">
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
                {ANOS_OPCOES.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="escola">Escola / Colégio</label>
            <input
              id="escola"
              type="text"
              placeholder="Nome da sua escola (opcional)"
              value={escola}
              onChange={(e) => setEscola(e.target.value)}
            />
          </div>

          <div className="profile-row">
            <div className="profile-field" style={{ flex: 2 }}>
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                placeholder="Sua cidade (opcional)"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div className="profile-field" style={{ flex: 1 }}>
              <label htmlFor="uf">Estado</label>
              <select
                id="uf"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">UF</option>
                {UFS.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="button"
              className="profile-btn-secondary"
              onClick={onLogout}
              disabled={saving}
            >
              Sair
            </button>
            <button
              type="submit"
              className="profile-btn-primary"
              disabled={saving}
            >
              {saving ? (
                <><span className="profile-spinner" /> Salvando…</>
              ) : (
                'Começar a estudar →'
              )}
            </button>
          </div>

          <p className="profile-required-note">
            <span className="req">*</span> Campos obrigatórios
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;

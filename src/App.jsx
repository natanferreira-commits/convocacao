import { useState } from "react";
import HeroScreen from "./screens/HeroScreen";
import LineupScreen from "./screens/LineupScreen";
import FormScreen from "./screens/FormScreen";
import ValidateScreen from "./screens/ValidateScreen";
import UploadProofScreen from "./screens/UploadProofScreen";
import PendingScreen from "./screens/PendingScreen";
import AdminScreen from "./screens/AdminScreen";
import Footer from "./components/Footer";
import { getAffiliateCode } from "./config/affiliates";
import { saveEntry, updateEntryStatus, updateEntryProof } from "./lib/sheets";
import "./App.css";

const IS_ADMIN = window.location.pathname === "/admin";

const STEPS = {
  HERO: 0,
  LINEUP: 1,
  FORM: 2,
  VALIDATE: 3,
  UPLOAD: 4,
  PENDING: 5,
};

function generateEntryId() {
  return "BP-" +
    Math.random().toString(36).toUpperCase().slice(2, 6) + "-" +
    Math.random().toString(36).toUpperCase().slice(2, 6);
}

function App() {
  const [step, setStep] = useState(STEPS.HERO);
  const [lineup, setLineup] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [houseChosen, setHouseChosen] = useState(null);
  const [entryId, setEntryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [affiliateCode] = useState(() => getAffiliateCode());
  const [referredBy] = useState(() => new URLSearchParams(window.location.search).get("ref"));

  function handleHeroStart() {
    window.gtag?.('event', 'comecou_bolao', { affiliate: affiliateCode });
    setStep(STEPS.LINEUP);
  }

  function handleLineupSubmit(selectedIds) {
    setLineup(selectedIds);
    setStep(STEPS.FORM);
  }

  async function handleFormSubmit(formData) {
    setLoading(true);
    try {
      const id = generateEntryId();
      setEntryId(id);
      setParticipant(formData);
      // Cria a entry no Sheets — fire-and-forget pra não bloquear UX
      saveEntry({
        entryId: id,
        participant: formData,
        lineup,
        affiliateCode,
        referredBy,
      }).catch(err => console.error("saveEntry falhou:", err));
      setStep(STEPS.VALIDATE);
    } finally {
      setLoading(false);
    }
  }

  function handleHouseSelected(houseId) {
    setHouseChosen(houseId);
    if (entryId) {
      updateEntryStatus({
        entryId,
        status: "casa_escolhida",
        extra: { house_chosen: houseId },
      }).catch(err => console.error("updateEntryStatus casa_escolhida falhou:", err));
    }
  }

  function handleValidateNext() {
    if (entryId) {
      updateEntryStatus({
        entryId,
        status: "casa_clicada",
      }).catch(err => console.error("updateEntryStatus casa_clicada falhou:", err));
    }
    setStep(STEPS.UPLOAD);
  }

  function handleUploaded({ url }) {
    updateEntryProof({ entryId, proofUrl: url, houseChosen }).catch(err =>
      console.error("updateEntryProof falhou:", err)
    );
    setStep(STEPS.PENDING);
  }

  if (IS_ADMIN) return <AdminScreen />;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">
            <span className="logo-flag">🇧🇷</span>
            <span className="logo-text">Bolão da <strong>Convocação</strong></span>
          </span>
          {step > STEPS.HERO && step < STEPS.PENDING && (
            <div className="steps-indicator">
              {[1, 2, 3, 4, 5].map(n => (
                <div
                  key={n}
                  className={`step-dot ${step >= n ? "active" : ""} ${step === n ? "current" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading-overlay"><div className="spinner" /></div>}

        {step === STEPS.HERO && (
          <HeroScreen affiliateCode={affiliateCode} onStart={handleHeroStart} />
        )}

        {step === STEPS.LINEUP && (
          <LineupScreen
            onSubmit={handleLineupSubmit}
            onBack={() => setStep(STEPS.HERO)}
          />
        )}

        {step === STEPS.FORM && (
          <FormScreen
            onSubmit={handleFormSubmit}
            onBack={() => setStep(STEPS.LINEUP)}
          />
        )}

        {step === STEPS.VALIDATE && (
          <ValidateScreen
            participant={participant}
            affiliateCode={affiliateCode}
            entryId={entryId}
            onHouseSelected={handleHouseSelected}
            onNext={handleValidateNext}
          />
        )}

        {step === STEPS.UPLOAD && (
          <UploadProofScreen
            entryId={entryId}
            affiliateCode={affiliateCode}
            onUploaded={handleUploaded}
          />
        )}

        {step === STEPS.PENDING && (
          <PendingScreen
            participant={participant}
            affiliateCode={affiliateCode}
            entryId={entryId}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

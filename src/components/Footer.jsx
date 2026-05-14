export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-age">
          <span className="footer-age-badge">+18</span>
          <span className="footer-age-text">Jogue com responsabilidade</span>
        </div>

        <p className="footer-responsible">
          Aposte com responsabilidade. As apostas esportivas são uma forma de entretenimento —
          não uma fonte de renda. Se sentir que o jogo está deixando de ser divertido, procure ajuda:{" "}
          <strong>0800 722 4000</strong> (CVV — gratuito e sigiloso). Jogue de forma consciente
          e dentro dos seus limites.
        </p>

        <p className="footer-legal">
          Esta campanha é um concurso cultural promovido por <strong>Dupla Aposta</strong>, nos
          termos do art. 3º da Lei nº 5.768/1971, em que o vencedor é escolhido por critério de
          julgamento (criatividade e originalidade da resposta), sem qualquer elemento de sorte ou
          aleatoriedade. Não constitui sorteio, loteria ou promoção comercial. O organizador
          reserva-se o direito de desclassificar participações que não atendam aos critérios
          estabelecidos.
        </p>

        <p className="footer-copy">
          © 2026 Dupla Aposta. Todos os direitos reservados.
          <a href="/admin" className="footer-admin-link" aria-label="Acesso administrativo">·</a>
        </p>

      </div>
    </footer>
  );
}

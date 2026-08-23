import type { Metadata } from "next";
import LegalPage from "../legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso | Wakilon Gestor",
  description: "Consulte as condições de acesso, navegação, contratação e uso dos conteúdos e serviços da Wakilon Gestor.",
  alternates: { canonical: "https://wakilongestor.com.br/termos/" },
};

export default function TermsPage() {
  return <LegalPage kicker="CONDIÇÕES DE ACESSO" title="Termos de Uso" intro="Ao navegar neste site, você concorda com as condições abaixo. Leia com atenção antes de utilizar conteúdos, formulários ou canais de contato." sections={[
    { title: "Finalidade do site", content: <><p>O site apresenta informações institucionais, métodos, serviços e canais de contato da Wakilon Gestor. Seu conteúdo tem caráter informativo e comercial, sem constituir proposta definitiva, garantia de desempenho ou aconselhamento jurídico.</p></> },
    { title: "Aceite e capacidade", content: <><p>Ao utilizar o site, o usuário declara ter capacidade legal para aceitar estes termos. Caso não concorde com alguma condição, deve interromper a navegação e não enviar informações pelos formulários.</p></> },
    { title: "Uso permitido", content: <><p>O usuário deve utilizar o site de modo lícito, sem tentar invadir, testar vulnerabilidades, sobrecarregar recursos, inserir código malicioso, coletar dados de terceiros ou praticar atos que prejudiquem a disponibilidade e a segurança.</p></> },
    { title: "Informações e contratação", content: <><p>Descrições, preços e entregas exibidos podem ser atualizados e dependem de diagnóstico, escopo, prazo, complexidade e capacidade operacional. A contratação somente se confirma por instrumento ou proposta aceita pelas partes.</p><p>A verba de anúncios, licenças, hospedagem, domínio e serviços de terceiros não está incluída nos planos, salvo indicação expressa em proposta.</p></> },
    { title: "Resultados e publicidade jurídica", content: <><p>Estratégias de marketing não garantem contratos, faturamento ou posição em plataformas. Resultados dependem de fatores externos e internos, incluindo mercado, investimento, oferta, atendimento, concorrência e qualidade das informações fornecidas.</p><p>Projetos destinados a advogados são estruturados com caráter informativo e responsável. O cliente participa da aprovação das peças e permanece responsável pelas informações profissionais, autorizações e adequação de sua atuação às normas aplicáveis.</p></> },
    { title: "Propriedade intelectual", content: <><p>Marca, textos, layouts, códigos, gráficos, métodos e materiais deste site pertencem à Wakilon Gestor ou são utilizados com autorização. A reprodução, distribuição, adaptação ou uso comercial depende de autorização prévia, salvo hipóteses permitidas por lei.</p></> },
    { title: "Links e serviços de terceiros", content: <><p>O site pode direcionar a plataformas externas, como Instagram, YouTube, WhatsApp, Google e fornecedores de pagamento ou formulário. Cada serviço possui seus próprios termos e práticas de privacidade, sobre os quais a Wakilon Gestor não exerce controle integral.</p></> },
    { title: "Disponibilidade e limitações", content: <><p>Buscamos manter o site seguro e disponível, mas podem ocorrer interrupções, manutenção, incompatibilidades ou falhas de terceiros. Na extensão permitida por lei, não respondemos por danos decorrentes de uso indevido, indisponibilidade temporária ou decisões tomadas exclusivamente com base em conteúdo geral do site.</p></> },
    { title: "Privacidade", content: <><p>O tratamento de dados pessoais relacionado ao site é descrito na <a href="/privacidade">Política de Privacidade</a>, que integra estes termos.</p></> },
    { title: "Alterações e legislação", content: <><p>Estes termos podem ser alterados para refletir mudanças no site, nos serviços ou na legislação. A versão publicada com data mais recente substituirá as anteriores.</p><p>Aplicam-se as leis brasileiras. Eventuais controvérsias deverão ser inicialmente tratadas por contato direto, buscando solução de boa-fé, sem afastar direitos legais de consumidores quando aplicáveis.</p></> },
  ]} />;
}

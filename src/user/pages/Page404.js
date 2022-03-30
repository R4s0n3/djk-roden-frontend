import './Page404.css';
import illu404 from '../../shared/assets/SVG/illustration_404.svg';
import Button from '../../shared/components/FormElements/Button';
const Page404 = () => {
    return (
        <div className="page-404">
            <h2>Sorry, Seite nicht gefunden!</h2>
            <p>Leider konnten wir die von Ihnen gesuchte Seite nicht finden. Vielleicht haben Sie sich bei der URL vertippt? Überprüfen Sie bitte Ihre Rechtschreibung.</p>
            <img src={illu404} alt="Error 404" />
            <Button to="/">Startseite</Button>
        </div>
    )
}

export default Page404;
import logo from '../../../logo/defaultlogo.jpg';
import logo2 from '../../../logo/jo.jpg';
import {Button} from "primereact/button";
import {Link} from 'react-router-dom'

export default function FirstBlock(){

    return (
        <div className="firstBlock">
            <div className="container-desc-first-block">
                <section>
                    <span className="block text-6xl font-bold mb-1">Billetterie</span>
                    <div className="text-6xl text-primary font-bold mb-3">PARIS 2024</div>
                    <p className="mt-0 mb-4 text-700 line-height-3">Assistez aux événements passionnants des Jeux Olympiques en direct !<br /> Réservez vos billets dès maintenant.</p>
                    <Link to='/register'>
                        <Button label="S'inscrire" type="button" className=" mr-3 p-button-outlined"/>
                    </Link>
                    <Link to='/login'>
                        <Button label="Se Connecter" type="button" className="p-button-raised"/>
                    </Link>
                </section>

            </div>
            <div className="container-img-first-block">
                <img src={logo2} alt="logo-jo" className=""
                     style={{clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)'}}/>
            </div>
        </div>
    )

}
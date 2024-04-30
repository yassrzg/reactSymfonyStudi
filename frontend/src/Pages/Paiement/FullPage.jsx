import Paiement from '../../Components/Paiement/Paiement';
import Step from './Steps';
export default function FullPage(){

    return (
        <div>
            <div>
                <Step />
            </div>
            <div>
                <Paiement />
            </div>
        </div>
    );
}
import EventFormPurchase from './EventFormPurchase';
import Step from './Step';

export default function FullPage() {
    return (
        <div className="container">
            <Step/>
            <EventFormPurchase />
        </div>
    );
}
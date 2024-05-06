import EventDetails from './EventDetails';
import Step from './Step';
import SameEventCategories from "./SameEventCategories";

export default function () {
    return (
        <div className="container">
            <Step />
            <div className='container-fullPage-Details'>
                <EventDetails />
                <SameEventCategories/>
            </div>
        </div>
    );
}
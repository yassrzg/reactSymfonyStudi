import GetAllEvent from "../../Components/GetAllEvent/GetAllEvent";
import './Home.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export default function Home() {

    return(
        <div id="homePage">
            Home page
            <GetAllEvent classeName="p-10"/>

        </div>
    )
}
import GetAllEvent from "./GetAllEvent/GetAllEvent";
import FirstBlock from './component/FirstBlock';

import './Home.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export default function Home() {

    return(
        <div className="homePage">
            <FirstBlock/>
            <GetAllEvent classeName="p-10"/>

        </div>
    )
}
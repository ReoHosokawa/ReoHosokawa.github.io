import { Signboard } from './signboard';
import "./scss/index.scss";



const appInit = () => {
    const signboard = new Signboard();

    signboard.AddEvent();
    signboard.LoadText();
}


window.onload = appInit;

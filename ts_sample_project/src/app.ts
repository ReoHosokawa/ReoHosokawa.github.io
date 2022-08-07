import Linq from 'linq';
import { Item } from './item';
import YuzuUser from './json/yuzu_user.json';
import "./scss/index.scss";

const appInit = () => {
    const elem = document.getElementById('output');
    const aBook = new Item('はじめてのTypeScript', 2980);
    aBook.say(elem);

    const yuzuUser = YuzuUser;
    const data = Linq.from(yuzuUser).firstOrDefault(data => data.id === 'hosokawa');
    console.log(data);
}

window.onload = appInit;

/*const user1 = yuzuUser.filter((data) => {
    if (data.id === 'hosokawa') {
        return true;
    }
});
console.log(user1);*/
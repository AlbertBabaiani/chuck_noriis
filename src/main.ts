import './style.scss'
import Main from './assets/Functionality';
import Show from './assets/Visibility';


const init = async () => {
  Show.instance.load();
  await Main.instance.generate_categories();
  Show.instance.show_categories(Main.instance.get_categories);
}

document.addEventListener('DOMContentLoaded', init);


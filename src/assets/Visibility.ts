import Main from "./Functionality";
import { Response_error } from "./Functionality";
import { Response } from "./Functionality";

export abstract class Show_i{
    abstract load(): void;

    protected abstract clear(): void;

    abstract categories_constructor(categories: string[], selected: boolean): void
    abstract show_categories(response: string[] | Response_error): void;

    abstract render(response: Response | Response_error): void;

    protected readonly my_link = `
        <i class="fa-brands fa-github ms-2"></i>
        Albert Babayan
        `

    protected app:HTMLDivElement = document.getElementById('app') as HTMLDivElement;
    protected header: HTMLElement = document.createElement('header');
    protected main: HTMLElement = document.createElement('main');
    protected categories_container: HTMLDivElement = document.createElement('div');
    protected content: HTMLDivElement = document.createElement('div');
    protected clear_all_btn: HTMLButtonElement = document.createElement('button');

    protected fitst_time: boolean = true;
}

export default class Show extends Show_i{
    static instance: Show = new Show();

    load(): void { // almost good

        //  HEADER

        // const img = document.createElement('img')
        // img.src = 'src/images/icon.png';
        // img.title = 'Chuck Himself'
        // img.alt = 'Chuck Himself'
        // img.classList.add('chuck-img')

        const h1 = document.createElement('h1')
        h1.classList.add('title', 'display-3', 'mb-2')
        h1.textContent = 'Chuck Norris Facts'


        const p = document.createElement('p')
        p.classList.add('author')
        p.textContent = 'Made by'

        const a = document.createElement('a')
        a.target = "_blank"
        a.href = "https://github.com/AlbertBabaiani"
        a.title = "GitHub"
        a.innerHTML = this.my_link

        p.append(a, "| 30.11.2023");

        // this.header.append(img, h1, p, small);
        this.header.append(h1, p);


        //  END HEADER



        // MAIN

        const generate_btn_div = document.createElement('div')
        generate_btn_div.classList.add('generate-btn', 'mt-3', 'mb-4')

        const generate_btn = document.createElement('button')
        generate_btn.type = 'button'
        generate_btn.id = 'generate'
        generate_btn.textContent = 'Generate'

        generate_btn.addEventListener('click', async function(){
            generate_btn_div.classList.add('show-loading')
            generate_btn.style.color = '#282a36'
            this.blur()
            Show.instance.render(await Main.instance.generate())
            generate_btn_div.classList.remove('show-loading')
            generate_btn.style.color = '#fefaff'
            
        })

        generate_btn_div.append(generate_btn)

        this.clear_all_btn.type = 'button'
        this.clear_all_btn.textContent = 'Unselect All'
        this.clear_all_btn.id = 'clear_all_button'
        this.clear_all_btn.classList.add('clear_all_button')
        this.clear_all_btn.disabled = true
        
        this.clear_all_btn.addEventListener('click', function (){
            Main.instance.removeAll();
            this.disabled = true
        })


        this.content.classList.add('content')

        const div = document.createElement('div')
        const p_title = document.createElement('p')
        p_title.textContent = "Categories"
        div.classList.add('category-title', 'mb-3')
        p_title.classList.add('fs-2')
        div.append(p_title, this.clear_all_btn)
        
        this.main.append(generate_btn_div, div, this.categories_container)


        // END MAIN




        this.app.append(this.header, this.main)
    }

    override clear(): void { // good
        this.content.innerHTML = ''
    }


    override categories_constructor(categories: string[], selected: boolean = false): void{ // good
        let timer = 0.0

        const fragment = document.createDocumentFragment();

        categories.forEach( (category: string) =>{
            const label: HTMLLabelElement = document.createElement('label')
            label.className = 'category-label';
            label.textContent = category
            label.setAttribute('for', category)

            if(this.fitst_time){
                label.style.setProperty('--delay', timer.toString() + 's')
                timer += 0.05;
            }
            else{
                label.style.setProperty('--delay','0s')
            }

            if(selected){
                label.classList.add('selected')
            }


            const btn = document.createElement('input');
            btn.type = 'checkbox';
            btn.id = category
            btn.name = 'categories'


            btn.checked = selected ? true: false;

            btn.addEventListener('click', function(){
                if(this.checked){
                    label.classList.add('selected')
                    Main.instance.add_category = category
                }
                else{
                    label.classList.remove('selected')
                    Main.instance.remove_category = category
                }

                if(Main.instance.get_selected_categories.length === 0){
                    Show.instance.clear_all_btn.disabled = true;
                    console.log(Show.instance.clear_all_btn.disabled, Main.instance.get_selected_categories.length)
                }
                else{
                    Show.instance.clear_all_btn.disabled = false;
                    console.log(Show.instance.clear_all_btn.disabled, Main.instance.get_selected_categories.length)
                }
            })

            label.append(btn)
            fragment.append(label);
        })

        this.categories_container.append(fragment)
    }


    override show_categories(response: string[] | Response_error, selected_categories?: string[]): void { // almost good
        this.categories_container?.classList.add('categories-container', 'mb-3');

        if ('error' in response) {
            console.log('Error:', response); ////////////////////////////////
        }
        
        else {
            this.categories_container.innerHTML = ''

            const non_selected: string[] = selected_categories ? response.filter( (category: string) => !selected_categories.includes(category) ) : response

            if(selected_categories){
                this.categories_constructor(selected_categories, true)
            }

            this.categories_constructor(non_selected)
            this.fitst_time = false
        }

        
    }


    override render(response: Response | Response_error): void { // almost good
        this.clear()
        
        if ('error' in response) {
            console.log('Error:', response);/////////////////////////////////////////////////
        }
        
        else {
            this.content.remove()
            this.main.append(this.content)
            const p = document.createElement('p')
            p.textContent = response.value.toString()
            
            this.content.append(p)
        }
    }
}
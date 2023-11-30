import Show from "./Visibility";

export interface Response{
    categories: string[];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: number;
}

export interface Response_error{
    error: string;
    message: string;
    icon_url: string;
    path: string;
    status: number;
    timestamp: string;
}

export abstract class Main_a{
    abstract generate(): Promise<Response | Response_error>;
    abstract generate_by_category(): string;
    abstract generate_categories(): Promise<string[] | Response_error>;
    abstract reorganise(): void;


    protected categories: string[] = [];
    abstract get get_categories(): string[];


    protected selected_categories: string[] = [];
    abstract get get_selected_categories(): string[];

    abstract set add_category(new_category: string);
    abstract set remove_category(new_category: string);
    abstract removeAll(): void;



    protected readonly api_random: string = 'https://api.chucknorris.io/jokes/random';
    protected readonly api_categoris: string = 'https://api.chucknorris.io/jokes/categories';
    protected readonly api_custom_category: string = 'https://api.chucknorris.io/jokes/random?category=';

    protected async fetching<T>(url: string): Promise<T>{
        try{
            const response = await fetch(url);

            if (!response.ok) {
                const errorData: T = await response.json();
                return errorData;
            }

            const data: T  = await response.json();
            
            return data
        }
        catch(error){
            return error as T;
        }
    }
}

export default class Main extends Main_a{
    static instance: Main = new Main();

    async generate(): Promise<Response | Response_error> {
        if(this.selected_categories.length !== 0){
            const response: Response | Response_error = await this.fetching<Response | Response_error>(this.generate_by_category());
            return response
        }

        const response: Response | Response_error = await this.fetching<Response | Response_error>(this.api_random);
        return response
    }


    async generate_categories(): Promise<string[] | Response_error> { // good
        const response: string[] | Response_error = await this.fetching<string[] | Response_error>(this.api_categoris);

        if (!('error' in response)) {
            this.categories = response
            return this.categories
        }
        return response
    }

    override get get_categories(): string[] { // good
        return this.categories;
    }

    override get get_selected_categories(): string[] { // good
        return this.selected_categories
    }

    override set add_category(new_category: string){ // good
        this.selected_categories?.push(new_category)
        this.reorganise()
    }

    override set remove_category(new_category: string){ //good
        this.selected_categories = this.selected_categories?.filter( (category: string) => category !== new_category )
        this.reorganise()
    }

    override reorganise(): void { //good
        this.selected_categories.sort()
        Show.instance.show_categories(this.categories, this.selected_categories)
    }

    override removeAll(): void {
        this.selected_categories = [];
        Show.instance.show_categories(this.categories)
    }

    override generate_by_category(): string {
        const len = this.selected_categories.length;
        const index = Math.floor(Math.random() * len)
        
        return this.api_custom_category + this.selected_categories[index]
    }


}
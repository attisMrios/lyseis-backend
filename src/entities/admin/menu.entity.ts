import { Validators } from "../../decorators";

export default class MenuEntity {

    @Validators({AllowNull: false})
    public id: number;

    public parent_id: number;
    public order: number;

    @Validators({AllowNull: false, StringLength: 1000})
    public title: string;

    @Validators({AllowNull: false, StringLength: 1000})
    public url: string;

    @Validators({AllowNull: false, StringLength: 50})
    public icon: string;
    
    constructor(id: number, parent_id: number, order: number, title: string, url: string, icon: string) {
        this.id = id;
        this.parent_id = parent_id
        this.order = order
        this.title = title;
        this.url = url;
        this.icon = icon;
        
    }
}
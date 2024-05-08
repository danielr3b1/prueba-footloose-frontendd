import { Item } from "./item.interface";

export interface Header {
    id: number;
    name: string;
    isSelect?: boolean;
    childList?: Item[]
}

export interface ClientRowTable {
    key: number;
    image: any;
    name: string;
    email: string;
    document: string;
    status: string;
}


export interface ComponentRowTable {
    key: number;
    image: any;
    name: string;
    option: null
}


export interface StockRowTable {
    key: number;
    image: any;
    name: string;
    option: null
}


export interface StockComponentRowTable {
    key: string;
    stock: number;
    value: number;
    dueDate: Date;
    status: boolean;
    option: null
}


export interface ColumnTable {
    key: string;
    label: string
}

export interface ResponsePaginatedData {
    columns: ColumnTable[];
    rows: ClientRowTable[] | ComponentRowTable[] | StockRowTable[] | StockComponentRowTable[];
    count: number;
}

export interface ClientRowTable {
    key: number;
    image: any;
    name: string;
    email: string;
    document: string;
    status: string;

}


export interface ColumnTable {
    key: string;
    label: string
}

export interface ResponsePaginatedData {
    columns: ColumnTable[];
    rows: ClientRowTable[];
    count: number;
}
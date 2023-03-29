export interface IAuth {
    id?: number,
    user: string,
    pass?: string,
    prov: number,
    admin_id: number
}
export interface IUser {
    id?: number,
    name: string,
    lastname: string
    email: string,
    user: string,
    phone: string,
    admin: boolean,
    userName?: string
}
export interface IUserPermission {
    id?: number,
    id_user: number,
    id_permission: number
}

export interface IPermission {
    id?: number,
    module_name: string
}

export interface IActivity {
    id?: number,
    date?: Date,
    user_id: number,
    activity_description: string
}

export interface IBankStatements {
    id?: number,
    date: Date,
    receipt_number: number,
    description: string,
    concept: string,
    observations: string,
    amount: number,
    closed: boolean,
    reconciled: boolean,
    movement_type_id: number | any,
    book_id: number | undefined,
    user_id: number | undefined,
    createdAt?: Date,
    updatedAt?: Date,
    sum_amounts?: number,
    last_date?: Date
}

export interface IBookBank {
    id?: number,
    date: Date,
    receipt_number: number,
    debit: number,
    credit: number,
    local_tax: number,
    incomes_tax: number,
    system_pending_amount: number,
    payment_order: number,
    description: string,
    observations: string,
    canceled: boolean,
    reconciled: boolean,
    closed: boolean,
    receipt_type_id: number,
    canceled_id: number,
    type_id: number,
    dossier_id: number,
    user_id: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IMovementsType {
    id?: number,
    name: string,
    description: string,
    order: number,
    book_order: number
}

export interface IDossiers {
    id?: number,
    year: number,
    number: number,
    gross_amount: number,
    local_tax: number,
    incomes_tax: number,
    net_amount: number,
    provider_id: number,
    state_id: number,
    payment_id: number,
    user_id: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IDossiersDetails {
    id?: number,
    ad: number,
    invoice_number: string,
    invoice_amount: number,
    month_period: number,
    year_period: number,
    dossier_id: number,
    beneficiary_id: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IProviders {
    id?: number,
    document_number: number,
    provider_number: number,
    provider_name: string,
    email: string,
    phone: string,
    provider_type_id: number,
    observations: string,
    city: string,
    cbu: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IReceiptTypes {
    id?: number,
    type: string,
    order: number
}

export interface IDossierState {
    id?: number,
    state: string
}

export interface IDossiersPayments {
    id?: number,
    name: string
}

export interface IBeneficiaries {
    id?: number,
    name: string,
    document_number: number
}

export interface IProviderType {
    id?: number,
    type: string
}

export interface IMonthlyBalance {
    id?: number,
    month: number,
    year: number,
    balance: number,
    type_id: number
}

export interface IBalanceTypes {
    id?: number,
    type: string
}

export interface IStockDocuments {
    id?: number,
    number: number,
    type_id: number
}

export interface IStockType {
    id?: number,
    type: string
}

export interface IPreferences {
    id?: number,
    description: string,
    value: string
}
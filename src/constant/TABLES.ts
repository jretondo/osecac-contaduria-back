enum AdminCol {
    id = 'id',
    name = 'name',
    lastname = 'lastname',
    email = 'email',
    user = 'user',
    phone = 'phone'
}

enum AuthAdmCol {
    id = 'id',
    user = 'user',
    pass = 'pass',
    prov = 'prov',
    admin_id = "admin_id"
}

enum UserPermissionCol {
    id = "id",
    id_user = "id_user",
    id_permission = "id_permission"
}

enum Permissions {
    id = "id",
    module_name = "module_name"
}

enum Activity {
    id = "id",
    date = "date",
    user_id = "user_id",
    activity_description = "activity_description"
}

enum BankStatement {
    id = "id",
    created_time = "created_time",
    last_updated = "last_updated",
    date = "date",
    receipt_number = "receipt_number",
    description = "description",
    concept = "concept",
    observations = "observations",
    amount = "amount",
    reconciled = "reconciled",
    closed = "closed",
    movement_type_id = "movement_type_id",
    book_id = "book_id",
    user_id = "user_id"
}

enum MovementsType {
    id = "id",
    name = "name",
    description = "description",
    order = "order",
    book_order = "book_order"
}

enum BookBank {
    id = "id",
    date = "date",
    receipt_number = "receipt_number",
    debit = "debit",
    credit = "credit",
    local_tax = "local_tax",
    incomes_tax = "incomes_tax",
    system_pending_amount = "system_pending_amount",
    payment_order = "payment_order",
    description = "description",
    observations = "observations",
    canceled = "canceled",
    reconciled = "reconciled",
    closed = "closed",
    receipt_type_id = "receipt_type_id",
    canceled_id = "canceled_id",
    type_id = "type_id",
    dossier_id = "dossier_id",
    user_id = "user_id",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

enum Dossiers {
    id = "id",
    year = "year",
    number = "number",
    gross_amount = "gross_amount",
    local_tax = "local_tax",
    incomes_tax = "incomes_tax",
    net_amount = "net_amount",
    provider_id = "provider_id",
    state_id = "state_id",
    payment_id = "payment_id",
    user_id = "user_id",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

enum DossiersDetails {
    id = "id",
    ad = "ad",
    invoice_number = "invoice_number",
    invoice_amount = "invoice_amount",
    month_period = "month_period",
    year_period = "year_period",
    dossier_id = "dossier_id",
    beneficiary_id = "beneficiary_id",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

enum Providers {
    id = "id",
    document_number = "document_number",
    provider_number = "provider_number",
    provider_name = "provider_name",
    email = "email",
    phone = "phone",
    provider_type_id = "provider_type_id",
    observations = "observations",
    city = "city",
    cbu = "cbu",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

enum ReceiptTypes {
    id = "id",
    type = "type",
    order = "order"
}

enum DossierState {
    id = "id",
    state = "state"
}

enum DossiersPayments {
    id = "id",
    name = "name"
}

enum Beneficiaries {
    id = "id",
    name = "name",
    document_number = "document_number"
}

enum ProviderType {
    id = "id",
    type = "type"
}

enum MonthlyBalance {
    id = "id",
    montH = "month",
    year = "year",
    balance = "balance",
    type_id = "type_id"
}

enum BalanceTypes {
    id = "id",
    type = "type"
}

enum StockDocuments {
    number = "number",
    type_id = "type_id"
}

enum StockType {
    id = "id",
    type = "type"
}

enum Preferences {
    id = "id",
    description = "description",
    value = "value"
}

export enum EPermissions {
    userAdmin = 1,
    bankStatements,
    bookBank
}

export enum Tables {
    ADMIN = "admins",
    AUTH_ADMIN = "auth_admin",
    USER_PERMISSIONS = "admin_permissions",
    PERMISSIONS = "permissions",
    ACTIVITY = "activities",
    BANK_STATEMENTS = "bank_statements",
    MOVEMENTS_TYPE = "movements_type",
    BOOK_BANK = "book_bank",
    DOSSIERS = "dossiers",
    DOSSIERS_DETAILS = "dossiers_details",
    PROVIDERS = "providers",
    RECEIPTS_TYPES = "receipt_types",
    DOSSIER_STATE = "dossier_state",
    DOSSIERS_PAYMENTS = "dossiers_payments",
    BENEFICIARIES = "beneficiaries",
    PROVIDER_TYPE = "provider_type",
    MONTHLY_BALANCE = "monthly_balance",
    BALANCE_TYPES = "balance_types",
    STOCK_DOCUMENTS = "stock_documents",
    STOCK_TYPE = "stock_type",
    PREFERENCES = "preferences"
}

export enum Restrictions {
    CASCADE = "CASCADE",
    SET_NULL = "SET NULL",
    NO_ACTION = "NO ACTION",
    RESTRICT = "RESTRICT"
}

export const Columns = {
    admin: AdminCol,
    authAdmin: AuthAdmCol,
    userPermissions: UserPermissionCol,
    permissions: Permissions,
    activity: Activity,
    bankStatements: BankStatement,
    movementsType: MovementsType,
    bookBank: BookBank,
    dossiers: Dossiers,
    dossiersDetails: DossiersDetails,
    providers: Providers,
    receiptTypes: ReceiptTypes,
    dossierState: DossierState,
    dossiersPayments: DossiersPayments,
    beneficiaries: Beneficiaries,
    providerType: ProviderType,
    monthlyBalance: MonthlyBalance,
    balanceTypes: BalanceTypes,
    stockDocuments: StockDocuments,
    stockType: StockType,
    preferences: Preferences
}
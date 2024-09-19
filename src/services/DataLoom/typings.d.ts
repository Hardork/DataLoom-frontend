declare namespace API {
  type AddChardDataRecordRequest = {
    dataId?: string;
    data?: Record<string, any>;
  };

  type AddDashboardChartRequestDTO = {
    dashboardId: string;
    chartName: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
  };

  type AddDashboardRequestDTO = {
    pid: string;
    name: string;
    datasourceId: string;
    snapshot?: string;
  };

  type AddDatasourceDirRequest = {
    name: string;
    type: string;
    pid: string;
    wight?: number;
  };

  type AddUserAskSqlHistoryRequest = {
    dataId?: string;
  };

  type AddUserChatHistory = {
    modelId?: string;
  };

  type AiChatRequest = {
    text?: string;
    assistantId?: string;
  };

  type AiRole = {
    id?: string;
    assistantName?: string;
    userId?: string;
    type?: string;
    historyTalk?: number;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type AiRoleAddRequest = {
    assistantName?: string;
    type?: string;
    historyTalk?: boolean;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
  };

  type AiRoleQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    assistantName?: string;
    type?: string;
    historyTalk?: number;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
    selectKey?: number;
  };

  type AiRoleUpdateRequest = {
    id?: string;
    assistantName?: string;
    type?: string;
    historyTalk?: number;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
  };

  type AiTempChatRequest = {
    assistantName?: string;
    type?: string;
    historyTalk?: boolean;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
    text?: string;
  };

  type ApiDefinition = {
    name?: string;
    deTableName?: string;
    desc?: string;
    url?: string;
    method?: string;
    fields?: TableField[];
    jsonFields?: Record<string, any>[];
    request?: ApiDefinitionRequest;
    status?: string;
    data?: Record<string, any>[];
    apiQueryTimeout?: number;
    previewNum?: number;
    serialNumber?: number;
    useJsonPath?: boolean;
    jsonPath?: string;
    reName?: boolean;
    orgName?: string;
    showApiStructure?: boolean;
    updateTime?: string;
    type?: string;
  };

  type ApiDefinitionRequest = {
    headers?: Record<string, any>[];
    body?: Record<string, any>;
    arguments?: Record<string, any>[];
    rest?: Record<string, any>[];
    authManager?: AuthManager;
  };

  type AuthManager = {
    password?: string;
    username?: string;
    verification?: string;
  };

  type BaseResponseAiRole = {
    code?: number;
    data?: AiRole;
    message?: string;
  };

  type BaseResponseApiDefinition = {
    code?: number;
    data?: ApiDefinition;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseChartResponse = {
    code?: number;
    data?: ChartResponse;
    message?: string;
  };

  type BaseResponseCoreDatasetGroupDTO = {
    code?: number;
    data?: CoreDatasetGroupDTO;
    message?: string;
  };

  type BaseResponseCoreDatasourceTask = {
    code?: number;
    data?: CoreDatasourceTask;
    message?: string;
  };

  type BaseResponseDashboard = {
    code?: number;
    data?: Dashboard;
    message?: string;
  };

  type BaseResponseDataPage = {
    code?: number;
    data?: DataPage;
    message?: string;
  };

  type BaseResponseDatasourceDTO = {
    code?: number;
    data?: DatasourceDTO;
    message?: string;
  };

  type BaseResponseGetChartDataVO = {
    code?: number;
    data?: GetChartDataVO;
    message?: string;
  };

  type BaseResponseGetCurMonthServiceRecordVO = {
    code?: number;
    data?: GetCurMonthServiceRecordVO;
    message?: string;
  };

  type BaseResponseGetUserChatHistoryVO = {
    code?: number;
    data?: GetUserChatHistoryVO;
    message?: string;
  };

  type BaseResponseListChartOption = {
    code?: number;
    data?: ChartOption[];
    message?: string;
  };

  type BaseResponseListChatHistory = {
    code?: number;
    data?: ChatHistory[];
    message?: string;
  };

  type BaseResponseListCoreDatasetTable = {
    code?: number;
    data?: CoreDatasetTable[];
    message?: string;
  };

  type BaseResponseListCoreDatasetTableField = {
    code?: number;
    data?: CoreDatasetTableField[];
    message?: string;
  };

  type BaseResponseListCoreDatasource = {
    code?: number;
    data?: CoreDatasource[];
    message?: string;
  };

  type BaseResponseListDashboard = {
    code?: number;
    data?: Dashboard[];
    message?: string;
  };

  type BaseResponseListDataCollaboratorsVO = {
    code?: number;
    data?: DataCollaboratorsVO[];
    message?: string;
  };

  type BaseResponseListDatasourceTreeVO = {
    code?: number;
    data?: ListDatasourceTreeVO;
    message?: string;
  };

  type BaseResponseListGetUserChatHistoryVO = {
    code?: number;
    data?: GetUserChatHistoryVO[];
    message?: string;
  };

  type BaseResponseListGetUserSQLChatRecordVO = {
    code?: number;
    data?: GetUserSQLChatRecordVO[];
    message?: string;
  };

  type BaseResponseListString = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseListUserData = {
    code?: number;
    data?: UserData[];
    message?: string;
  };

  type BaseResponseListUserMessage = {
    code?: number;
    data?: UserMessage[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseMapStringList = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageAiRole = {
    code?: number;
    data?: PageAiRole;
    message?: string;
  };

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageFailedChart = {
    code?: number;
    data?: PageFailedChart;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserCreateAssistant = {
    code?: number;
    data?: PageUserCreateAssistant;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsePreviewData = {
    code?: number;
    data?: PreviewData;
    message?: string;
  };

  type BaseResponsePreviewExcelDataVO = {
    code?: number;
    data?: PreviewExcelDataVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserCreateAssistant = {
    code?: number;
    data?: UserCreateAssistant;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Chart = {
    id?: string;
    goal?: string;
    name?: string;
    chartData?: string;
    userDataId?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartAddRequest = {
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartData = {
    id?: string;
    data?: Record<string, any>;
  };

  type ChartEditRequest = {
    name?: string;
    id?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartOption = {
    id?: string;
    dashboardId?: string;
    chartName?: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    name?: string;
    goal?: string;
    chartType?: string;
    userId?: string;
  };

  type ChartResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: string;
  };

  type ChartUpdateRequest = {
    id?: string;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChatForSQLRequest = {
    chatId?: string;
    question?: string;
  };

  type ChatHistory = {
    id?: string;
    chatRole?: number;
    chatId?: string;
    modelId?: string;
    content?: string;
    execMessage?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChatWithModelRequest = {
    text?: string;
    chatId?: string;
  };

  type ColumnsVO = {
    title?: string;
    dataIndex?: string;
  };

  type CoreDatasetGroupDTO = {
    id?: string;
    name?: string;
    pid?: string;
    level?: number;
    nodeType?: string;
    type?: string;
    mode?: number;
    info?: string;
    createTime?: string;
    updateTime?: string;
    unionSql?: string;
    union?: UnionDTO[];
    data?: Record<string, any>;
    allFields?: CoreDatasetTableField[];
    sql?: string;
    total?: string;
  };

  type CoreDatasetTable = {
    id?: string;
    name?: string;
    tableName?: string;
    datasourceId?: string;
    datasetGroupId?: string;
    type?: string;
    info?: string;
    sqlVariableDetails?: string;
  };

  type CoreDatasetTableField = {
    id?: string;
    datasourceId?: string;
    datasetTableId?: string;
    datasetGroupId?: string;
    chartId?: string;
    originName?: string;
    name?: string;
    description?: string;
    groupType?: string;
    type?: string;
    checked?: number;
    columnIndex?: number;
    lastSyncTime?: string;
    isUnique?: number;
  };

  type CoreDatasource = {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    pid?: string;
    editType?: string;
    configuration?: string;
    status?: string;
    taskStatus?: string;
    enableDataFill?: number;
    userId?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type CoreDatasourceTask = {
    id?: string;
    datasourceId?: string;
    datasetTableId?: string;
    name?: string;
    updateType?: string;
    startTime?: string;
    syncRate?: string;
    cron?: string;
    simpleCronValue?: string;
    simpleCronType?: string;
    endLimit?: string;
    endTime?: string;
    createTime?: string;
    lastExecTime?: string;
    lastExecStatus?: string;
    extraData?: string;
    taskStatus?: string;
    jobId?: number;
  };

  type Dashboard = {
    id?: string;
    name?: string;
    userId?: string;
    datasourceId?: string;
    snapshot?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type DataCollaboratorsVO = {
    userVO?: UserVO;
    permission?: number;
  };

  type DataPage = {
    current?: string;
    size?: string;
    total?: string;
    dataList?: ChartData[];
    tableFieldInfosList?: TableFieldInfo[];
  };

  type DataQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    dataId?: string;
    chartData?: ChartData;
  };

  type DatasourceDTO = {
    id?: string;
    pid?: string;
    name?: string;
    description?: string;
    type?: string;
    typeAlias?: string;
    catalog?: string;
    catalogDesc?: string;
    configuration?: string;
    apiConfigurationStr?: string;
    paramsStr?: string;
    createTime?: string;
    updateTime?: string;
    userId?: string;
    status?: string;
    syncSetting?: TaskDTO;
    editType?: number;
    nodeType?: string;
    action?: string;
    fileName?: string;
    size?: string;
    lastSyncTime?: string;
    multipartFile?: string;
    taskStatus?: string;
    enableDataFill?: boolean;
  };

  type DeleteChartDataRecordRequest = {
    dataId?: string;
    id?: string;
  };

  type deleteChartParams = {
    dashboardId: string;
  };

  type deleteDashboardParams = {
    dashboardId: string;
  };

  type DeleteDatasourceDirNodeRequest = {
    id: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type DeleteUserDataRequest = {
    id?: string;
  };

  type EditChartDataRecordRequest = {
    dataId?: string;
    id?: string;
    data?: Record<string, any>;
  };

  type EditDashboardChartRequestDTO = {
    id: string;
    chartName: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
  };

  type FailedChart = {
    id?: string;
    chartId?: string;
    status?: string;
    execMessage?: string;
    userId?: string;
    retryNum?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type FailedChartQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    chartId?: string;
    status?: string;
    execMessage?: string;
    userId?: string;
    createTime?: string;
    updateTime?: string;
  };

  type GenChartByAiWithDataRequest = {
    name?: string;
    goal?: string;
    chartType?: string;
    dataId?: string;
  };

  type getAiRoleByIdParams = {
    id: string;
  };

  type getByDatasourceParams = {
    datasourceId: string;
  };

  type getCaptchaParams = {
    emailAccount: string;
  };

  type getChartByIdParams = {
    id: string;
  };

  type getChartDataByIdParams = {
    chartId: string;
  };

  type GetChartDataRequestDTO = {
    dataOption: string;
  };

  type GetChartDataVO = {
    seriesDataList?: SeriesData[];
    xarrayData?: XArrayData;
  };

  type GetChatRequest = {
    chatId?: string;
  };

  type GetCurMonthServiceRecordVO = {
    serviceType?: string;
    serviceData?: string[];
    serviceDate?: string[];
  };

  type getDashboardByIdParams = {
    dashboardId: string;
  };

  type getDataCollaboratorsParams = {
    dataId: string;
  };

  type getDataSourceParams = {
    datasourceId: string;
  };

  type getOtherUserDataParams = {
    dataId: string;
    type: number;
    secret: string;
  };

  type getParams = {
    id: string;
  };

  type getSchemasParams = {
    id: string;
  };

  type GetTableFieldsDTO = {
    datasourceId: string;
    tableName: string;
  };

  type getTablesByDatasourceIdParams = {
    datasourceId: string;
  };

  type getUserAiRoleByIdParams = {
    id: string;
  };

  type getUserByIdParams = {
    id: string;
  };

  type GetUserChatHistoryVO = {
    chatId?: string;
    assistantName?: string;
    functionDes?: string;
  };

  type GetUserChatRecordRequest = {
    chatId?: string;
  };

  type GetUserSQLChatRecordVO = {
    id?: string;
    chatRole?: number;
    content?: string;
    columns?: ColumnsVO[];
    res?: Record<string, any>[];
    sql?: string;
    chatId?: string;
    modelId?: string;
    status?: number;
  };

  type getUserVOByIdParams = {
    id: string;
  };

  type listAllChartParams = {
    dashboardId: string;
  };

  type ListDatasourceTreeVO = {
    id?: string;
    name?: string;
    type?: string;
    datasourceId?: string;
    children?: ListDatasourceTreeVO[];
    pid?: string;
    wight?: number;
  };

  type LoginUserVO = {
    id?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    totalRewardPoints?: number;
    email?: string;
    invitationCode?: string;
    createTime?: string;
    updateTime?: string;
  };

  type MoveDatasourceDirNodeRequest = {
    id: string;
    newPid: string;
    wight?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAiRole = {
    records?: AiRole[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PageChart = {
    records?: Chart[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PageFailedChart = {
    records?: FailedChart[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PageUser = {
    records?: User[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PageUserCreateAssistant = {
    records?: UserCreateAssistant[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: string;
    size?: string;
    current?: string;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: string;
    pages?: string;
  };

  type PreviewData = {
    field?: SchemaStructure[];
    data?: Record<string, any>[];
  };

  type PreviewDataRequest = {
    datasourceId?: string;
    dataName?: string;
    allFields?: CoreDatasetTableField[];
  };

  type PreviewExcelDataVO = {
    sheetName?: string;
    isValid?: boolean;
    errorMessage?: string;
    dataList?: ChartData[];
    tableFieldInfosList?: TableFieldInfo[];
  };

  type previewSqlParams = {
    datasourceId: string;
    sql: string;
  };

  type ReGenChartRequest = {
    chartId?: string;
  };

  type SaveDashboardRequestDTO = {
    id: string;
    name?: string;
    snapshot?: string;
  };

  type saveParams = {
    rename: boolean;
  };

  type SchemaStructure = {
    datasourceId?: number;
    columnName?: string;
    comment?: string;
    type?: string;
  };

  type SeriesData = {
    title?: string;
    data?: number[];
  };

  type ShareUserDataRequest = {
    id?: string;
    permission?: number;
  };

  type SQLObj = {
    tableSchema?: string;
    tableName?: string;
    tableAlias?: string;
    fieldName?: string;
    fieldAlias?: string;
    groupField?: string;
    groupAlias?: string;
    orderField?: string;
    orderAlias?: string;
    orderDirection?: string;
    whereField?: string;
    whereAlias?: string;
    whereTermAndValue?: string;
    limitFiled?: string;
  };

  type StructDatabaseConfiguration = {
    name: string;
    description?: string;
    type?: string;
    host: string;
    port: string;
    dataBaseName: string;
    userName: string;
    password: string;
    initConNum?: number;
    maxConNum?: number;
    timeoutSecond?: number;
  };

  type TableField = {
    name?: string;
    originName?: string;
    type?: string;
    description?: string;
    groupType?: string;
    isUnique?: number;
    checked?: boolean;
    jsonPath?: string;
  };

  type TableFieldInfo = {
    name?: string;
    originName?: string;
    fieldType?: string;
  };

  type TaskDTO = {
    id?: string;
    updateType?: string;
    syncRate?: string;
    simpleCronValue?: string;
    simpleCronType?: string;
    startTime?: string;
    endTime?: string;
    endLimit?: string;
    cron?: string;
  };

  type UnionDTO = {
    currentDs?: CoreDatasetTable;
    currentDsField?: string[];
    currentDsFields?: CoreDatasetTableField[];
    unionToParent?: UnionParamDTO;
    allChildCount?: number;
  };

  type UnionItemDTO = {
    parentField?: CoreDatasetTableField;
    currentField?: CoreDatasetTableField;
  };

  type UnionParamDTO = {
    unionType?: string;
    unionFields?: UnionItemDTO[];
    parentDs?: CoreDatasetTable;
    currentDs?: CoreDatasetTable;
    parentSQLObj?: SQLObj;
    currentSQLObj?: SQLObj;
  };

  type uploadFileToMongoParams = {
    uploadUserDataRequest: UploadUserDataRequest;
  };

  type uploadFileToMySQLParams = {
    uploadUserDataRequest: UploadUserDataRequest;
  };

  type UploadUserDataRequest = {
    dataName?: string;
    description?: string;
    publicAll?: boolean;
  };

  type User = {
    id?: string;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    email?: string;
    invitationCode?: string;
    userAvatar?: string;
    userRole?: string;
    totalRewardPoints?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    vipexpirationTime?: string;
    svipexpirationTime?: string;
  };

  type UserAddChatRequest = {
    modelId?: string;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserCreateAssistant = {
    id?: string;
    assistantName?: string;
    userId?: string;
    type?: string;
    historyTalk?: number;
    functionDes?: string;
    inputModel?: string;
    roleDesign?: string;
    targetWork?: string;
    requirement?: string;
    style?: string;
    otherRequire?: string;
    isOnline?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserData = {
    id?: string;
    userId?: string;
    dataName?: string;
    description?: string;
    uploadType?: number;
    fieldTypeInfo?: string;
    totalRecord?: number;
    readSecretKey?: string;
    writeSecretKey?: string;
    approvalConfirm?: boolean;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserEmailRegisterRequest = {
    emailAccount?: string;
    captcha?: string;
    userName?: string;
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    invitationCode?: string;
    agreeToAnAgreement?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserMessage = {
    id?: string;
    userId?: string;
    title?: string;
    description?: string;
    type?: number;
    route?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    isRead?: number;
  };

  type UserMessageAddRequest = {
    userId?: string;
    title?: string;
    description?: string;
    type?: number;
    route?: string;
    isRead?: number;
  };

  type UserQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: string;
    userName?: string;
    userAvatar?: string;
    email?: string;
    invitationCode?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };

  type XArrayData = {
    title?: string;
    values?: string[];
  };
}

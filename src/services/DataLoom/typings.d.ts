declare namespace API {
  type AddDashboardChartRequestDTO = {
    dashboardId: number;
    chartName: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
  };

  type AddDashboardRequestDTO = {
    pid: number;
    name: string;
    datasourceId: number;
    snapshot?: string;
  };

  type AddDatasourceDirRequest = {
    name: string;
    type: string;
    pid: number;
    wight?: number;
  };

  type AddUserAskSqlHistoryRequest = {
    dataId?: number;
  };

  type AddUserChatHistory = {
    modelId?: number;
  };

  type AiChatRequest = {
    text?: string;
    assistantId?: number;
  };

  type aiGenChartParams = {
    dashBoardId: number;
  };

  type AiRole = {
    id?: number;
    assistantName?: string;
    userId?: number;
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
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
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
    id?: number;
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
    updateTime?: number;
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

  type BaseResponseDatasourceDTO = {
    code?: number;
    data?: DatasourceDTO;
    message?: string;
  };

  type BaseResponseGetChartAnalysisVO = {
    code?: number;
    data?: GetChartAnalysisVO;
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
    data?: number;
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
    id?: number;
    goal?: string;
    name?: string;
    chartData?: string;
    userDataId?: number;
    datasourceId?: number;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
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

  type ChartEditRequest = {
    name?: string;
    id?: number;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartOption = {
    id?: number;
    dashboardId?: number;
    chartName?: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
    analysisRes?: string;
    analysisLastFlag?: boolean;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    goal?: string;
    chartType?: string;
    userId?: number;
  };

  type ChartResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: number;
  };

  type ChartUpdateRequest = {
    id?: number;
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
    chatId?: number;
    question?: string;
  };

  type ChatHistory = {
    id?: number;
    chatRole?: number;
    chatId?: number;
    modelId?: number;
    content?: string;
    execMessage?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChatWithModelRequest = {
    text?: string;
    chatId?: number;
  };

  type ColumnsVO = {
    title?: string;
    dataIndex?: string;
  };

  type CoreDatasetGroupDTO = {
    id?: number;
    name?: string;
    pid?: number;
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
    total?: number;
  };

  type CoreDatasetTable = {
    id?: number;
    name?: string;
    tableName?: string;
    datasourceId?: number;
    datasetGroupId?: number;
    type?: string;
    info?: string;
    sqlVariableDetails?: string;
  };

  type CoreDatasetTableField = {
    id?: number;
    datasourceId?: number;
    datasetTableId?: number;
    datasetGroupId?: number;
    chartId?: number;
    originName?: string;
    name?: string;
    description?: string;
    groupType?: string;
    type?: string;
    checked?: number;
    columnIndex?: number;
    lastSyncTime?: number;
    isUnique?: number;
  };

  type CoreDatasource = {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    pid?: number;
    editType?: string;
    configuration?: string;
    status?: string;
    taskStatus?: string;
    enableDataFill?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type CoreDatasourceTask = {
    id?: number;
    datasourceId?: number;
    datasetTableId?: number;
    name?: string;
    updateType?: string;
    startTime?: string;
    syncRate?: string;
    cron?: string;
    simpleCronValue?: number;
    simpleCronType?: string;
    endLimit?: string;
    endTime?: string;
    createTime?: number;
    lastExecTime?: number;
    lastExecStatus?: string;
    extraData?: string;
    taskStatus?: string;
    jobId?: number;
  };

  type Dashboard = {
    id?: number;
    name?: string;
    userId?: number;
    datasourceId?: number;
    snapshot?: string;
    createTime?: string;
    updateTime?: string;
    status?: number;
    isDelete?: number;
  };

  type DatasourceDTO = {
    id?: number;
    pid?: number;
    name?: string;
    description?: string;
    type?: string;
    typeAlias?: string;
    catalog?: string;
    catalogDesc?: string;
    configuration?: string;
    apiConfigurationStr?: string;
    paramsStr?: string;
    createTime?: number;
    updateTime?: number;
    userId?: string;
    status?: string;
    syncSetting?: TaskDTO;
    editType?: number;
    nodeType?: string;
    action?: string;
    fileName?: string;
    size?: string;
    lastSyncTime?: number;
    multipartFile?: string;
    taskStatus?: string;
    enableDataFill?: boolean;
  };

  type deleteChartParams = {
    dashboardId: number;
  };

  type deleteDashboardParams = {
    dashboardId: number;
  };

  type DeleteDatasourceDirNodeRequest = {
    id: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type deleteUserAskSqlHistoryParams = {
    chatId: number;
  };

  type EditDashboardChartRequestDTO = {
    id: number;
    chartName: string;
    chartOption?: string;
    dataOption?: string;
    customSql?: string;
  };

  type FailedChart = {
    id?: number;
    chartId?: number;
    status?: string;
    execMessage?: string;
    userId?: number;
    retryNum?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type FailedChartQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    chartId?: number;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type GenChartByAiWithDataRequest = {
    name?: string;
    goal?: string;
    chartType?: string;
    dataId?: number;
  };

  type getAiRoleByIdParams = {
    id: number;
  };

  type getByDatasourceParams = {
    datasourceId: number;
  };

  type getCaptchaParams = {
    emailAccount: string;
  };

  type getChartAnalysisFluxParams = {
    chartId: number;
  };

  type getChartAnalysisParams = {
    chartId: number;
  };

  type GetChartAnalysisVO = {
    analysisRes?: string;
  };

  type getChartByIdParams = {
    id: number;
  };

  type getChartDataByIdParams = {
    chartId: number;
  };

  type GetChartDataRequestDTO = {
    dataOption: string;
  };

  type GetChartDataVO = {
    seriesDataList?: SeriesData[];
    xarrayData?: XArrayData;
  };

  type GetChatRequest = {
    chatId?: number;
  };

  type GetCurMonthServiceRecordVO = {
    serviceType?: string;
    serviceData?: number[];
    serviceDate?: string[];
  };

  type getDashboardByIdParams = {
    dashboardId: number;
  };

  type getDataSourceParams = {
    datasourceId: number;
  };

  type getParams = {
    id: number;
  };

  type GetTableFieldsDTO = {
    datasourceId: number;
    tableName: string;
  };

  type getTablesByDatasourceIdParams = {
    datasourceId: number;
  };

  type getUserAiRoleByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type GetUserChatHistoryVO = {
    chatId?: number;
    assistantName?: string;
    functionDes?: string;
    datasourceId?: number;
    datasourceName?: string;
    datasourceType?: string;
  };

  type GetUserChatRecordRequest = {
    chatId?: number;
  };

  type GetUserSQLChatRecordVO = {
    id?: number;
    chatRole?: number;
    content?: string;
    columns?: ColumnsVO[];
    res?: Record<string, any>[];
    sql?: string;
    chatId?: number;
    modelId?: number;
    status?: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type listAllChartParams = {
    dashboardId: number;
  };

  type ListDatasourceTreeVO = {
    id?: number;
    name?: string;
    type?: string;
    datasourceId?: number;
    children?: ListDatasourceTreeVO[];
    pid?: number;
    wight?: number;
  };

  type LoginUserVO = {
    id?: number;
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
    id: number;
    newPid: number;
    wight?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAiRole = {
    records?: AiRole[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageFailedChart = {
    records?: FailedChart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserCreateAssistant = {
    records?: UserCreateAssistant[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type previewSqlParams = {
    datasourceId: number;
    sql: string;
  };

  type ReGenChartRequest = {
    chartId?: number;
  };

  type SaveDashboardRequestDTO = {
    id: number;
    name?: string;
    snapshot?: string;
  };

  type saveParams = {
    rename: boolean;
  };

  type SeriesData = {
    title?: string;
    data?: number[];
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

  type TaskDTO = {
    id?: number;
    updateType?: string;
    syncRate?: string;
    simpleCronValue?: number;
    simpleCronType?: string;
    startTime?: string;
    endTime?: string;
    endLimit?: string;
    cron?: string;
  };

  type UnionDTO = {
    currentDs?: CoreDatasetTable;
    currentDsField?: number[];
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

  type User = {
    id?: number;
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
    svipexpirationTime?: string;
    vipexpirationTime?: string;
  };

  type UserAddChatRequest = {
    modelId?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserCreateAssistant = {
    id?: number;
    assistantName?: string;
    userId?: number;
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
    id?: number;
    userId?: number;
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
    userId?: number;
    title?: string;
    description?: string;
    type?: number;
    route?: string;
    isRead?: number;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
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
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
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

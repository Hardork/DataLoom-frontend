declare namespace API {
  type AddChardDataRecordRequest = {
    data?: Record<string, any>;
    dataId?: string;
  };

  type AddUserAskSqlHistoryRequest = {
    dataId?: string;
  };

  type AddUserChatHistory = {
    modelId?: string;
  };

  type AiChatRequest = {
    assistantId?: string;
    text?: string;
  };

  type AiRole = {
    assistantName?: string;
    createTime?: string;
    functionDes?: string;
    historyTalk?: number;
    id?: string;
    inputModel?: string;
    isDelete?: number;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    type?: string;
    updateTime?: string;
    userId?: string;
  };

  type AiRoleAddRequest = {
    assistantName?: string;
    functionDes?: string;
    historyTalk?: boolean;
    inputModel?: string;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    type?: string;
  };

  type AiRoleQueryRequest = {
    assistantName?: string;
    current?: string;
    functionDes?: string;
    historyTalk?: number;
    id?: string;
    inputModel?: string;
    otherRequire?: string;
    pageSize?: string;
    requirement?: string;
    roleDesign?: string;
    selectKey?: number;
    sortField?: string;
    sortOrder?: string;
    style?: string;
    targetWork?: string;
    type?: string;
  };

  type AiRoleUpdateRequest = {
    assistantName?: string;
    functionDes?: string;
    historyTalk?: number;
    id?: string;
    inputModel?: string;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    type?: string;
  };

  type AiTempChatRequest = {
    assistantName?: string;
    functionDes?: string;
    historyTalk?: boolean;
    inputModel?: string;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    text?: string;
    type?: string;
  };

  type BaseResponseAiRole_ = {
    code?: number;
    data?: AiRole;
    message?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseDataPage_ = {
    code?: number;
    data?: DataPage;
    message?: string;
  };

  type BaseResponseGetCurMonthServiceRecordVO_ = {
    code?: number;
    data?: GetCurMonthServiceRecordVO;
    message?: string;
  };

  type BaseResponseGetProductPointInfoByTypeVO_ = {
    code?: number;
    data?: GetProductPointInfoByTypeVO;
    message?: string;
  };

  type BaseResponseGetUserChatHistoryVO_ = {
    code?: number;
    data?: GetUserChatHistoryVO;
    message?: string;
  };

  type BaseResponseImageVo_ = {
    code?: number;
    data?: ImageVo;
    message?: string;
  };

  type BaseResponseListChatHistory_ = {
    code?: number;
    data?: ChatHistory[];
    message?: string;
  };

  type BaseResponseListDataCollaboratorsVO_ = {
    code?: number;
    data?: DataCollaboratorsVO[];
    message?: string;
  };

  type BaseResponseListGetUserChatHistoryVO_ = {
    code?: number;
    data?: GetUserChatHistoryVO[];
    message?: string;
  };

  type BaseResponseListGetUserSQLChatRecordVO_ = {
    code?: number;
    data?: GetUserSQLChatRecordVO[];
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseListUserData_ = {
    code?: number;
    data?: UserData[];
    message?: string;
  };

  type BaseResponseListUserMessage_ = {
    code?: number;
    data?: UserMessage[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePageAiRole_ = {
    code?: number;
    data?: PageAiRole_;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageFailedChart_ = {
    code?: number;
    data?: PageFailedChart_;
    message?: string;
  };

  type BaseResponsePageProductOrder_ = {
    code?: number;
    data?: PageProductOrder_;
    message?: string;
  };

  type BaseResponsePageProductPoint_ = {
    code?: number;
    data?: PageProductPoint_;
    message?: string;
  };

  type BaseResponsePageProductVip_ = {
    code?: number;
    data?: PageProductVip_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserCreateAssistant_ = {
    code?: number;
    data?: PageUserCreateAssistant_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePreviewData_ = {
    code?: number;
    data?: PreviewData;
    message?: string;
  };

  type BaseResponsePreviewExcelDataVO_ = {
    code?: number;
    data?: PreviewExcelDataVO;
    message?: string;
  };

  type BaseResponseProductOrder_ = {
    code?: number;
    data?: ProductOrder;
    message?: string;
  };

  type BaseResponseProductPoint_ = {
    code?: number;
    data?: ProductPoint;
    message?: string;
  };

  type BaseResponseProductVip_ = {
    code?: number;
    data?: ProductVip;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserCreateAssistant_ = {
    code?: number;
    data?: UserCreateAssistant;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    chartId?: string;
    genChart?: string;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    status?: string;
    updateTime?: string;
    userDataId?: string;
    userId?: string;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type ChartData = {
    data?: Record<string, any>;
    id?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
    name?: string;
  };

  type ChartQueryRequest = {
    chartType?: string;
    current?: string;
    goal?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    updateTime?: string;
  };

  type ChatForSQLRequest = {
    chatId?: string;
    question?: string;
  };

  type ChatHistory = {
    chatId?: string;
    chatRole?: number;
    content?: string;
    createTime?: string;
    execMessage?: string;
    id?: string;
    isDelete?: number;
    modelId?: string;
    status?: number;
    updateTime?: string;
  };

  type ChatWithModelRequest = {
    chatId?: string;
    text?: string;
  };

  type ColumnsVO = {
    dataIndex?: string;
    title?: string;
  };

  type DataCollaboratorsVO = {
    permission?: number;
    userVO?: UserVO;
  };

  type DataPage = {
    current?: string;
    dataList?: ChartData[];
    size?: string;
    tableFieldInfosList?: TableFieldInfo[];
    total?: string;
  };

  type DataQueryRequest = {
    chartData?: ChartData;
    current?: string;
    dataId?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type DataSourceConfig = {
    dataBaseName?: string;
    description?: string;
    host?: string;
    initConNum?: number;
    maxConNum?: number;
    name: string;
    password?: string;
    port?: string;
    timeoutSecond?: number;
    type?: string;
    userName?: string;
  };

  type DeleteChartDataRecordRequest = {
    dataId?: string;
    id?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type DeleteUserDataRequest = {
    id?: string;
  };

  type EditChartDataRecordRequest = {
    data?: Record<string, any>;
    dataId?: string;
    id?: string;
  };

  type FailedChart = {
    chartId?: string;
    createTime?: string;
    execMessage?: string;
    id?: string;
    isDelete?: number;
    retryNum?: number;
    status?: string;
    updateTime?: string;
    userId?: string;
  };

  type FailedChartQueryRequest = {
    chartId?: string;
    createTime?: string;
    current?: string;
    execMessage?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    updateTime?: string;
    userId?: string;
  };

  type genChartByAiAsyncMqUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiAsyncMqV3UsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type GenChartByAiWithDataRequest = {
    chartType?: string;
    dataId?: string;
    goal?: string;
    name?: string;
  };

  type getAiRoleByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type GetByTypeRequest = {
    id?: string;
    type?: number;
  };

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type GetChatRequest = {
    chatId?: string;
  };

  type GetCurMonthServiceRecordVO = {
    serviceData?: string[];
    serviceDate?: string[];
    serviceType?: string;
  };

  type getDataCollaboratorsUsingGETParams = {
    /** dataId */
    dataId: string;
  };

  type getOtherUserDataUsingGETParams = {
    /** dataId */
    dataId: string;
    /** secret */
    secret: string;
    /** type */
    type: number;
  };

  type getProductPointInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type GetProductPointInfoByTypeVO = {
    description?: string;
    id?: string;
    name?: string;
    total?: string;
  };

  type getProductVipInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getSchemasUsingGETParams = {
    /** id */
    id: string;
  };

  type getUserAiRoleByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type GetUserChatHistoryVO = {
    assistantName?: string;
    chatId?: string;
    functionDes?: string;
  };

  type GetUserChatRecordRequest = {
    chatId?: string;
  };

  type getUserOrderByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type GetUserSQLChatRecordVO = {
    chatId?: string;
    chatRole?: number;
    columns?: ColumnsVO[];
    content?: string;
    id?: string;
    modelId?: string;
    res?: Record<string, any>[];
    sql?: string;
    status?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type IdRequest = {
    id?: string;
  };

  type ImageVo = {
    name?: string;
    status?: string;
    uid?: string;
    url?: string;
  };

  type listProductPointInfoByPageUsingGETParams = {
    addPoints?: string;
    createTime?: string;
    current?: string;
    description?: string;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    originalTotal?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type listProductVipInfoByPageUsingGETParams = {
    addPoints?: string;
    createTime?: string;
    current?: string;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    originalTotal?: string;
    pageSize?: string;
    productType?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    email?: string;
    id?: string;
    invitationCode?: string;
    totalRewardPoints?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderAddRequest = {
    productId?: string;
    productType?: number;
  };

  type OrderCancelRequest = {
    id?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderPayRequest = {
    id?: string;
  };

  type OrderQueryRequest = {
    addPoints?: string;
    createTime?: string;
    current?: string;
    expirationTime?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: string;
    payType?: string;
    productId?: string;
    productType?: number;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: string;
  };

  type PageAiRole_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: AiRole[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Chart[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageFailedChart_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: FailedChart[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageProductOrder_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ProductOrder[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageProductPoint_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ProductPoint[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageProductVip_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ProductVip[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserCreateAssistant_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserCreateAssistant[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PreviewData = {
    data?: Record<string, any>[];
    field?: SchemaStructure[];
  };

  type PreviewDataRequest = {
    dataName?: string;
    datasourceId?: string;
  };

  type PreviewExcelDataVO = {
    dataList?: ChartData[];
    errorMessage?: string;
    isValid?: boolean;
    tableFieldInfosList?: TableFieldInfo[];
  };

  type ProductOrder = {
    addPoints?: string;
    codeUrl?: string;
    createTime?: string;
    expirationTime?: string;
    id?: string;
    orderName?: string;
    orderNo?: string;
    payType?: string;
    productId?: string;
    productInfo?: string;
    productType?: number;
    status?: string;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type ProductPoint = {
    addPoints?: string;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    originalTotal?: string;
    status?: number;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type ProductPointAddRequest = {
    addPoints?: string;
    description?: string;
    expirationTime?: string;
    name?: string;
    originalTotal?: string;
    status?: number;
    total?: string;
  };

  type ProductPointUpdateRequest = {
    addPoints?: string;
    description?: string;
    expirationTime?: string;
    id?: string;
    name?: string;
    originalTotal?: string;
    status?: number;
    total?: string;
  };

  type ProductVip = {
    addPoints?: string;
    createTime?: string;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    originalTotal?: string;
    productType?: number;
    status?: number;
    total?: string;
    updateTime?: string;
    userId?: string;
  };

  type ProductVipAddRequest = {
    addPoints?: string;
    description?: string;
    duration?: number;
    expirationTime?: string;
    name?: string;
    originalTotal?: string;
    productType?: number;
    status?: number;
    total?: string;
  };

  type ProductVipUpdateRequest = {
    addPoints?: string;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: string;
    name?: string;
    originalTotal?: string;
    productType?: number;
    status?: number;
    total?: string;
  };

  type ReGenChartRequest = {
    chartId?: string;
  };

  type SchemaStructure = {
    columnName?: string;
    comment?: string;
    datasourceId?: number;
    id?: number;
    type?: string;
  };

  type ShareUserDataRequest = {
    id?: string;
    permission?: number;
  };

  type TableFieldInfo = {
    fieldType?: string;
    name?: string;
    originName?: string;
  };

  type uploadFileToMongoUsingPOSTParams = {
    dataName?: string;
    description?: string;
    publicAll?: boolean;
  };

  type uploadFileToMySQLUsingPOSTParams = {
    dataName?: string;
    description?: string;
    publicAll?: boolean;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    email?: string;
    id?: string;
    invitationCode?: string;
    isDelete?: number;
    svipexpirationTime?: string;
    totalRewardPoints?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
    vipexpirationTime?: string;
  };

  type UserAddChatRequest = {
    modelId?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserCreateAssistant = {
    assistantName?: string;
    createTime?: string;
    functionDes?: string;
    historyTalk?: number;
    id?: string;
    inputModel?: string;
    isDelete?: number;
    isOnline?: number;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    type?: string;
    updateTime?: string;
    userId?: string;
  };

  type UserData = {
    approvalConfirm?: boolean;
    createTime?: string;
    dataName?: string;
    description?: string;
    fieldTypeInfo?: string;
    id?: string;
    isDelete?: number;
    readSecretKey?: string;
    totalRecord?: number;
    updateTime?: string;
    uploadType?: number;
    userId?: string;
    writeSecretKey?: string;
  };

  type UserEmailRegisterRequest = {
    agreeToAnAgreement?: string;
    captcha?: string;
    checkPassword?: string;
    emailAccount?: string;
    invitationCode?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserMessage = {
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
    isRead?: number;
    route?: string;
    title?: string;
    type?: number;
    updateTime?: string;
    userId?: string;
  };

  type UserMessageAddRequest = {
    description?: string;
    isRead?: number;
    route?: string;
    title?: string;
    type?: number;
    userId?: string;
  };

  type UserQueryRequest = {
    current?: string;
    id?: string;
    mpOpenId?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    email?: string;
    id?: string;
    invitationCode?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}

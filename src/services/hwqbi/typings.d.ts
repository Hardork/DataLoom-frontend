declare namespace API {
  type AddUserChatHistory = {
    modelId?: number;
  };

  type AiChatRequest = {
    assistantId?: number;
    text?: string;
  };

  type AiRole = {
    assistantName?: string;
    createTime?: string;
    functionDes?: string;
    historyTalk?: number;
    id?: number;
    inputModel?: string;
    isDelete?: number;
    otherRequire?: string;
    requirement?: string;
    roleDesign?: string;
    style?: string;
    targetWork?: string;
    type?: string;
    updateTime?: string;
    userId?: number;
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
    current?: number;
    functionDes?: string;
    historyTalk?: number;
    id?: number;
    inputModel?: string;
    otherRequire?: string;
    pageSize?: number;
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
    id?: number;
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

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListChatHistory_ = {
    code?: number;
    data?: ChatHistory[];
    message?: string;
  };

  type BaseResponseListGetUserChatHistoryVO_ = {
    code?: number;
    data?: GetUserChatHistoryVO[];
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
    data?: number;
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

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
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

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
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
    chartId?: number;
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
    id?: number;
    isDelete?: number;
    name?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: number;
    name?: string;
  };

  type ChartQueryRequest = {
    chartType?: string;
    current?: number;
    goal?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    updateTime?: string;
  };

  type ChatHistory = {
    chatId?: number;
    chatRole?: number;
    content?: string;
    createTime?: string;
    execMessage?: string;
    id?: number;
    isDelete?: number;
    modelId?: number;
    status?: number;
    updateTime?: string;
  };

  type ChatWithModelRequest = {
    chatId?: number;
    text?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genChartByAiAsyncMqUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiAsyncUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getAiRoleByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetByTypeRequest = {
    id?: number;
    type?: number;
  };

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetChatRequest = {
    chatId?: number;
  };

  type GetCurMonthServiceRecordVO = {
    serviceData?: number[];
    serviceDate?: string[];
    serviceType?: string;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getProductPointInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetProductPointInfoByTypeVO = {
    description?: string;
    id?: number;
    name?: string;
    total?: number;
  };

  type getProductVipInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserAiRoleByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetUserChatHistoryVO = {
    assistantName?: string;
    chatId?: number;
    functionDes?: string;
  };

  type GetUserChatRecordRequest = {
    chatId?: number;
  };

  type getUserOrderByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type listProductPointInfoByPageUsingGETParams = {
    addPoints?: number;
    createTime?: string;
    current?: number;
    description?: string;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    originalTotal?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: number;
  };

  type listProductVipInfoByPageUsingGETParams = {
    addPoints?: number;
    createTime?: string;
    current?: number;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    originalTotal?: number;
    pageSize?: number;
    productType?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    email?: string;
    id?: number;
    invitationCode?: string;
    totalRewardPoints?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderAddRequest = {
    productId?: number;
    productType?: number;
  };

  type OrderCancelRequest = {
    id?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderPayRequest = {
    id?: number;
  };

  type OrderQueryRequest = {
    addPoints?: number;
    createTime?: string;
    current?: number;
    expirationTime?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: number;
    payType?: string;
    productId?: number;
    productType?: number;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: number;
  };

  type PageAiRole_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AiRole[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageChart_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Chart[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductOrder_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductOrder[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductPoint_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductPoint[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductVip_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductVip[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCreateAssistant_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCreateAssistant[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: number;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type ProductOrder = {
    addPoints?: number;
    codeUrl?: string;
    createTime?: string;
    expirationTime?: string;
    id?: number;
    orderName?: string;
    orderNo?: string;
    payType?: string;
    productId?: number;
    productInfo?: string;
    productType?: number;
    status?: string;
    total?: number;
    updateTime?: string;
    userId?: number;
  };

  type ProductPoint = {
    addPoints?: number;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    originalTotal?: number;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: number;
  };

  type ProductPointAddRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    name?: string;
    originalTotal?: number;
    status?: number;
    total?: number;
  };

  type ProductPointUpdateRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    id?: number;
    name?: string;
    originalTotal?: number;
    status?: number;
    total?: number;
  };

  type ProductVip = {
    addPoints?: number;
    createTime?: string;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    originalTotal?: number;
    productType?: number;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: number;
  };

  type ProductVipAddRequest = {
    addPoints?: number;
    description?: string;
    duration?: number;
    expirationTime?: string;
    name?: string;
    originalTotal?: number;
    productType?: number;
    status?: number;
    total?: number;
  };

  type ProductVipUpdateRequest = {
    addPoints?: number;
    description?: string;
    duration?: number;
    expirationTime?: string;
    id?: number;
    name?: string;
    originalTotal?: number;
    productType?: number;
    status?: number;
    total?: number;
  };

  type ReGenChartRequest = {
    chartId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    email?: string;
    id?: number;
    invitationCode?: string;
    isDelete?: number;
    totalRewardPoints?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddChatRequest = {
    modelId?: number;
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
    id?: number;
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
    userId?: number;
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
    id?: number;
    isDelete?: number;
    isRead?: number;
    route?: string;
    title?: string;
    type?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserMessageAddRequest = {
    description?: string;
    isRead?: number;
    route?: string;
    title?: string;
    type?: number;
    userId?: number;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
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
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    email?: string;
    id?: number;
    invitationCode?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}

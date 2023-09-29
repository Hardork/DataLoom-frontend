declare namespace API {
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

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
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

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
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

  type getChartByIdUsingGETParams = {
    /** id */
    id?: number;
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

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    totalRewardPoints?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
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

  type ReGenChartRequest = {
    chartId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    totalRewardPoints?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
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
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}

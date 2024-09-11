declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCouponTask = {
    code?: number;
    data?: CouponTask;
    message?: string;
  };

  type BaseResponseCouponTemplateQueryVO = {
    code?: number;
    data?: CouponTemplateQueryVO;
    message?: string;
  };

  type BaseResponseGetProductPointInfoByTypeVO = {
    code?: number;
    data?: GetProductPointInfoByTypeVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePageCouponTask = {
    code?: number;
    data?: PageCouponTask;
    message?: string;
  };

  type BaseResponsePageCouponTemplate = {
    code?: number;
    data?: PageCouponTemplate;
    message?: string;
  };

  type BaseResponsePageProductOrder = {
    code?: number;
    data?: PageProductOrder;
    message?: string;
  };

  type BaseResponsePageProductPoint = {
    code?: number;
    data?: PageProductPoint;
    message?: string;
  };

  type BaseResponsePageProductVip = {
    code?: number;
    data?: PageProductVip;
    message?: string;
  };

  type BaseResponseProductOrder = {
    code?: number;
    data?: ProductOrder;
    message?: string;
  };

  type BaseResponseProductPoint = {
    code?: number;
    data?: ProductPoint;
    message?: string;
  };

  type BaseResponseProductVip = {
    code?: number;
    data?: ProductVip;
    message?: string;
  };

  type BaseResponseVoid = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type CouponTask = {
    id?: string;
    batchId?: string;
    taskName?: string;
    sendNum?: number;
    userListFilePath?: string;
    notifyType?: string;
    couponTemplateId?: string;
    sendType?: number;
    sendTime?: string;
    status?: number;
    completionTime?: string;
    createTime?: string;
    operatorId?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type CouponTaskCreateReqDTO = {
    /** 优惠券批次任务名称 */
    taskName: string;
    /** 优惠券批次任务名称 */
    fileAddress: string;
    /** 通知方式 */
    notifyType: string;
    /** 优惠券模板id */
    couponTemplateId: string;
    /** 发送类型 */
    sendType: number;
    /** 发送时间 */
    sendTime?: string;
  };

  type CouponTaskPageQueryReqDTO = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    batchId?: string;
    taskName?: string;
    couponTemplateId?: string;
    status?: number;
  };

  type CouponTemplate = {
    id?: string;
    name?: string;
    description?: string;
    type?: number;
    status?: number;
    validStartTime?: string;
    validEndTime?: string;
    stock?: number;
    claimRules?: string;
    usageRules?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type CouponTemplateNumberReqDTO = {
    /** 优惠券模板id */
    couponTemplateId: string;
    /** 增加发行数量 */
    number: number;
  };

  type CouponTemplatePageQueryReqDTO = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    name?: string;
    type?: number;
    status?: number;
  };

  type CouponTemplateQueryVO = {
    id?: string;
    name?: string;
    description?: string;
    type?: number;
    status?: number;
    validStartTime?: string;
    validEndTime?: string;
    stock?: number;
    claimRules?: string;
    usageRules?: string;
    createTime?: string;
    updateTime?: string;
  };

  type CouponTemplateRemindCreateReqDTO = {
    couponTemplateId?: string;
    contact?: string;
    type?: number;
    remindTime?: number;
  };

  type CouponTemplateSaveReqDTO = {
    name?: string;
    description?: string;
    type?: number;
    validStartTime?: string;
    validEndTime?: string;
    stock?: number;
    claimRules?: string;
    usageRules?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type findCouponTaskByIdParams = {
    taskId: string;
  };

  type findCouponTemplateParams = {
    couponTemplateId: string;
  };

  type GetByTypeRequest = {
    id?: string;
    type?: number;
  };

  type getProductPointInfoByIdParams = {
    id: string;
  };

  type GetProductPointInfoByTypeVO = {
    id?: string;
    name?: string;
    description?: string;
    total?: string;
  };

  type getProductVipInfoByIdParams = {
    id: string;
  };

  type getUserOrderByIdParams = {
    id: string;
  };

  type IdRequest = {
    id?: string;
  };

  type listProductPointInfoByPageParams = {
    productInfoQueryRequest: ProductPointQueryRequest;
  };

  type listProductVipInfoByPageParams = {
    productInfoQueryRequest: ProductVipQueryRequest;
  };

  type OrderAddRequest = {
    productId?: string;
    productType?: number;
  };

  type OrderCancelRequest = {
    id?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type OrderPayRequest = {
    id?: string;
  };

  type OrderQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    orderNo?: string;
    productId?: string;
    orderName?: string;
    total?: string;
    productType?: number;
    status?: string;
    payType?: string;
    addPoints?: string;
    expirationTime?: string;
    createTime?: string;
  };

  type PageCouponTask = {
    records?: CouponTask[];
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

  type PageCouponTemplate = {
    records?: CouponTemplate[];
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

  type PageProductOrder = {
    records?: ProductOrder[];
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

  type PageProductPoint = {
    records?: ProductPoint[];
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

  type PageProductVip = {
    records?: ProductVip[];
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

  type pageQueryCouponTaskParams = {
    requestParam: CouponTaskPageQueryReqDTO;
  };

  type pageQueryCouponTemplateParams = {
    requestParam: CouponTemplatePageQueryReqDTO;
  };

  type ProductOrder = {
    id?: string;
    orderNo?: string;
    codeUrl?: string;
    userId?: string;
    productId?: string;
    orderName?: string;
    total?: string;
    productType?: number;
    status?: string;
    payType?: string;
    productInfo?: string;
    addPoints?: string;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
  };

  type ProductPoint = {
    id?: string;
    name?: string;
    description?: string;
    userId?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductPointAddRequest = {
    name?: string;
    description?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    status?: number;
    expirationTime?: string;
  };

  type ProductPointQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    name?: string;
    description?: string;
    userId?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductPointUpdateRequest = {
    id?: string;
    name?: string;
    description?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    status?: number;
    expirationTime?: string;
  };

  type ProductVip = {
    id?: string;
    name?: string;
    description?: string;
    userId?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    productType?: number;
    duration?: number;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductVipAddRequest = {
    name?: string;
    description?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    duration?: number;
    productType?: number;
    status?: number;
    expirationTime?: string;
  };

  type ProductVipQueryRequest = {
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    id?: string;
    name?: string;
    description?: string;
    userId?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    productType?: number;
    duration?: number;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductVipUpdateRequest = {
    id?: string;
    name?: string;
    description?: string;
    total?: string;
    originalTotal?: string;
    addPoints?: string;
    duration?: number;
    productType?: number;
    status?: number;
    expirationTime?: string;
  };

  type terminateCouponTemplateParams = {
    couponTemplateId: string;
  };

  type UserClaimCouponDTO = {
    couponTemplateId: string;
  };
}

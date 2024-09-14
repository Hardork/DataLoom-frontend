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
    data?: number;
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
    id?: number;
    batchId?: number;
    taskName?: string;
    sendNum?: number;
    userListFilePath?: string;
    notifyType?: string;
    couponTemplateId?: number;
    sendType?: number;
    sendTime?: string;
    status?: number;
    completionTime?: string;
    createTime?: string;
    operatorId?: number;
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
    couponTemplateId: number;
    /** 发送类型 */
    sendType: number;
    /** 发送时间 */
    sendTime?: string;
  };

  type CouponTaskPageQueryReqDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    batchId?: string;
    taskName?: string;
    couponTemplateId?: number;
    status?: number;
  };

  type CouponTemplate = {
    id?: number;
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
    couponTemplateId: number;
    /** 增加发行数量 */
    number: number;
  };

  type CouponTemplatePageQueryReqDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    name?: string;
    type?: number;
    status?: number;
  };

  type CouponTemplateQueryVO = {
    id?: number;
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
    couponTemplateId?: number;
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
    id?: number;
  };

  type findCouponTaskByIdParams = {
    taskId: number;
  };

  type findCouponTemplateParams = {
    couponTemplateId: number;
  };

  type GetByTypeRequest = {
    id?: number;
    type?: number;
  };

  type getProductPointInfoByIdParams = {
    id: number;
  };

  type GetProductPointInfoByTypeVO = {
    id?: number;
    name?: string;
    description?: string;
    total?: number;
  };

  type getProductVipInfoByIdParams = {
    id: number;
  };

  type getUserOrderByIdParams = {
    id: number;
  };

  type IdRequest = {
    id?: number;
  };

  type listProductPointInfoByPageParams = {
    productInfoQueryRequest: ProductPointQueryRequest;
  };

  type listProductVipInfoByPageParams = {
    productInfoQueryRequest: ProductVipQueryRequest;
  };

  type OrderAddRequest = {
    productId?: number;
    productType?: number;
  };

  type OrderCancelRequest = {
    id?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type OrderPayRequest = {
    id?: number;
  };

  type OrderQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    orderNo?: string;
    productId?: number;
    orderName?: string;
    total?: number;
    productType?: number;
    status?: string;
    payType?: string;
    addPoints?: number;
    expirationTime?: string;
    createTime?: string;
  };

  type PageCouponTask = {
    records?: CouponTask[];
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

  type PageCouponTemplate = {
    records?: CouponTemplate[];
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

  type PageProductOrder = {
    records?: ProductOrder[];
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

  type PageProductPoint = {
    records?: ProductPoint[];
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

  type PageProductVip = {
    records?: ProductVip[];
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

  type pageQueryCouponTaskParams = {
    requestParam: CouponTaskPageQueryReqDTO;
  };

  type pageQueryCouponTemplateParams = {
    requestParam: CouponTemplatePageQueryReqDTO;
  };

  type ProductOrder = {
    id?: number;
    orderNo?: string;
    codeUrl?: string;
    userId?: number;
    productId?: number;
    orderName?: string;
    total?: number;
    productType?: number;
    status?: string;
    payType?: string;
    productInfo?: string;
    addPoints?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
  };

  type ProductPoint = {
    id?: number;
    name?: string;
    description?: string;
    userId?: number;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductPointAddRequest = {
    name?: string;
    description?: string;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    status?: number;
    expirationTime?: string;
  };

  type ProductPointQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    description?: string;
    userId?: number;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductPointUpdateRequest = {
    id?: number;
    name?: string;
    description?: string;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    status?: number;
    expirationTime?: string;
  };

  type ProductVip = {
    id?: number;
    name?: string;
    description?: string;
    userId?: number;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
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
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    duration?: number;
    productType?: number;
    status?: number;
    expirationTime?: string;
  };

  type ProductVipQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    description?: string;
    userId?: number;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    productType?: number;
    duration?: number;
    status?: number;
    expirationTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ProductVipUpdateRequest = {
    id?: number;
    name?: string;
    description?: string;
    total?: number;
    originalTotal?: number;
    addPoints?: number;
    duration?: number;
    productType?: number;
    status?: number;
    expirationTime?: string;
  };

  type terminateCouponTemplateParams = {
    couponTemplateId: number;
  };

  type UserClaimCouponDTO = {
    couponTemplateId: number;
  };
}

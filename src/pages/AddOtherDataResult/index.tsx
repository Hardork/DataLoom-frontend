import React, {useEffect, useState} from "react";
import {Button, Result} from "antd";
import {useParams} from "react-router";
import {getOtherUserDataUsingGet} from "@/services/hwqbi/dataController";
import { history } from '@@/exports';



const AddOtherDataResult: React.FC = () => {
  const param = useParams();
  const [success, setSuccess] = useState<boolean>(undefined);
  const getOtherUserData = async ()=> {
    const res = await getOtherUserDataUsingGet({
      dataId: param.dataId,
      secret: param.secret,
      type: param.type
    })
    if (res.code === 0) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }
  useEffect(() => {
    getOtherUserData()
  }, [param]);
  return (
    <div>
      {success !== undefined && success && <>
        <Result
          status="success"
          title="成功添加数据集!"
          subTitle="可以点击下方按钮前往查看"
          extra={[
            <Button type="primary" key="console" onClick={() => {
              history.push('/data_meta_table')
            }}>
              前往数据集
            </Button>,
          ]}
        />
      </>
      }

      {success !== undefined && !success && <>
        <Result
          status="error"
          title="添加数据集失败!"
          subTitle="请确认共享数据集链接的正确性"
        />
      </>
      }
    </div>
  );
};
export default AddOtherDataResult;

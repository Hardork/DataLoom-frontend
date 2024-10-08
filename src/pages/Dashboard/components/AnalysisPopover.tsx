import React, {useState, useEffect, useRef} from "react";
import {Badge, Button, Popover, Spin} from "antd";
import {useModel} from "@@/exports";
import OmsViewMarkdown from "@/components/OmsViewMarkdown";
import {getChartAnalysis, getChartAnalysisFlux} from "@/services/DataLoom/yibiaopanjiekou";

type Props = {
  chart: {
    i: string,
    type: string,
    component: any,
    dataOption: any,
    analysisLastFlag: boolean
  }
}

const AnalysisPopover = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [showBudge, setShowBudge] = useState(!props.chart.analysisLastFlag)
  // 假设ws是已经创建好的WebSocket实例


  // 分析结果
  const popoverContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState ?? {};
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [content, setContent] = useState('')
    const handleVisibleChange = async () => {
      setShowBudge(false)

      // 如果更新过了，直接获取数据
      if (props.chart.analysisLastFlag) {
        setLoading(true)
        if (!props.chart.i) {
          return;
        }
        const res = await getChartAnalysis({chartId: props.chart.i});
        if (res.code === 0 && res.data?.analysisRes) {
          setContent(res.data.analysisRes)
        }
        setLoading(false)
      } else { // 流式获取数据
        await getChartAnalysisFlux({chartId: props.chart.i})
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      handleVisibleChange()
    }, []);


    // 建立连接
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const handleMessage = (event:any) => {
        // 处理收到的消息
        const res = JSON.parse(event.data)
        if (res.type === 'start') { //会话开始
          setLoading(true)
        } else if (res.type === 'end') { //结束会话
          setLoading(false)
        } else { // 实时渲染
          setLoading(false)
          setContent(res.content)
        }
      };

      // 假设ws是已经创建好的WebSocket实例
      const ws = new WebSocket('ws://localhost:8081/api/websocket/chart/' + currentUser?.id);

      ws.onmessage = (event: any) => {
        handleMessage(event);
      };

      ws.onopen = () => {
        console.log('连接已建立')
      }

      return () => {
        ws.close();
      };
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scrollDomRef = useRef<HTMLDivElement>(null);

    let timeoutTimer: number | NodeJS.Timeout | null | undefined = null
    let intervalTimer: number | NodeJS.Timeout | undefined
    const autoScroll = () => {
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer)
      }
      // 容器高度
      const clientH = scrollDomRef.current && scrollDomRef.current.clientHeight || 0
      // 滚动高度
      const scrollH = scrollDomRef.current && scrollDomRef.current.scrollHeight || 0
      if (intervalTimer) {
        window.clearInterval(intervalTimer)
      }
      // 无滚动
      if (scrollH === clientH) return
      //
      if (scrollDomRef.current) {
        const distance = scrollH - clientH
        console.log(distance)
        scrollDomRef.current.scrollTop = scrollH
      }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      autoScroll()
    }, [content])

    return (
      <>
        {loading ? (
          <Spin tip="分析中..." />
        ) : (
          <div style={{
            marginTop: '5px',
            padding: '10px',
            background: '#f4f6f8',
            borderRadius: '10px',
            width: '378px',
            overflowY: "scroll",
            maxHeight: '400px', // 可选，控制容器高度
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }} ref={scrollDomRef}><OmsViewMarkdown
            textContent={content ?? ''} darkMode></OmsViewMarkdown></div>)
        }
      </>
    )
  };

  return (
    <Popover
      content={popoverContent}
      trigger="click"
      visible={visible} // 改为visible
      onVisibleChange={(newVisible) => setVisible(newVisible)} // 使用onVisibleChange来控制显示和隐藏
    >
      <Badge dot={showBudge}>
        <Button size={"small"} style={{marginRight: "4px"}} onClick={(event) => {
          event.preventDefault()
        }}>
          💡 智能分析
        </Button>
      </Badge>
    </Popover>
  );
};

export default AnalysisPopover;

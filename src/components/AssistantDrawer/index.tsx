import {useState} from "react";
import {Button, Drawer, Space} from "antd";

// @ts-ignore
interface AssistantDrawerProps {
  openState: boolean; // 添加一个属性来接收传递的值
  onClose: any
}
const AssistantDrawer: React.FC<AssistantDrawerProps> = ({openState, onClose}) => {
  const [open, setOpen] = useState(openState);

  return (
    <>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        size={"large"}
      >
        <iframe
          src="http://localhost:8080/ui/chat/51ccbe5c7543677a"
          style={{
            width: "100%",
            height: "100%"
          }}
          frameBorder="0"
          allow="microphone">
        </iframe>

      </Drawer>
    </>
  );
};

export default AssistantDrawer;

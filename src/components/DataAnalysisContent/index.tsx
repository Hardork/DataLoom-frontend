import React from 'react';
import { Divider } from 'antd';
import { FileTextOutlined, RightOutlined } from '@ant-design/icons';
import './styles.less';

interface AnalysisCase {
  id: string;
  title: string;
  type: string;
  prompt: string;
  fileUrl: string;
}

interface DataAnalysisContentProps {
  cases: AnalysisCase[];
  onUseCase: (caseId: string) => void;
}

const DataAnalysisContent: React.FC<DataAnalysisContentProps> = ({
  cases,
  onUseCase
}) => {
  return (
    <div className="analysis-content">
      <div className="analysis-header">
        <h1 className="analysis-title">DataLoom 数据分析</h1>
        <p className="analysis-subtitle">让数据分析成为随手的事</p>
      </div>

      <Divider className="analysis-divider">
        分析案例
      </Divider>

      <div className="analysis-cases">
        {cases.map(analysisCase => (
          <div 
            key={analysisCase.id} 
            className="analysis-case-card"
          >
            <div className="analysis-case-content">
              <h3 className="analysis-case-title">{analysisCase.title}</h3>
              <span className="analysis-case-type">{analysisCase.type}</span>
              <p className="analysis-case-prompt">{analysisCase.prompt}</p>
              <div className="analysis-case-file">
                <FileTextOutlined />
                <span>{analysisCase.fileUrl}</span>
              </div>
            </div>
            <button 
              className="analysis-case-use" 
              onClick={() => onUseCase(analysisCase.id)}
            >
              使用 <RightOutlined />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAnalysisContent;
import "./style.scss";

import { FiCopy } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { Process } from "../../../types/process";
import MeterPie from "../MeterPie";
import { useEffect, useState } from "react";

export default ({ close, process }: { close: any; process: Process }) => {

  const [textLines, setTextLines] = useState<string[]>([]);

  useEffect(() => {
    setTextLines(Object.entries(process).map(([key, value]) => 
      `${key} = ${value}`
    ))
  }, [process]);

  return (
    <div className="process-modal-container">
      <div className="process-modal-overlay" onClick={close}></div>
      <div className="process-modal-box">
        <div className="process-modal-box-controls">
          <FiCopy onClick={() => navigator.clipboard.writeText(textLines.join('\n'))} />
          <MdClose onClick={close} />
        </div>
        <div className="process-modal-box-left">
          {textLines.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
        <div className="process-modal-box-right">
          <MeterPie label={"cpu"} used={process.cpu} width="250px" height="250px" showLegend={true} />
          <MeterPie label={"mem"} used={process.mem} width="250px" height="250px" showLegend={true} />
        </div>
      </div>
    </div>
  );
};

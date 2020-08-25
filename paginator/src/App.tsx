import React, { useState, useEffect } from "react";
import "./App.css";

const LIST = [
  { id: 1, name: "All", isSelected: true },
  { id: 2, name: "New", isSelected: false },
  { id: 3, name: "Popular", isSelected: false },
  { id: 4, name: "Keno", isSelected: false },
  { id: 5, name: "Table", isSelected: false },
  { id: 6, name: "Lottery", isSelected: false },
  { id: 7, name: "Table_1", isSelected: false },
  { id: 8, name: "Table_2", isSelected: false },
  { id: 9, name: "Lottery_1", isSelected: false },
];

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [lineLeft, setLineLeft] = useState(0);
  useEffect(() => {
    initPageArrayElements();
  })
  const initPageArrayElements = () => {
    let items = document.querySelectorAll(".pillow");
    let widthArray = [];
    for (let i = 0; i < items.length; i++) {
      widthArray.push((items[i] as HTMLElement).offsetWidth);
    }
    setLineWidth(
      widthArray.reduce(
        (itemWidth, fullWidth) => fullWidth + itemWidth,
        0
      )
    );
    return widthArray;
  };
  // handler on scroll
  const scrollPage = (isRight = false, index: number) => {
    const widthArray = initPageArrayElements();
    let sliderWidth = (document.querySelector(
      ".plaginator-items"
    ) as HTMLElement).offsetWidth;
    const appendix = isRight ? +widthArray[index] : -widthArray[index];
    const remainder = lineWidth - sliderWidth - offset;
    const offsetLocal = offset + appendix;
    if (isRight) {
      if (remainder > 0) {
        setOffset(offsetLocal);
        setLineLeft(-offsetLocal);
      }
    } else {
      if (index === LIST.length - 1) {
        let offsetOfRightLast = lineWidth - sliderWidth;
        offsetOfRightLast = offsetOfRightLast > widthArray[LIST.length - 1] ? offsetOfRightLast : widthArray[LIST.length - 1]
        console.log(widthArray[index])
        setOffset(offsetOfRightLast);
        setLineLeft(-offsetOfRightLast);
      } else
        if (offset === 0 || offsetLocal < 0) {
          setOffset(0);
          setLineLeft(0);
        } else {
          setOffset(offsetLocal);
          setLineLeft(-offsetLocal);

        }
    }
    if (index == 0) {
      setLineLeft(0);
      setOffset(0);
    }

  };
  // arrow handler for selection
  const selectPageByArrow = (isRight = false): number => {
    if (isRight) {
      const index = selectedIndex + 1 > LIST.length - 1 ? 0 : selectedIndex + 1;
      setSelectedIndex(index);
      return index;
    }
    const index = selectedIndex - 1 < 0 ? LIST.length - 1 : selectedIndex - 1;
    setSelectedIndex(index);
    return index;
  };
  const arrowClickHandler = (isRight = false) => {
    const index = selectPageByArrow(isRight);
    scrollPage(isRight, index);
  };
  // render page list
  const getPageItems = () =>
    LIST.map((item, index) => {
      return (
        <div
          key={item.id}
          className="pillow"
        ><div
          onClick={() => setSelectedIndex(index)}
          className={"item" + (selectedIndex === index ? "Active" : "")}>
            {item?.name.toUpperCase()}
          </div></div>
      );
    });

  return (
    <div className="App">
      <div className="plaginator">
        <div className="pillow">
          <div className="item" onClick={() => arrowClickHandler()}>
            {"<"}
          </div></div>
        <div className="plaginator-items">
          <div className="line" style={{ width: lineWidth, left: lineLeft }}>
            {getPageItems()}
          </div>
        </div>
        <div className="pillow">
          <div className="item" onClick={() => arrowClickHandler(true)}>
            {">"}
          </div></div>
      </div>
    </div>
  );
};

export default App;

//Balloon
let p = document.getElementById("balloon");
  let size;
  function setSize(newSize) {
    size = newSize;
    p.style.fontSize = size + "px";
  }
  setSize(20);

  function handleArrow(event) {
    if (event.key == "ArrowUp") {
      if (size > 70) {
        p.textContent = "💥";
        document.body.removeEventListener("keydown", handleArrow);
      } else {
        setSize(size * 1.1);
        event.preventDefault();
      }
    } else if (event.key == "ArrowDown") {
      setSize(size * 0.9);
      event.preventDefault();
    }
  }
  document.body.addEventListener("keydown", handleArrow);

  //Mouse trial
  let dots = [];
  for (let i = 0; i < 12; i++) {
    let node = document.createElement("div");
    node.className = "trail";
    document.body.appendChild(node);
    dots.push(node);
  }
  let currentDot = 0;
  
  window.addEventListener("mousemove", event => {
    let dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + "px";
    dot.style.top = (event.pageY - 3) + "px";
    currentDot = (currentDot + 1) % dots.length;
  });

  //Tabs
  function asTabs(node) {
    let tabs = Array.from(node.children).map(node => {
      let button = document.createElement("button");
      button.textContent = node.getAttribute("data-tabname");
      let tab = {node, button};
      button.addEventListener("click", () => selectTab(tab));
      return tab;
    });

    let tabList = document.createElement("div");
    for (let {button} of tabs) tabList.appendChild(button);
    node.insertBefore(tabList, node.firstChild);

    function selectTab(selectedTab) {
      for (let tab of tabs) {
        let selected = tab == selectedTab;
        tab.node.style.display = selected ? "" : "none";
        tab.button.style.color = selected ? "red" : "";
      }
    }
    selectTab(tabs[0]);
  }

  asTabs(document.querySelector("tab-panel"));
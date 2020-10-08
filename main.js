const myData = {
  "headings": [
    "Usage Count",
    "Thumbnail",
    "Name"
  ],
  "data": [
    [
      32,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/PDP-11-M7270.jpg/200px-PDP-11-M7270.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:PDP-11-M7270.jpg'>PDP-11-M7270.jpg</a>"
      // "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/PDP-11-M7270.jpg/200px-PDP-11-M7270.jpg"
    ],
    [
      16,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Chinese-abacus.jpg/200px-Chinese-abacus.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Chinese-abacus.jpg'>Chinese-abacus.jpg</a>"
      // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Chinese-abacus.jpg/200px-Chinese-abacus.jpg"
    ],
    [
      14,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sun-crypto-accelerator-1000.jpg/200px-Sun-crypto-accelerator-1000.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Sun-crypto-accelerator-1000.jpg'>Sun-crypto-accelerator-1000.jpg</a>"
    ],
    [
      12,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/IBM-3279.jpg/200px-IBM-3279.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:IBM-3279.jpg'>IBM-3279.jpg</a>"
    ],
    [
      11,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Macintosh-motherboard.jpg/200px-Macintosh-motherboard.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Macintosh-motherboard.jpg'>Macintosh-motherboard.jpg</a>"
    ],
    [
      11,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Vt100-adventure.jpg/200px-Vt100-adventure.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Vt100-adventure.jpg'>Vt100-adventure.jpg</a>"
    ],
    [
      11,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/VAX-11-750.jpg/200px-VAX-11-750.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:VAX-11-750.jpg'>VAX-11-750.jpg</a>"
    ],
    [
      10,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Power-cpu.jpg/200px-Power-cpu.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Power-cpu.jpg'>Power-cpu.jpg</a>"
    ],
    [
      8,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Drum-printer.jpg/200px-Drum-printer.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Drum-printer.jpg'>Drum-printer.jpg</a>"
    ],
    [
      8,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Scsi-connectors.jpg/200px-Scsi-connectors.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Scsi-connectors.jpg'>Scsi-connectors.jpg</a>"
    ],
    [
      7,
      "<img class='lazy' data-src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lens-iris.jpg/200px-Lens-iris.jpg'/>",
      "<a href='https://commons.wikimedia.org/wiki/File:Lens-iris.jpg'>Lens-iris.jpg</a>"
    ]
  ]
};

renderChart();

function renderChart() {
  const tooltip = document.getElementById("tooltip-container");

  const chartLabels = [], usageCount = [];
  const maxDisplay = (myData.data.length < 10) ? myData.data.length : 10; //If there are more than 10 elements: Only display 10.

  for (let i = 0; i < maxDisplay; i++) {
    chartLabels.push(myData.data[i][2]);
    usageCount.push(myData.data[i][0]);
  }

  new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      // labels: chartLabels,
      datasets: [{
        data: usageCount,
        backgroundColor: [
          '#ac5c91',
          '#b5d29f',
          '#b383b3',
          '#d5dc76',
          '#71b37b',
          '#8a84a3',
          '#d09440',
          '#578e86',
          '#d56d76',
          '#4f93c0',
          '#69999f'
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Top 10 Pictures',
        fontSize: 22
      },
      tooltips: {
        enabled: false,
        custom: function (tooltipModel) {
          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
            tooltip.style.opacity = 0;
            return;
          }
          // console.log(tooltipModel.dataPoints[0].index);

          // show the tooltip.
          tooltip.style.opacity = 1;

          // create the img element and append it to the tooltip element.
          const img = document.createElement('img');

          const selectedIndex = tooltipModel.dataPoints[0].index;
          // console.log(selectedIndex);
          const urlHtml = myData.data[selectedIndex][1];
          // console.log(urlHtml);
          const url = urlHtml.slice(urlHtml.search("src='") + 5, -3);
          // console.log(url);

          img.src = url;
          // console.log(img.src);
          tooltip.innerHTML = "";
          tooltip.appendChild(img);

          //Create text below image
          const tooltipText = document.createElement('div');
          tooltipText.className = "tooltip-text";
          const nUsage = myData.data[selectedIndex][0];
          tooltipText.innerHTML = "Used on <b>" + nUsage + "</b> sites";
          tooltip.appendChild(tooltipText);

          // move the tooltip to the 'correct' position.
          const position = this._chart.canvas.getBoundingClientRect();
          console.log(position);
          // tooltip.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          // tooltip.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltip.style.top = (position.height / 2) - 70 + 'px';
          console.log("top:" + tooltip.style.top);
          tooltip.style.left = (position.width / 2) - 100 + 'px';
        }
      }
    }
  });
}
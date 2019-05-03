//import Chart from './Chart';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { pack, hierarchy } from 'd3-hierarchy';

class BubbleChart {
  constructor(id, data, config, width, height) {
    //super(svgId);
    this.type = 'BubbleChart';
    this.data = data;
    this.config = config;
    this.dotRadius = 1;

    const svgEl = document.getElementById(id);
    const svgWidth = Math.round(svgEl.getBoundingClientRect().width);
    const svgHeight = Math.round(svgEl.getBoundingClientRect().height);

    this.svgSelection = select(svgEl);

    this.height = height || svgHeight;
    this.width = width || svgWidth;

    // this.height =
    //   this.svgElHeight - this.config.margin.top - this.config.margin.bottom
    // this.width =
    //   this.svgElWidth - this.config.margin.left - this.config.margin.right
    this.selectedAccessorIndex = 0;
    this.currentTransition = null;
    this.arcGroupSelection = null;
    this.arcGroupPathSelection = null;

    this.setBubbleData(); //TODO: dont call function in constructor in any class

    //Responsive
    // this.container = select('#histo-chart-1-container')
    // this.container.style(
    //   'padding-bottom',
    //   Math.ceil(this.height * 100 / this.width) + '%'
    // )
    // this.svgSelection.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
  }

  refreshSizes(width, height) {
    this.height = height;
    this.width = width;
  }

  update() {
    console.log(this.height);
    console.log(this.width);
    this.setBubbleData();
    this.draw();
  }

  setBubbleData() {
    this.bubbleData = [];
    this.config.accessors.forEach((accessor, index) => {
      let dataObject = {},
        bubble = null,
        nodes = null;

      // bubble = pack(this.data[index])
      //   .size([this.width, this.height])
      //   .padding(1.5);

      this.pack = pack()
        .size([this.width, this.height])
        .padding(1.5);

      nodes = hierarchy(this.data[index]).sum(d => d.Count);

      dataObject.label = accessor.label;
      dataObject.nodes = nodes;

      this.bubbleData.push(dataObject);
    });
  }

  draw() {
    this.dataObject = this.bubbleData[this.selectedAccessorIndex];
    this.drawLayout();
    this.updateDraw();
    //this.drawLabels()
  }

  drawLayout() {
    if (this.mainGroupSelection) {
      this.mainGroupSelection.remove();
    }

    this.mainGroupSelection = this.svgSelection.append('g').attr('class', 'svg-bubble');
    // .attr(
    //   'transform',
    //   'translate(' +
    //     this.config.margin.left +
    //     ',' +
    //     this.config.margin.top +
    //     ')'
    //)
  }

  updateDraw() {
    const t = transition().duration(750);

    //JOIN
    const bubble = this.mainGroupSelection
      .selectAll('circle')
      .data(this.pack(this.dataObject.nodes).leaves(), d => d.data.Name);

    const label = this.mainGroupSelection
      .selectAll('text.svg-bubble__label')
      .data(this.pack(this.dataObject.nodes).leaves(), d => d.data.Name);

    const sublabel = this.mainGroupSelection
      .selectAll('text.svg-bubble__sublabel')
      .data(this.pack(this.dataObject.nodes).leaves(), d => d.data.Name);

    //EXIT
    bubble
      .exit()
      .transition(t)
      .attr('r', 1e-6)
      .remove();

    label
      .exit()
      .transition(t)
      .attr('opacity', 1e-6)
      .remove();

    sublabel
      .exit()
      .transition(t)
      .attr('opacity', 1e-6)
      .remove();

    //UPDATE
    bubble
      .transition(t)
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    label
      .transition(t)
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    sublabel
      .transition(t)
      .attr('dy', '2rem')
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    //ENTER
    bubble
      .enter()
      .append('circle')
      .attr('r', 1e-6)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .style('fill', '#fff')
      .transition(t)
      .style('fill', (d, i) => this.config.colorScale(i))
      .attr('r', d => d.r);

    label
      .enter()
      .append('text')
      .attr('opacity', 1e-6)
      .attr('class', 'svg-bubble__label')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .text(d => d.data.Name)
      .transition(t)
      .attr('opacity', 1);

    sublabel
      .enter()
      .append('text')
      .attr('opacity', 1e-6)
      .attr('class', 'svg-bubble__sublabel')
      .attr('dy', '2rem')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .text(d => (d.data.Desc ? d.data.Desc : ''))
      .transition(t)
      .attr('opacity', 1);
  }

  setTransition(accessorIndex) {
    if (this.selectedAccessorIndex !== accessorIndex) {
      this.dataObject = this.bubbleData[accessorIndex];
      this.updateDraw();
      this.selectedAccessorIndex = accessorIndex;
    }
  }

  // Return buttons config to construct
  changeAccessor(accessorIndex = 0) {
    if (this.selectedAccessorIndex !== accessorIndex) {
      this.setTransition(accessorIndex);
    }
  }
}

export default BubbleChart;

import React, { useEffect } from 'react';
import SectionLayout from '../layouts/SectionLayout';
import BubbleChart from '../../utils/BubbleChart';
import stackData from '../../data/stack.json';
import { scaleOrdinal } from 'd3-scale';
import classNames from 'classnames';
import { from } from 'rxjs';

//Sass styles variables
import colors from '../../styles/_nostromo.config.scss';

const StackSection = () => {
  let _chartInstance = null;

  useEffect(() => {
    _chartInstance = initChart(stackData);
  }, []);

  const initChart = data => {
    const config = {
      colorScale: scaleOrdinal([...Object.values(colors)]),
      accessors: [
        { label: 'Front', prop: 'front' },
        { label: 'Back', prop: 'back' },
        { label: 'Test', prop: 'tests' },
        { label: 'Divers', prop: 'divers' },
        { label: 'Os', prop: 'os' },
      ],
      margin: { top: 0, left: 0, bottom: 0, right: 0 },
    };

    // config.accessors.forEach((accessor, index) => {
    //   this.buttonList.push({ id: this.$props.id + '-' + index, label: accessor.label })
    // })

    const bubbleChartInstance = new BubbleChart('svg-stack', data, config);
    bubbleChartInstance.draw();

    return bubbleChartInstance;

    //Select the first button
    //this.selectedId = this.buttonList[0].id
  };

  const handleChangeAccessor = ({ target }) => {
    if (target.dataset.index !== undefined) {
      _chartInstance.changeAccessor(target.dataset.index);
      const $accessorArray$ = from(Array.from(document.getElementsByClassName('js-accessor')));
      $accessorArray$.subscribe($el => $el.classList.remove('active'), null, () => {
        target.classList.add('active');
      });
    }
  };

  return (
    <SectionLayout id="stack" className="section-stack m-bg-gd-primary-l">
      <div className="title-box m-bg-alert m-fx">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Stack</h2>
      </div>
      <div className="content-box m-tx-white m-fx m-fs-ty">
        <p>
          Mon stack technique tourne principalement autour du Web et le langage de prédilection avec lequel je
          m'épanouis est JavaScript. J'apprécis son utilisation en mode full stack.
        </p>
      </div>
      <div className="image-box">
        <img src="../../static/images/typing-computer.jpg" className="image" />
      </div>
      <div className="chart-box m-fx-cl-c-c">
        <div id="stack-chart" className="stack-chart__container svg-container">
          <svg
            id="svg-stack"
            className="svg-bubble"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xmlSpace="preserve"
          />
        </div>
        <div className="button-list m-tx-white m-wd-100 m-fx-c-c" onClick={handleChangeAccessor}>
          <button
            data-index="0"
            className={classNames('btn m-mg-ty-r m-pd-xt-b btn-accessor active', { 'js-accessor': true })}
          >
            Front-end
          </button>
          <button
            data-index="1"
            className={classNames('btn m-mg-ty-r m-pd-xt-b btn-accessor', { 'js-accessor': true })}
          >
            Back-end
          </button>
          <button
            data-index="2"
            className={classNames('btn m-mg-ty-r m-pd-xt-b btn-accessor', { 'js-accessor': true })}
          >
            Tests
          </button>
          <button
            data-index="3"
            className={classNames('btn m-mg-ty-r m-pd-xt-b btn-accessor', { 'js-accessor': true })}
          >
            Divers
          </button>
          <button data-index="4" className={classNames('btn m-pd-xt-b btn-accessor', { 'js-accessor': true })}>
            OS
          </button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default StackSection;

import React, { useState, useEffect } from 'react';
import Section from './Section';
import Footer from './Footer';
import Navigation from './navigation';

interface MobilizationProps {
  /* Define when the mobilization is in edit mode. */
  editable: boolean;
  colorScheme?: string;
  headerFont?: string;
  bodyFont?: string;
  /* Function used to link navigation bar with block,
   * receives block as parameter and should return a string like id. */
  linkTo: Function;
  /* This component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked
   *
   * TODO: Review button should external to the mobilization component.
   */
  // newBlockButton: PropTypes.any,
  /* Sections of your mobilization, you will receive an item from this
   * list when you are rendering block customization. */
  blocks: any[];
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  // blockWrapper: PropTypes.any,
  /* Array of widgets object used on render. */
  widgets: any[];
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: any;
  // TODO: Documentation
  extraWidgetProps: any;
  /* Function used to link widgets with block, receives (block, widgets)
   * as param.
   * Default function use the attrs widget.block_id to relationship. */
  blockWidgetsRef: Function;
}

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */

const getVisibleBlocks = (blocks: any, editable: any) =>
  !editable ? blocks.filter((b: any) => !b.hidden) : blocks;

const Mobilization: React.FC<MobilizationProps> = props => {
  const [blocks, setBlocks] = useState(
    getVisibleBlocks(props.blocks, props.editable)
  );
  // const scroll = () => {
  //   let blocksTotalHeight = 0

  //   // get the offsetTop of each block and put it on state
  //   const blocksWithOffsetTop = blocks.map((block: any, index: any) => {
  //     const { offsetTop, offsetHeight } = document.querySelector(`#${props.linkTo(block)}`)
  //     const scrollTopReached = index === 0

  //     blocksTotalHeight += offsetHeight
  //     return { ...block, offsetTop, scrollTopReached }
  //   })

  //   setBlocks(blocksWithOffsetTop)

  //   // watch the scroll event
  //   document.querySelector('#blocks-list').onscroll = ({ target }) => {
  //     //
  //     // check if the current scroll position is greater or equals
  //     // than one of the blocks offsetTop
  //     //
  //     blocks.map((block: any) => {
  //       const scrollPassed = (target.scrollTop + 120) >= block.offsetTop

  //       if (scrollPassed && !block.scrollTopReached) {
  //         updateBlock(block, { scrollTopReached: true })
  //       }
  //       return scrollPassed
  //     })

  //     //
  //     // small fix if the last block is small than viewport
  //     // if the scroll position is greater or equals than
  //     // sum of all blocks height, sinalyze that the last block was reached
  //     //
  //     const viewportBottom = target.scrollTop + target.offsetHeight
  //     const isBottom = viewportBottom >= blocksTotalHeight
  //     const lastBlock = blocks.slice(-1)[0]

  //     if (isBottom && !lastBlock.scrollTopReached) {
  //       updateBlock(lastBlock, { scrollTopReached: true })
  //     }
  //   }
  // }
  useEffect(() => {
    setBlocks(getVisibleBlocks(props.blocks, props.editable));
  }, [props.blocks, props.editable]);

  // const updateBlock = (block: any, newProps: any) => {
  //   const index = blocks.findIndex((currentBlock: any) => currentBlock.id === block.id)
  //   return  setBlocks({
  //     blocks: [
  //       ...blocks.slice(0, index),
  //       { ...blocks[index], ...newProps },
  //       ...blocks.slice(index + 1)
  //     ]
  //   })
  // }

  // Props used on editable mode
  // Props to customize layout themes
  // TODO: Rever funcionamento da customização de layouts
  const { editable, colorScheme, headerFont, bodyFont } = props;

  const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`;
  const layoutClassName = editable ? 'flex-auto relative' : 'absolute';
  const layoutStyle = !editable
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : undefined;
  // Props to render blocos
  const {
    linkTo,
    blockWidgetsRef,
    widgets,
    widgetComponent,
    extraWidgetProps,
  } = props;

  return (
    <div
      className={`flex flex-column ${themeClassName} ${layoutClassName}`}
      style={layoutStyle}
    >
      <Navigation blocks={blocks} editable={editable} linkTo={linkTo} />
      <div
        id="blocks-list"
        className="flex-auto"
        style={{ overflowY: 'scroll' }}
      >
        {blocks.map((b: any, i: any) => (
          <Section
            key={`section-${i}`}
            anchor={linkTo(b)}
            block={b}
            editable={editable}
            widgets={blockWidgetsRef(b, widgets)}
            widgetComponent={widgetComponent}
            extraWidgetProps={extraWidgetProps}
          />
        ))}
        <Footer />
      </div>
    </div>
  );
};

Mobilization.defaultProps = {
  editable: false,
  blocks: [],
  widgets: [],
  extraWidgetProps: {},
  blockWidgetsRef: (b: any, ws: any) =>
    ws.filter((w: any) => w.block_id === b.id),
};

export default Mobilization;

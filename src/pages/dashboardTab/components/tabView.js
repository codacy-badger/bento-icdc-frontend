import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { getColumns } from 'bento-components';
import SelectAllModal from './modal';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
} from '../../../bento/dashboardTabData';
import CustomDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import { addToCart, getCart } from '../../fileCentricCart/store/cart';
import Message from '../../../components/Message';

const getOverviewQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY);

// Due to cypher limitation we have to send seperate query get descending list
const getOverviewDescQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_DESC_QUERY);

const TabView = ({
  classes,
  data,
  customColumn,
  customOnRowsSelect,
  openSnack,
  disableRowSelection,
  buttonText,
  tableID,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
  toggleMessageStatus,
  BottomMessageStatus,
  tabIndex,
  externalLinkIcon,
  options,
  TopMessageStatus,
  count,
  api,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  filteredSubjectIds,
}) => {
  // Get the existing files ids from  cart state
  const cart = getCart();
  const fileIDs = cart.fileIds ? cart.fileIds : [];
  const saveButton = useRef(null);
  const saveButton2 = useRef(null);

  // Store current page selected info
  const [rowSelection, setRowSelection] = React.useState({
    selectedRowInfo: [],
    selectedRowIndex: [],
  });

  // Store current page selected info
  const [selectedIDs, setSelectedIDs] = React.useState([]);

  const buildButtonStyle = (button, styleObject) => {
    const styleKV = Object.entries(styleObject);
    // eslint-disable-next-line  no-restricted-syntax, no-unused-vars
    for (const [key, value] of styleKV) {
      // eslint-disable-next-line no-param-reassign
      button.current.style[key] = value;
    }
  };
  const initSaveButtonDefaultStyle = (button) => {
    // eslint-disable-next-line no-param-reassign
    button.current.disabled = true;
    buildButtonStyle(button, saveButtonDefaultStyle);
  };

  const updateActiveSaveButtonStyle = (flag, button) => {
    if (flag) {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = true;
      buildButtonStyle(button, DeactiveSaveButtonDefaultStyle);
    } else {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = false;
      buildButtonStyle(button, ActiveSaveButtonDefaultStyle);
    }
  };

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);
    initSaveButtonDefaultStyle(saveButton2);

    if (rowSelection.selectedRowIndex.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  });

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    addToCart({ fileIds: selectedIDs });
    if (newFileIDS > 0) {
      openSnack(newFileIDS);
    }
    setSelectedIDs([]);
  }

  function rowSelectionEvent(displayData, rowsSelected) {
    const displayedDataKeies = displayData;
    const selectedRowsKey = rowsSelected
      ? rowsSelected.map((index) => displayedDataKeies[index])
      : [];
    let newSelectedRowInfo = [];

    if (rowsSelected) {
      // Remove the rowInfo from selectedRowInfo if this row currently be
      // displayed and not be selected.
      if (rowSelection.selectedRowInfo.length > 0) {
        newSelectedRowInfo = rowSelection.selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = rowSelection.selectedRowInfo;
    }
    newSelectedRowInfo = newSelectedRowInfo.concat(selectedRowsKey);

    // Get selectedRowIndex by comparing current page data with selected row's key.
    // if rowInfo from selectedRowInfo is currently be displayed
    const newSelectedRowIndex = displayedDataKeies.reduce(
      (accumulator, currentValue, currentIndex) => {
        if (newSelectedRowInfo.includes(currentValue)) {
          accumulator.push(currentIndex);
        }
        return accumulator;
      }, [],
    );

    setRowSelection({
      selectedRowInfo: newSelectedRowInfo,
      selectedRowIndex: newSelectedRowIndex,
    });
  }

  /*
    Presist user selection
  */
  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData) {
    rowSelectionEvent(displayData.map((d) => d.data[0]), rowsSelected);

    setSelectedIDs([...new Set(
      customOnRowsSelect(data, allRowsSelected),
    )]);
    if (allRowsSelected.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  }

  // overwrite default options
  const defaultOptions = () => ({
    dataKey,
    rowsSelectedTrigger: (displayData, rowsSelected) => rowSelectionEvent(
      displayData,
      rowsSelected,
    ),
    rowsSelected: rowSelection.selectedRowIndex,
    onRowSelectionChange: (curr, allRowsSelected, rowsSelected, displayData) => onRowsSelect(
      curr,
      allRowsSelected,
      rowsSelected,
      displayData,
    ),
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });
  const finalOptions = { ...options, ...defaultOptions() };

  return (
    <div>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <SelectAllModal />
        <button
          type="button"
          ref={saveButton2}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonText }
        </button>
        <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('top', 'open')} onMouseEnter={() => toggleMessageStatus('top', 'open')} onMouseLeave={() => toggleMessageStatus('top', 'close')}>
          {TopMessageStatus.src ? (
            <img
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
              src={TopMessageStatus.src}
              alt={TopMessageStatus.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              className={classes.helpIcon}
              fontSize="small"
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
            />
          )}
        </IconButton>

      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            data={data}
            columns={getColumns(customColumn, classes, data, externalLinkIcon)}
            options={finalOptions}
            count={count}
            overview={getOverviewQuery(api)}
            overviewDesc={getOverviewDescQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={{ subject_ids: filteredSubjectIds }}
          />
        </Grid>

      </Grid>
      <Grid item xs={12} className={classes.saveButtonDivBottom}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonText }
        </button>

        <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('bottom', 'open')} onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')}>
          {BottomMessageStatus.src ? (
            <img
              onMouseEnter={() => toggleMessageStatus('bottom', 'open')}
              onMouseOver={() => toggleMessageStatus('bottom', 'open')}
              onFocus={() => toggleMessageStatus('bottom', 'open')}
              src={BottomMessageStatus.src}
              alt={BottomMessageStatus.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              onMouseEnter={() => toggleMessageStatus('bottom', 'open')}
              onMouseOver={() => toggleMessageStatus('bottom', 'open')}
              onFocus={() => toggleMessageStatus('bottom', 'open')}
              className={classes.helpIcon}
              fontSize="small"
            />
          )}
        </IconButton>
        <div style={{ position: 'relative' }}>
          { BottomMessageStatus.isActive
            && tabIndex === BottomMessageStatus.currentTab.toString() ? (
              <div className={classes.messageBottom}>
                {' '}
                <Message data={BottomMessageStatus.text} />
                {' '}
              </div>
            ) : ''}
          <Link
            target="_blank"
            rel="noreferrer"
            to={(location) => ({ ...location, pathname: '/fileCentricCart' })}
            color="inherit"
            className={classes.cartlink}
          >
            Go to Cart
            {' '}
            {'>'}
          </Link>
        </div>

      </Grid>
    </div>
  );
};

const styles = () => ({

  link: {
    color: '#7747ff',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginRight: '70px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    paddingBottom: '3px',
  },
  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  saveButtonDiv: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
  },
  saveButtonDivBottom: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#10A075',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  caseTableBorder: {
    borderTopColor: '#F48439',
  },
  fileTableBorder: {
    borderTopColor: '#2446C6',
  },
  sampleTableBorder: {
    borderTopColor: '#05C5CC',
  },
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: 'calc(100% - 220px)',
  },
  helpIcon: {
    zIndex: '600',
    width: '20px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
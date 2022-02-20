"use strict";
(globalThis["webpackChunkreact_admin"] = globalThis["webpackChunkreact_admin"] || []).push([["src_views_App_Cernitor_NotifyChannel_index_js-src_style_view-style_table_scss"],{

/***/ "./src/views/App/Cernitor/NotifyChannel/NotifyChannel.jsx":
/*!****************************************************************!*\
  !*** ./src/views/App/Cernitor/NotifyChannel/NotifyChannel.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_CustomBreadcrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/CustomBreadcrumb */ "./src/components/CustomBreadcrumb/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/tabs/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/tag/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/notification/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/divider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/modal/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/table/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/layout/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var _style_view_style_table_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/style/view-style/table.scss */ "./src/style/view-style/table.scss");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/service/app/cruise/channel/ChannelService */ "./src/service/app/cruise/channel/ChannelService.js");
/* harmony import */ var _service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/service/app/cernitor/domain/DomainService */ "./src/service/app/cernitor/domain/DomainService.js");
/* harmony import */ var _api_StringUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/StringUtil */ "./src/api/StringUtil.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/InfoCircleOutlined.js");
var _jsxFileName = "/Users/xiaoqiangjiang/source/reddwarf/frontend/react-admin/src/views/App/Cernitor/NotifyChannel/NotifyChannel.jsx";













const {
  TabPane
} = antd__WEBPACK_IMPORTED_MODULE_9__["default"];

class NotifyChannel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      channelId: null,
      editorPick: null,
      name: null,
      defaultActiveKey: 1,
      showModal: false
    };

    this.enterLoading = () => {
      this.setState({
        loading: true
      });
    };

    this.onPageChange = (current, e) => {
      if (e === undefined) {
        // 如果是点击翻页触发的事件，e为10
        // 如果是由检索等其他操作触发的页面改变事件，则e为undefined
        // 不做任何操作
        // 避免事件重复触发
        return;
      }

      this.setState({
        pageNum: current
      });
      let request = {
        pageSize: this.state.pageSize,
        pageNum: current
      };
      (0,_service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__.getDomainPage)(request);
    };

    this.onChange = (pagination, filters, sorter, extra) => {
      if (Object.keys(sorter).length === 0 && Object.keys(filters) === 0) {
        return;
      }

      let request = {
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum,
        orderByClause: sorter && Object.keys(sorter).length === 0 ? '' : (0,_api_StringUtil__WEBPACK_IMPORTED_MODULE_5__.getOrderByClause)(sorter),
        editorPick: Object.keys(filters).length === 0 || filters.editorPick === undefined ? null : filters.editorPick[0]
      };
      (0,_service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__.getDomainPage)(request);
    };

    this.cancelSub = (text, record) => {
      let request = {
        id: record.id,
        subStatus: record.subStatus === 1 ? 0 : 1
      };
      (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.editChannel)(request);
    };

    this.showArticles = record => {
      this.props.history.push('/app/cruise/article?channelId=' + encodeURIComponent(record.id));
    };

    this.editorPick = record => {
      let request = {
        id: record.id,
        editor_pick: record.editorPick === 1 ? 0 : 1
      };
      (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.editorPickChannel)(request);
    };

    this.getColumnSearchProps = dataIndex => ({
      filterDropdown: _ref => {
        let {
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        } = _ref;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          style: {
            padding: 8
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125,
            columnNumber: 13
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["default"], {
          ref: node => {
            this.searchInput = node;
          },
          placeholder: `Search ${dataIndex}`,
          value: selectedKeys[0],
          onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []),
          onPressEnter: e => this.handleSearch(selectedKeys, confirm, dataIndex, e),
          style: {
            width: 188,
            marginBottom: 8,
            display: 'block'
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 17
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
          type: "primary",
          onClick: e => this.handleSearch(selectedKeys, confirm, dataIndex, e),
          icon: "search",
          size: "small",
          style: {
            width: 90,
            marginRight: 8
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136,
            columnNumber: 17
          }
        }, "Search"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
          onClick: () => this.handleReset(clearFilters),
          size: "small",
          style: {
            width: 90
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 144,
            columnNumber: 17
          }
        }, "Reset"));
      },
      filterIcon: filtered => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["default"], {
        type: "search",
        style: {
          color: filtered ? '#1890ff' : undefined
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149,
          columnNumber: 33
        }
      }),
      onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: (text, record) => {
        if (this.state.searchedColumn === dataIndex) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
            href: record.subUrl,
            target: "_blank",
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 163,
              columnNumber: 21
            }
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_highlight_words__WEBPACK_IMPORTED_MODULE_6___default()), {
            highlightStyle: {
              backgroundColor: '#ffc069',
              padding: 0
            },
            searchWords: [this.state.searchText],
            autoEscape: true,
            textToHighlight: text.toString(),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 164,
              columnNumber: 25
            }
          }), record.editorPick === 1 && dataIndex === 'subName' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_13__["default"], {
            color: "green-inverse",
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 171,
              columnNumber: 29
            }
          }, "\u7F16\u8F91\u9009\u62E9") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 173,
              columnNumber: 29
            }
          }));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
            href: record.subUrl,
            target: "_blank",
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 179,
              columnNumber: 21
            }
          }, text, record.editorPick === 1 && dataIndex === 'subName' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_13__["default"], {
            color: "green-inverse",
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 182,
              columnNumber: 29
            }
          }, "\u7F16\u8F91\u9009\u62E9") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 184,
              columnNumber: 29
            }
          }));
        }
      }
    });

    this.handleSearch = (selectedKeys, confirm, dataIndex, e) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex
      });

      if (dataIndex === 'subName') {
        this.setState({
          name: selectedKeys[0]
        }, () => {
          this.handleFetch();
        });
      }

      if (dataIndex === 'subUrl') {
        this.setState({
          subUrl: selectedKeys[0]
        }, () => {
          this.handleFetch();
        });
      }
    };

    this.handleFetch = () => {
      let request = {
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum,
        name: this.state.name,
        subUrl: this.state.subUrl
      };
      (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.getChannelList)(request);
    };

    this.handleReset = clearFilters => {
      clearFilters();
      this.setState({
        searchText: ''
      });
    };

    this.tabChange = key => {
      this.setState({
        defaultActiveKey: key
      });

      if (key === '1') {
        let request = {};
        (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.getChannelList)(request);
      } else if (key === '2') {
        let request = {
          minimalReputation: 10,
          excludeEditorPickChannel: 1
        };
        (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.getChannelList)(request);
      } else if (key === '3') {
        let request = {
          editorPick: 1
        };
        (0,_service_app_cruise_channel_ChannelService__WEBPACK_IMPORTED_MODULE_3__.getChannelList)(request);
      }
    };
  }

  changePageSize(pageSize, current) {
    this.setState({
      pageSize: pageSize
    });
    let request = {
      pageSize: pageSize,
      pageNum: this.state.pageNum
    };
    (0,_service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__.getDomainPage)(request);
  }

  componentDidMount() {
    let params = query_string__WEBPACK_IMPORTED_MODULE_7__.parse(this.props.location.search);

    if (params && Object.keys(params).length === 0 || params === undefined) {
      let request = {
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      };
      (0,_service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__.getDomainPage)(request);
      return;
    }

    this.setState({
      channelId: params.channelId
    });
    let request = {
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum,
      subSourceId: params.channelId
    };
    (0,_service_app_cernitor_domain_DomainService__WEBPACK_IMPORTED_MODULE_4__.getDomainPage)(request);
  }

  componentWillUnmount() {
    antd__WEBPACK_IMPORTED_MODULE_14__["default"].destroy();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '域名备注',
      dataIndex: 'domain_name',
      key: 'domain_name'
    }, {
      title: '频率配置',
      dataIndex: 'cron',
      key: 'cron'
    }, {
      title: '域名',
      dataIndex: 'domain_url',
      key: 'domain_url'
    }, {
      title: '提前通知（天）',
      dataIndex: 'days_before_trigger',
      key: 'days_before_trigger'
    }, {
      title: '触发检查时间',
      dataIndex: 'notify_trigger_date',
      key: 'notify_trigger_date'
    }, {
      title: '下一次检查时间',
      dataIndex: 'next_trigger_time',
      key: 'next_trigger_time'
    }, {
      title: '证书过期时间',
      dataIndex: 'expire_date',
      key: 'expire_date'
    }, {
      title: '剩余天数',
      render: text => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 302,
            columnNumber: 28
          }
        }, dayjs__WEBPACK_IMPORTED_MODULE_8___default()(text.expire_date).diff(new Date(), 'day'));
      }
    }, {
      title: '监控状态',
      dataIndex: 'monitor_status',
      key: 'monitor_status',
      render: text => text === '1' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 309,
          columnNumber: 49
        }
      }, '正常') : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 309,
          columnNumber: 71
        }
      }, '停止通知')
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 315,
          columnNumber: 21
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
        type: "primary",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 316,
          columnNumber: 25
        }
      }, "\u8BE6\u60C5"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_15__["default"], {
        type: "vertical",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 317,
          columnNumber: 25
        }
      }))
    }];
    let data = this.props.domain.domain.list;
    let channel = this.props.domain.domain;
    let total = 0;
    let pageSize = 0;
    let pageNum = 0;

    if (data && Object.keys(data).length === 0 || data === undefined) {} else {
      total = parseInt(channel.pagination.total);
      pageSize = channel.pagination.pageSize;
      pageNum = channel.pagination.pageNum;
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: pageSize,
      pageSizeOptions: ['10', '20', '30'],
      showTotal: () => `共${total}条`,
      current: pageNum,
      total: total,
      onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
      onChange: (current, e) => this.onPageChange(current, e)
    };

    const ChannelTabs = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
      defaultActiveKey: this.state.defaultActiveKey,
      onChange: this.tabChange,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 349,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TabPane, {
      tab: "\u5168\u90E8",
      key: "1",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 350,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AllChannel, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 351,
        columnNumber: 21
      }
    })));

    const FilterArea = () => {
      const [form] = antd__WEBPACK_IMPORTED_MODULE_16__["default"].useForm();

      const showModal = () => {
        this.setState({
          showModal: true
        });
      };

      const handleCancel = () => {
        this.setState({
          showModal: false
        });
      };

      const onRequiredTypeChange = _ref2 => {// setRequiredMarkType(requiredMarkValue);

        let {
          requiredMarkValue
        } = _ref2;
      };

      const handleOk = () => {
        this.setState({
          showModal: false
        });
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 381,
          columnNumber: 17
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_11__["default"], {
        type: "primary",
        onClick: showModal,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 382,
          columnNumber: 21
        }
      }, "\u65B0\u589E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_17__["default"], {
        title: "\u65B0\u589E",
        visible: this.state.showModal,
        onOk: handleOk,
        onCancel: handleCancel,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 385,
          columnNumber: 21
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_16__["default"], {
        form: form,
        layout: "vertical",
        onValuesChange: onRequiredTypeChange,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 386,
          columnNumber: 25
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_16__["default"].Item, {
        label: "\u57DF\u540D\u5907\u6CE8",
        required: true,
        tooltip: "This is a required field",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 387,
          columnNumber: 29
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["default"], {
        placeholder: "input placeholder",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 388,
          columnNumber: 33
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_16__["default"].Item, {
        label: "\u57DF\u540D",
        tooltip: {
          title: 'Tooltip with customize icon',
          icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_18__["default"], {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 394,
              columnNumber: 43
            }
          })
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390,
          columnNumber: 29
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_10__["default"], {
        placeholder: "input placeholder",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 396,
          columnNumber: 33
        }
      })))));
    };

    const AllChannel = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_19__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 405,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_20__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 406,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "base-style",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 407,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
      id: "basic",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 408,
        columnNumber: 25
      }
    }, "\u901A\u77E5\u7BA1\u7406"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_15__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 409,
        columnNumber: 25
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FilterArea, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 410,
        columnNumber: 25
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_21__["default"], {
      columns: columns,
      dataSource: data //onChange={this.onChange}
      ,
      pagination: paginationProps,
      rowKey: "id",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 411,
        columnNumber: 25
      }
    }))));

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_22__["default"], {
      className: "animated fadeIn",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 424,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 425,
        columnNumber: 17
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_CustomBreadcrumb__WEBPACK_IMPORTED_MODULE_1__["default"], {
      arr: ['应用', 'Cernitor', '通知渠道'],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 426,
        columnNumber: 21
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ChannelTabs, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 428,
        columnNumber: 17
      }
    }));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_23__.withRouter)(NotifyChannel));

/***/ }),

/***/ "./src/views/App/Cernitor/NotifyChannel/index.js":
/*!*******************************************************!*\
  !*** ./src/views/App/Cernitor/NotifyChannel/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotifyChannel_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotifyChannel.jsx */ "./src/views/App/Cernitor/NotifyChannel/NotifyChannel.jsx");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_NotifyChannel_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ })

}]);
//# sourceMappingURL=src_views_App_Cernitor_NotifyChannel_index_js-src_style_view-style_table_scss.js.map
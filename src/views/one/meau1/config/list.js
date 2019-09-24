const config = {
    diaTitle: { //新增、编辑的自定义title，可不写
        add: '新增信息',
        edit: '编辑信息'
    },
	cols: [{ //搜索、列表、新增、编辑的数据
        key: 'name',
        search: true,
		label: '姓名'
	}, {
        key: 'age',
        search: true,
		label: '年龄'
	}, {
        key: 'sex',
        search: true,
        type: 'select',
        source: 'sex', //下拉选项对应的数据名称data/source.js
        label: '性别'
	}, {
        key: 'country',
        type: 'select',
        source: 'country',
        label: '国家'
    }, {
        key: 'time',
        search: true,
        type: 'daterange', //日期范围选择
        search: {
            toRange: {
                names: ['submitDateStart', 'submitDateEnd']
            }
        },
        addHide: true, //新增、编辑弹框不展示
        // listHide: true, //列表不展示
        label: '提交日期'
    }],
    
    btns: {
        add: true //快捷写法-已定义常用的才可以这样使用
        // add: { // 默认写法
        //     detailShow: 'detail edit add', // 定义详情、编辑、新增页面的是否展示
        //     label: '新增', // 按钮名称定义
        //     click: 'add' // 对应自己写的方法
        // }
    },

    opes: {
        toDeatil: {
            label: '详情',
            click: 'toDeatil'
        },
        edit: true,
        remove: true
    },

    rule: {
        type: 'on', // on(校验) off(不校验) all(全部校验，不用写下面index: '')
        index: '0 1 2' //对应下标
    },

    api: { // 接口
        $list: '/users/list',
        $add: '/users/insert',
        $merge: '/users/update',
        $delete: '/users/remove'
    }
};

export default config;
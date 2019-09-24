const config = {
	key: 'live', // 页签页一定要写
	label: '爱好',
	// 下面同列表页配置
	cols: [{
		key: 'live',
		label: '爱好'
	}, {
		key: 'remark',
		label: '备注' 
	}],

	opes: {
		edit: {
			detailShow: 'edit'
		},
		remove: {
			detailShow: 'edit'
		}
	},

	rule: {
		type: 'on',
		index: '0'
	},

	btns: {
		add: {
			detailShow: 'edit'
		}
	},

	api: {
		$list: '/live/list',
        $add: '/live/insert',
        $merge: '/live/update',
        $delete: '/live/remove'
	}
};

export default config;
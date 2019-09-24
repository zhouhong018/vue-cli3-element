const config = {
	key: 'skill', // 页签页一定要写
	label: '专业技能',
	// detailShow: 'detail', // 页签的显示隐藏--详情页or编辑页or新增页
	cols: [{
		key: 'skill',
		label: '专业技能'
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
		$list: '/skill/list',
        $add: '/skill/insert',
        $merge: '/skill/update',
        $delete: '/skill/remove'
	}
};

export default config;
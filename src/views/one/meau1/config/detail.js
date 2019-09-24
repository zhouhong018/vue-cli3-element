import cols from './_detail_cols';
import skill from './_detail_skill'; 
import live from './_detail_live'; 

const config = {
	cols: cols, // 头信息

	tabs: [skill, live], // 页签数据

	rule: { // 头信息的校验--编辑
		type: 'on',
		index: '0-2'
	},

	api: {
		$detail: '/users/detail',
		$save: '/users/update',
		$delete: '/users/remove',
	},

	edit: { //编辑页置灰项
		form: {
			// disabled: [4, 5, 6]
			disabled: [4]
		}
	},

	btns: {
		save: {
			detailShow: 'edit'
		},
		remove: {
			click: 'detail_remove',
			detailShow: 'edit'
		},
		toEdit: {
			detailShow: 'detail'
		},
		back: true
	}
};

export default config;
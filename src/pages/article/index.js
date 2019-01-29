import React from 'react';
import { Form, Icon, Input, Modal, message, Button, Row, Col, Table, Select } from 'antd';
import moment from 'moment';
import service from './../../service/article';
import categoryService from './../../service/category';
import './index.less';

export default class Article extends React.Component {

    state = {
        items: [],
        editVisible: false,
        isCreate: true,
        item: {},
        item: '',
        pagination: '', // 分页
        selectedRowKeys: [],
        categories: []
    }

    componentDidMount() {
        categoryService.list({current: 1, pageSize: 5}).then(res => {
            let categories = res.data.items;
            console.log(categories) // [...]
            if (res.code === 0) {
                this.setState({
                    categories
                }, this.getList)
            } else {
                message.error(res.error)
            }
        })
    }
    
    componentWillMount () {
        // 拿到所有文章
        this.getList()    
    }

    onChange = (current) => {
        this.setState({
            pagination: {...this.state.pagination, current}
        }, this.getList)
    }

    // 获取文章数据
    getList = (current) => {
        console.log(current)
        service.list({current: this.state.pagination.current}).then(res => {
            if (res.code == 0) {
                let { items, pageNum: current, pageSize, total } = res.data;
                this.setState({
                    items: items.map(item => (item.key = item._id, item)),
                    pagination: {
                        pageSize,
                        current,
                        total,
                        showTotal: val => `总计${val}条`,
                        onChange: this.onChange, // 分页函数
                    }
                })
            } else {
                message.error('文章加载失败')
            }
        })
    }

    // 添加文章
    create = () => {
        this.setState({ title: '新增文章', editVisible: true, isCreate: true })
    }

    // 删除文章
    remove = (id) => {
        service.removeList(id).then(res => {
            if (res.code === 0) {
                this.setState({
                    pagination: {
                        ...this.state.pagination, current: 1
                    }
                }, this.getList);
            } else {
                message.error(res.error)
            }
        })
    }

    // modal 确定
    editOk = () => {
        let article = this.editform.props.form.getFieldsValue();
        console.log(article)
        service.addList(article).then(res => {
            if (res.code == 0) {
                message.success('添加文章成功')
                this.setState({editVisible: false}, this.getList)
            } else {
                message.error(res.error)
            }
        })
    }

    // 关闭modal框
    editCancel = () => {
        this.setState({editVisible: false})
    }

    // keyword = (value) => {
    //     console.log(value)
    // }

    render() {
        //  const dataSource = [
        //     { _id: 1, name: '分类1'},
        //     { _id: 2, name: '分类2'}
        // ];
        const columns = [
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content'
            },
            {
                title: '分类',
                dataIndex: 'category',
                key: 'category',
                render: (text, record) => {
                    return text.name;
                }
            },
            {
                title: '阅读量',
                dataIndex: 'pv',
                key: 'pv'
            },
            {
                title: '创建时间',
                dataIndex: 'createAt',
                key: 'createAt',
                render: (text) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss')// 转换时间格式
                }
            },
            {
                title: '评论数',
                dataIndex: 'comments',
                key: 'comments',
                render: (text) => {
                    return text.length; 
                }

            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: () => {
                    return (
                        <Button.Group>
                            <Button type='default'>查看</Button>
                            <Button type='primary' >编辑</Button>
                            <Button type='default'>评论</Button>
                            <Button type='danger' onClick={this.categoryRemove}>删除</Button>
                        </Button.Group>
                    )
                }
            }
        ]
        const rowSelection = {
            onChnage: (selectedRowKeys) => {
                this.setState({selectedRowKeys})
            }
        }
        return (
            <Row>
                <Col span={24}>
                    <Row style={{padding: '10px'}}>
                        <Col span={12}>
                            <Button.Group>
                                <Button 
                                    type='primary'
                                    icon='plus'
                                    onClick={this.create}
                                >添加文章</Button>
                                <Button
                                    type='danger'
                                    icon='delete'
                                    onClick={this.remove}
                                >删除文章</Button>
                            </Button.Group>
                        </Col>
                        <Col span={12}>
                            <Input.Search
                                enterButton
                                placeholder='请输入关键字'
                                onSearch={this.keyword}
                            />
                        </Col>
                    </Row>
                    <Row style={{padding: 10}}>
                        <Table
                            dataSource={this.state.items}
                            columns={columns}
                            bordered
                            pagination={this.state.pagination}
                            rowSelection={rowSelection}
                        />
                    </Row>
                    <Modal
                        visible={this.state.editVisible}
                        title={this.state.title}
                        onCancel={this.editCancel}
                        onOk={this.editOk}
                        destroyOnClose
                    >
                        <EditModal
                            wrappedComponentRef={inst => this.editform = inst}
                            isCreate={this.state.isCreate}
                            categories={this.state.categories} // 值传到父组件
                        />
                    </Modal>
                </Col>
            </Row>
        )
    }
}

class EditModal extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label="选择分类">
                    {getFieldDecorator('category', {
                        initialValue: this.props.categories[0]._id,
                        rules: [{required: true, message: '选择下拉框'}]
                    })(
                        <Select style={{width: '120px'}}>
                            {
                                this.props.categories.map((item) => (
                                    <Select.Option key={item._id} value={item._id}>
                                        {item.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: '请输入文章标题'}]
                    })(
                        <Input prefix={<Icon type='bars'/>} placeholder="请输入文章标题" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: '请输入文章内容'}]
                    })(
                        <Input.TextArea placeholder="请输入文章内容" />
                    )}
                </Form.Item>
                {
                    !this.props.isCreate && (
                            <Form.Item>
                                {getFieldDecorator('id', {
                                    initialValue: this.props.item._id
                                })(
                                    <Input type='hidden'/>
                                )}
                            </Form.Item>
                    )
                }
            </Form>
        )
    }
}

EditModal = Form.create()(EditModal);
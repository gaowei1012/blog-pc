import React from 'react';
import { Row, Col, Modal, message, Table, Popconfirm, Button, Input, Pagination, Form, Icon } from 'antd';
import servie from './../../service/category';
import './index.less';

export default class Category extends React.Component {

    state = {
        itmes: [],
        item: '', // 当前值
        editVisible: false, // 次变量用来控制modal窗口是否显示
        isCreate: true, // 表示是否添加分类，如果为false则为修改
        pagination: {}, //分页
        selectedRowKeys: [],
        keyword: '', // 搜索
    }

    componentDidMount () {
        this.getlist()
    }

    // 删除分类
    removeItme = (id) => {
        servie.removeList(id).then(res => {
            if (res.code == 0) {
                message.success('删除成功')
                this.setState({
                    pagination: {
                        ...this.state.pagination, current: 1
                    }
                }, this.getlist)
            } else {
                message.error('删除列表失败')
            }
        })
    }

    // 处理modal完成事件
    handleOk = () => {
        // 拿到表单的值
        let category = this.editForm.props.form.getFieldsValue();
        console.log(category)
        // 判断是更新还是新增
        servie[this.state.isCreate?'addList':'updateList'](category).then(res => {
            if (res.code == 0) {
                message.success('添分类成功')
                this.setState({
                    editVisible: false
                })
                this.getlist(); // 刷新列表数据
            } else {
                message.error('分类已存在')
            }
        })
    }

    // 处理modal取消事件
    handleCancel = () => {
        this.setState({ editVisible: false })
    }

    // 处理分页, 当你点击分页器会把当前分页的页码传上去
    pageChange = (current) => {
        this.setState({
            pagination: {...this.state.pagination, current}
        }, this.getlist)
    }

    getlist () {
        servie.list({current: this.state.pagination.current, keyword: this.state.keyword }).then(res => {
            if (res.code == 0) {
                const {items, pageSize, pageNum: current, total } = res.data;
                this.setState({
                        itmes: items.map(item => (item.key = item._id, item)),
                        pagination: {
                            pageSize, // 每页条数
                            current, // 当前页码
                            total, // 总条数
                            showTotal: val => `总计${val}条`,
                            onChange: this.pageChange, // 分页跳转
                        }
                    })
            } else {
                message.error('数据加载失败')
            }
        })
    }

    // 修改分类标签
    edit = (item) => {
        this.setState({
            title: '更新分类',
            editVisible: true,
            isCreate: false,
            item
        })
    }

    // 创建添加分类
    addCategory = () => {
        this.setState({
            title: '添加分类',
            isCreate: true,
            editVisible: true
        })
    }

    render () {
        // const dataSource = [
        //     { _id: 1, name: '分类1'},
        //     { _id: 2, name: '分类2'}
        // ];
        const columns = [
            {
                title: '名称',
                width: 900,
                dataIndex: 'name',
                key: '_id'
            },
            {
                title: '名称',
                render: (text, record, index) => {
                    return (
                        <Button.Group>
                            <Button type='primary' onClick={() => this.edit(record)}>修改</Button>
                            <Popconfirm onConfirm={() => this.removeItme(record._id)}>
                                <Button type='danger'>删除</Button>
                            </Popconfirm>
                            {/* <Pagination /> */}
                        </Button.Group>
                    )
                }
            }
        ]
        const rowSelection = {
            // 参数为选中行的参数地址
            onChange: (selectedRowKeys) => {
                this.setState({selectedRowKeys})
            }
        }
        return(
            <div style={{padding: '10px'}}>
                <Row>
                    <Col span={6}>
                        <Button.Group style={{padding: '0 0 0 10px'}}>
                            <Button type='default' icon='plus' onClick={this.addCategory}>添加分类</Button>
                            <Button type='danger' icon='delete' onClick={() => this.removeItme(this.state.selectedRowKeys)}>删除所选分类</Button>
                        </Button.Group>
                    </Col>
                    <Col span={16}>
                        <Input.Search
                            enterButton
                            placeholder='请输入关键字'
                            onSearch={keyword => this.setState({keyword}, this.getlist)}
                        />
                    </Col>
                </Row>
                <Row style={{padding: '10px'}}>
                    <Table
                        dataSource={this.state.itmes}
                        columns={columns}
                        bordered
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}// 多选
                    />
                </Row>
                <Modal
                    title={this.state.title}
                    visible={this.state.editVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    <EditModal 
                        wrappedComponentRef={inst => this.editForm = inst}
                        isCreate={this.state.isCreate}
                        item={this.state.item}
                    /> 
                </Modal>
            </div>
        )
    }
}


class EditModal extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form >
                <Form.Item>
                    {getFieldDecorator('name', {
                        initialValue: this.props.isCreate?'':this.props.item.name,
                        rules: [{required: true, message: '请输入分类名称'}]
                    })(
                        <Input prefix={ <Icon type="setting" theme="filled" style={{ color: 'rgba(0,0,0,.25)' }} /> } placeholder="分类名称" />
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
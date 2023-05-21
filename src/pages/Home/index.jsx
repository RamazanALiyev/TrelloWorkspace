import React, { useState } from 'react';
import { Card } from '../../Components';
import { Input, Row, Col, Button, Form, DatePicker, Radio, message } from 'antd';
import { Maincontext, useContext } from '../../context';
import axios from 'axios';
const { TextArea } = Input;

const Index = () => {
  const [formTask] = Form.useForm();
  const [lists, ] = useState([
    {
      title: "To Do",
      status: "todo",
    },
    {
      title: "In Progress",
      status: "inProgress",
    },
    {
      title: "In Review",
      status: "inReview",
    },
    {
      title: "Done",
      status: "done",
    },
  ]);
  const [valueRadio, setValueRadio] = useState(1);
  const { setLoading, showCardModal, setShowCardModal, tasks, setTasks, persons } = useContext(Maincontext);
  const onFinish = (value) => {
    setLoading(true);
    value = { ...value, status: 'todo' }
    axios.post('https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/users', value)
      .then(response => {
        setLoading(false);
        let tempTasks = { ...tasks }
        let newTodo;
        if (tempTasks.todo) {
          newTodo = [...tempTasks?.todo, response.data];
        } else {
          tempTasks.todo = [];
          newTodo = [...tempTasks?.todo, response.data];
        }
        setTasks({ todo: newTodo });
        setShowCardModal(false);
        formTask.resetFields();
        message.success('Task added successfully')
      });
  };
  const openTaskModal = () => {
    if (persons?.length === 0) {
      message.warning('There are no members in the group!');
    } else {
      setShowCardModal(true)
    }
  };
  const onChangeRadio = (e) => setValueRadio(e.target.value);
  console.log(tasks);
  return (
    <Row className='py-4'>
      <Col className='w-11/12 my-6 mx-auto flex justify-between'>
        <Input placeholder='Search...' />
        <Button className='ml-4 bg-sky-800 text-white' onClick={openTaskModal}>New Item</Button>
      </Col>
      <div className='w-11/12 mx-auto flex justify-between'>
        {lists?.map((list, index) => (
          <Card key={index} tasks={tasks?.[list?.status]} title={list?.title} />
        ))}
      </div>
      {showCardModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <Form className='w-1/2' layout='vertical' form={formTask} onFinish={onFinish}>
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">New Task</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowCardModal(false)
                        formTask.resetFields();
                      }}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <Form.Item label='Name' name='taskName' rules={[{ required: true, message: 'Please input task name!' }]}>
                      <Input placeholder='Please enter task name' />
                    </Form.Item>
                    <Form.Item label='Description' name='description' rules={[{ required: true, message: 'Please input task description!' }]}>
                      <TextArea rows={4} placeholder='Please enter task description' />
                    </Form.Item>
                    <Form.Item label='Description' name='date' rules={[{ required: true, message: 'Please input task description!' }]}>
                      <DatePicker className='w-full' />
                    </Form.Item>
                    <Form.Item label='Assigne' name='assigne' rules={[{ required: true, message: 'Please input task description!' }]}>
                      <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                        {persons?.map((person, index) => (
                          <Radio value={person?.name} key={index}>{person?.name}</Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button onClick={() => {
                      setShowCardModal(false)
                      formTask.resetFields();
                    }} danger className='mr-3'>Cancel</Button>
                    <Button htmlType='submit' type='primary' className='bg-green-400'>Save</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Row>
  )
}
export default Index;
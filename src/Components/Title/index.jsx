import { Form, Input, Button, message, Tag } from 'antd';
import { Maincontext, useContext } from '../../context';
import axios from 'axios';
const Index = () => {
    const [formAddPerson] = Form.useForm();
    const { setLoading, persons, setPersons, showModal, setShowModal, showMembersModal, setShowMembersModal } = useContext(Maincontext)
    const onFinish = (value) => {
        setLoading(true);
        axios.post('https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/tasks', value)
            .then(response => {
                setLoading(false);
                setPersons((prev) => [...prev, response.data]);
                setShowModal(false);
                formAddPerson.resetFields();
                message.success('Person added successfully')
            });
    };
    const log = (id) => {
        setLoading(true)
        axios.delete(`https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/tasks/${id}`)
            .then(() => {
                message.success('Person deleted!');
                axios.get("https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/tasks")
                    .then(function (res) {
                        setLoading(false);
                        setPersons(res.data);
                    });
            });
    };
    return (
        <div className='bg-slate-300 h-14'>
            <div className='w-11/12 h-full mx-auto flex justify-between items-center'>
                <div className='h-full flex items-center'>
                    <h1 className='font-bold mr-6'>Product Design Team</h1>
                    <p className='bg-blue-900 px-3 py-1 rounded-md text-white'>Spring 9</p>
                </div>
                <div className='flex items-center'>
                    <button className='text-white rounded-xl px-3 py-1 font-medium mr-6 bg-sky-800' onClick={() => setShowMembersModal(true)}>See list of members</button>
                    <ul className='flex items-center justify-center'>
                        {persons.length > 4
                            ?
                            <>
                                {[...persons].splice(0, 4)?.map((person, index) => (
                                    <li key={index} className='flex items-center justify-center overflow-hidden w-8 h-8 rounded-full bg-slate-500 -mx-2 border border-white'>
                                        {/* {person?.name.split('')[0].toUpperCase()} */}
                                        <img src={person?.img} alt='title' />
                                    </li>
                                ))}
                                <li className='text-white w-8 h-8 flex items-center justify-center rounded-full bg-indigo-700 -mx-2 border border-white text-xs'>
                                    +{persons.length - 4}
                                </li>
                            </>
                            :
                            persons?.map((person, index) => (
                                <li key={index} className='flex items-center justify-center overflow-hidden w-8 h-8 rounded-full bg-slate-500 -mx-1 border border-white'>
                                    {/* {person?.name.split('')[0].toUpperCase()} */}
                                    <img src={person?.img} alt='title' />
                                </li>
                            ))
                        }
                    </ul>
                    <span className='inline-block w-[2px] h-10 mx-4 bg-white'></span>
                    <button className='text-blue-800 font-medium' onClick={() => setShowModal(true)}>+ New Member</button>
                </div>
                {showModal && (
                    <>
                        <div
                            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <Form style={{ width: '500px' }} form={formAddPerson} onFinish={onFinish}>
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">New Member</h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your username!' }]}>
                                                <Input placeholder='Pease enter your fullname' />
                                            </Form.Item>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <Button onClick={() => {
                                                setShowModal(false);
                                                message.error('Cancelled');
                                            }} danger className='mr-4'>Cancel</Button>
                                            <Button htmlType='submit' type="primary" className='bg-green-400'>Save</Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
                {showMembersModal && (
                    <>
                        <div
                            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div style={{ width: '40rem' }}>
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">Members</h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowMembersModal(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                            {persons?.map((person, index) => (
                                                <Tag color='#2d57f5' key={index} closable onClose={() => log(person?.id)}>{person?.name}</Tag>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <Button onClick={() => {
                                                setShowMembersModal(false);
                                                message.error('Cancelled');
                                            }} danger>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Index;
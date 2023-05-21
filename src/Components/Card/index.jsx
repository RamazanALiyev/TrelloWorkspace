import React from 'react';
import { Typography, Card, Empty, message } from 'antd';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { RiChatDeleteLine } from 'react-icons/ri';
import { Maincontext, useContext } from '../../context.js'
import dayjs from 'dayjs';
import axios from 'axios';
const { Title } = Typography;

const Index = (props) => {
    const { setTasks, setLoading } = useContext(Maincontext)
    const deleteTask = (id) => {
        setLoading(true);
        axios.delete(`https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/users/${id}`)
            .then(() => {
                message.success('Task deleted!');
                axios.get("https://6468bac9e99f0ba0a82b6bce.mockapi.io/trello/users")
                    .then(function (res) {
                        const transformedTasks = res.data.reduce((acc, task) => {
                            const { status, ...rest } = task;
                            if (!acc[status]) {
                                acc[status] = [];
                            }
                            acc[status].push(rest);
                            return acc;
                        }, {});
                        setLoading(false);
                        setTasks(transformedTasks);
                    });
            });

    }
    return (
        <div className='w-[24%] border bg-slate-200 rounded-lg py-3 px-2'>
            <Title className='text-center' level={5}>
                <span>{props.title}</span>
                {props?.tasks?.length && <span className='ml-3 inline-flex justify-center items-center w-6 h-6 bg-slate-700 rounded-full text-white text-sm'>{props?.tasks?.length}</span>}
            </Title>
            {props?.tasks === undefined
                ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className='my-16' />
                :
                props?.tasks?.map((card, index) => (
                    <Card
                        draggable
                        onDrag={(e) => console.log(e)}
                        key={index}
                        title={
                            <div className='flex justify-between items-center'>
                                <p className='flex items-center'>
                                    <MdOutlineAccessTimeFilled />
                                    <span className='text-xs ml-3'>{dayjs(card?.date).format('YYYY-MM-DD')}</span>
                                </p>
                                <div onClick={() => deleteTask(card.id)} className='cursor-pointer w-6 h-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'>
                                    <RiChatDeleteLine />
                                </div>
                            </div>
                        }
                        bordered={false}
                        style={{ width: '100%', margin: '1rem 0' }}
                    >
                        <p className='font-bold'>{card?.taskName}</p>
                        <p className='my-2'>{card?.description}</p>
                        <p className='flex justify-between items-center'>
                            <span className='inline-block px-2 py-1 bg-indigo-500 rounded-lg text-center text-white'>{card?.assigne}</span>
                        </p>
                    </Card>
                ))
            }
        </div>
    );
};
export default Index;